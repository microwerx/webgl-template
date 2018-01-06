/// <reference path="./Fluxions.ts" />


class AttribInfo {
    public location = -1;
    constructor(public index: number, public attribName: string, public enabled = true, public value: Vector4 = new Vector4(0.0, 0.0, 0.0, 1.0)) {
    }

    attrib1(x: number): void {
        this.value.reset(x, 0, 0, 0);
    }
    attrib2(x: number, y: number): void {
        this.value.reset(x, y, 0, 0);
    }
    attrib3(x: number, y: number, z: number): void {
        this.value.reset(x, y, z, 0);
    }
    attrib4(x: number, y: number, z: number, w: number): void {
        this.value.reset(x, y, z, w);
    }
    attrib2v(v: Vector2): void {
        this.value.reset(v.x, v.y, 0, 0);
    }
    attrib3v(v: Vector3): void {
        this.value.reset(v.x, v.y, v.z, 0);
    }
    attrib4v(v: Vector4): void {
        this.value.reset(v.x, v.y, v.z, v.w);
    }
}

enum PrimitiveType {
    Points,
    LineStrip,
    LineLoop,
    Triangles,
    TriangleStrip,
    TriangleFan
}

class Surface {
    public count: number = 0;
    public properties: Map<string, string> = new Map<string, string>([
        ["o", "unknown"],
        ["g", "unknown"],
        ["s", "unknown"],
        ["usemtl", ""],
        ["mtllib", ""]
    ]);

    constructor(public material: string, public mode: PrimitiveType, public first: number, public offset: number) {
        this.SetProperty("usemtl", material);
    }

    add() { this.count++; }

    SetProperty(key: string, value: string): void {
        this.properties.set(key, value);
    }

    GetProperty(key: string): string {
        let value = this.properties.get(key);
        if (value) {
            return value;
        }
        return "";
    }
}

class IndexedGeometryMesh {
    private _vbo: WebGLBuffer | null = null;
    private _ibo: WebGLBuffer | null = null;
    // private _vao: WebGLVertexArrayObjectOES | null = null;
    private _dirty: boolean = true;

    private _vertices: Float32Array;
    private _indices: Uint32Array | Uint16Array;
    private _isUint32: boolean = false;
    private _surfaces: Surface[] = [];
    private _indexTypeSize: number = 0;
    private _indexCount: number = 0;
    private _vertexCount: number = 0;
    private _currentMaterialName: string = "unknown";

    private _attribInfo: AttribInfo[] = [
        new AttribInfo(0, "aPosition", true, new Vector4(0, 0, 0, 1)),
        new AttribInfo(1, "aNormal", true, new Vector4(0, 0, 0, 0)),
        new AttribInfo(2, "aColor", true, new Vector4(1, 1, 1, 1)),
        new AttribInfo(3, "aTexCoord", true, new Vector4(0, 0, 0, 0)),
        new AttribInfo(4, "aGeneric1", false),
        new AttribInfo(5, "aGeneric2", false),
        new AttribInfo(6, "aGeneric3", false),
        new AttribInfo(7, "aGeneric4", false)
    ];

    constructor(private _context: Fluxions, private _maxVertices: number = 32767, private _maxIndices: number = 32767) {
        this._vbo = _context.gl.createBuffer();
        this._ibo = _context.gl.createBuffer();
        this._vertices = new Float32Array(this._maxVertices);
        if (_maxIndices < 32768) {
            this._indices = new Uint16Array(_maxIndices);
            this._isUint32 = false;
            this._indexTypeSize = 2;
        }
        else {
            this._indices = new Uint32Array(_maxIndices);
            this._isUint32 = true;
            this._indexTypeSize = 4;
        }
    }

    BuildBuffers(): boolean {
        let gl = this._context.gl;
        if (this._vbo) {
            gl.deleteBuffer(this._vbo);
            this._vbo = null;
        }
        if (this._ibo) {
            gl.deleteBuffer(this._ibo);
            this._ibo = null;
        }
        if (!(this._vbo = gl.createBuffer())) { return false; }
        if (!(this._ibo = gl.createBuffer())) { return false; }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this._dirty = false;
        return true;
    }

    Reset(): void {
        this._vertices = new Float32Array(this._maxVertices);
        if (this._maxIndices < 32768) {
            this._indices = new Uint16Array(this._maxIndices);
            this._isUint32 = false;
            this._indexTypeSize = 2;
        }
        else {
            this._indices = new Uint32Array(this._maxIndices);
            this._isUint32 = true;
            this._indexTypeSize = 4;
        }
        this._surfaces = [];
        this._indexTypeSize = 0;
        this._indexCount = 0;
        this._vertexCount = 0;
        this._currentMaterialName = "unknown";
        this._dirty = true;
    }

    LoadObject(sceneUrl: string): void {
        let self = this;
        let tfl = new Utils.TextFileLoader(sceneUrl, (data) => {
            self.loadObjectData(data);
        });
    }

    Render(rc: RenderConfig, materialName?: string): boolean {
        let gl = this._context.gl;
        if (this._dirty) {
            if (!this.BuildBuffers())
                return false;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);

        // figure out attrib locations
        for (let i = 0; i < 8; i++) {
            if (!this._attribInfo[i].enabled) continue;
            this._attribInfo[i].location = rc.GetAttribLocation(this._attribInfo[i].attribName);
            if (this._attribInfo[i].location < 0) continue;
            gl.enableVertexAttribArray(this._attribInfo[i].location);
            gl.vertexAttribPointer(this._attribInfo[i].location, 4, gl.FLOAT, false, 8 * 4 * 4, i * 4 * 4);
        }

        let useMaterials = materialName !== undefined;
        let type = this._isUint32 ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
        for (let surface of this._surfaces) {
            if (useMaterials) {
                if (surface.material == materialName)
                    gl.drawElements(surface.mode, surface.count, type, surface.offset);
            }
            else {
                gl.drawElements(surface.mode, surface.count, type, surface.offset);
            }
        }

        for (let i = 0; i < 8; i++) {
            if (this._attribInfo[i].enabled && this._attribInfo[i].location >= 0) {
                gl.disableVertexAttribArray(this._attribInfo[i].location);
            }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return true;
    }

    EnableAttribArray(index: number): void {
        if (index >= 0 && index < 8) {
            this._attribInfo[index].enabled = true;
        }
    }

    DisableAttribArray(index: number): void {
        if (index >= 0 && index < 8) {
            this._attribInfo[index].enabled = false;
        }
    }

    SetAttribArrayName(index: number, name: string): void {
        if (index >= 0 && index < 8) {
            this._attribInfo[index].attribName = name;
        }
    }

    BeginSurface(mode: PrimitiveType): void {
        let surface = new Surface(this._currentMaterialName, mode, this._indexCount, this._indexCount * this._indexTypeSize);
        this._surfaces.push(surface);
    }

    EndSurface(): void {
    }

    AddIndex(index: number): void {
        if (this._indexCount >= this._indices.length - 1)
            return;
        if (index > this._vertexCount) {
            this._indices[this._indexCount] = 0;
        } else if (index < 0) {
            this._indices[this._indexCount] = this._indexCount;
        }
        else {
            this._indices[this._indexCount] = index;
        }
        this._indexCount++;
        this._surfaces[this._surfaces.length - 1].add();
        this._dirty = true;
    }

    VertexAttrib1(index: number, x: number = 0): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib4(x, 0, 0, 1);
        if (index == 0) this.emitVertex();
    }

    VertexAttrib2(index: number, x: number = 0, y: number = 0): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib4(x, y, 0, 1);
        if (index == 0) this.emitVertex();
    }

    VertexAttrib3(index: number, x: number = 0, y: number = 0, z: number = 0): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib4(x, y, z, 1);
        if (index == 0) this.emitVertex();
    }

    VertexAttrib4(index: number, x: number = 0, y: number = 0, z: number = 0, w: number = 1): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib4(x, y, z, w);
        if (index == 0) this.emitVertex();
    }

    VertexAttrib2v(index: number, v: Vector2): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib2v(v);
        if (index == 0) this.emitVertex();
    }

    VertexAttrib3v(index: number, v: Vector3): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib3v(v);
        if (index == 0) this.emitVertex();
    }

    VertexAttrib4v(index: number, v: Vector4): void {
        if (index < 0 || index >= 8) return;
        this._attribInfo[index].attrib4v(v);
        if (index == 0) this.emitVertex();
    }

    private emitVertex(): void {
        if (this._vertexCount >= this._maxVertices - 1)
            return;
        let stride = 8 * 4;
        for (let i = 0; i < 8; i++) {
            this._vertices[this._vertexCount * stride + i * 4 + 0] = this._attribInfo[i].value.x;
            this._vertices[this._vertexCount * stride + i * 4 + 1] = this._attribInfo[i].value.y;
            this._vertices[this._vertexCount * stride + i * 4 + 2] = this._attribInfo[i].value.z;
            this._vertices[this._vertexCount * stride + i * 4 + 3] = this._attribInfo[i].value.w;
        }
        this._vertexCount++;
        this._dirty = true;
    }

    private loadObjectData(data: string): void {
        if (data == "unknown")
            return;
        let lines: string[] = data.split(/\r\n|\r|\n/g);

        let gl: WebGLRenderingContext = this._context.gl;
        this.Reset();

        let vertexCount: number = 0;
        let normalCount: number = 0;
        let colorCount: number = 0;
        let texcoordCount: number = 0;
        let faces: number = 0;
        let v: any = [];
        let vn: any = [];
        let vc: any = [];
        let vt: any = [];
        let va1: any = [];
        let va2: any = [];
        let va3: any = [];
        let va4: any = [];
        let OBJg: string = "";
        let OBJo: string = "";
        let OBJs: string = "";
        let usemtl: string = "";
        let mtllib: string = "";
        let flushSurface: boolean = false;

        for (let line of lines) {
            let tokens = line.match(/\S+/g);
            if (tokens == null || tokens.length === 0)
                continue;
            if (tokens[0][0] == "#") {
                continue;
            }
            else if (tokens[0] == "v") {
                v.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "vn") {
                vn.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "vc") {
                vc.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "vt") {
                vt.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va1") {
                va1.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va2") {
                va2.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va3") {
                va3.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va4") {
                va4.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "f") {
                let face: number = 1;
                let faceIndices: any[] = [];
                for (let face: number = 1; face < tokens.length; face++) {
                    let vertexIndex: number = 0;
                    let normalIndex: number | null = null;
                    let texcoordIndex: number | null = null;
                    let values: string[] = tokens[face].split("/");
                    if (values.length >= 1) {
                        vertexIndex = Number(values[0]);
                        if (vertexIndex < 0)
                            vertexIndex = v.length + vertexIndex;
                        else if (vertexIndex > 0)
                            vertexIndex -= 1; // correct for 1-indexing in the OBJ file
                    }
                    if (values.length == 2) {
                        normalIndex = Number(values[1]);
                        if (normalIndex < 0)
                            normalIndex = vn.length + normalIndex;
                        else if (normalIndex > 0)
                            normalIndex--;
                    }
                    if (values.length == 3) {
                        normalIndex = Number(values[2]);
                        if (normalIndex < 0)
                            normalIndex = vn.length + normalIndex;
                        else if (normalIndex > 0)
                            normalIndex--;

                        texcoordIndex = Number(values[1]);
                        if (texcoordIndex < 0)
                            texcoordIndex = vt.length + texcoordIndex;
                        else if (texcoordIndex > 0)
                            texcoordIndex--;
                    }
                    var vertex = [vertexIndex, normalIndex, texcoordIndex];
                    faceIndices.push(vertex);
                }

                if (faces === 0) {
                    this.BeginSurface(gl.TRIANGLES);
                    let surface: Surface = this._surfaces[this._surfaces.length - 1];
                    surface.SetProperty("g", OBJg);
                    surface.SetProperty("o", OBJo);
                    surface.SetProperty("s", OBJs);
                    surface.SetProperty("mtllib", mtllib);
                    surface.SetProperty("usemtl", usemtl);
                }

                let vc_present: boolean = (vc.length == v.length) ? true : false;
                let va1_present: boolean = (va1.length == v.length) ? true : false;
                let va2_present: boolean = (va2.length == v.length) ? true : false;
                let va3_present: boolean = (va3.length == v.length) ? true : false;
                let va4_present: boolean = (va4.length == v.length) ? true : false;
                let vt_present: boolean = (vt.length > 0) ? true : false;
                let vn_present: boolean = (vn.length > 0) ? true : false;


                // reset defaults
                for (let i = 1; i < 8; i++) {
                    this.VertexAttrib4(i, 0, 0, 0, 1);
                }

                let arrays = [
                    v, vn, vc, vt, va1, va2, va3, va4
                ];

                let arrays_enabled = [
                    true, vn_present, vc_present, vt_present, va1_present, va2_present, va3_present, va4_present
                ];

                for (let k: number = 1; k < faceIndices.length; k++) {
                    let iv0: number = 0;
                    let iv1: number = k % faceIndices.length;
                    let iv2: number = (k + 1) % faceIndices.length;

                    let face_vertex1 = faceIndices[iv0][0];
                    let face_vertex2 = faceIndices[iv1][0];
                    let face_vertex3 = faceIndices[iv2][0];
                    let face_normal1 = faceIndices[iv0][1];
                    let face_normal2 = faceIndices[iv1][1];
                    let face_normal3 = faceIndices[iv2][1];
                    let face_texcoord1 = faceIndices[iv0][2];
                    let face_texcoord2 = faceIndices[iv1][2];
                    let face_texcoord3 = faceIndices[iv2][2];

                    let indices = [
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_normal1, face_normal2, face_normal3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_texcoord1, face_texcoord2, face_texcoord3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_vertex1, face_vertex2, face_vertex3],
                    ]

                    for (let vindex = 0; vindex < 3; vindex++) {
                        for (let arrayIndex = 7; arrayIndex >= 0; arrayIndex--) {
                            if (arrays_enabled[arrayIndex]) {
                                let x: number = arrays[arrayIndex][indices[arrayIndex][vindex]][0];
                                let y: number = arrays[arrayIndex][indices[arrayIndex][vindex]][1];
                                let z: number = arrays[arrayIndex][indices[arrayIndex][vindex]][2];
                                let w: number = arrays[arrayIndex][indices[arrayIndex][vindex]][3];
                                this.VertexAttrib4(arrayIndex, x, y, z, w);
                            }
                        }
                    }
                    this.AddIndex(-1);
                    this.AddIndex(-1);
                    this.AddIndex(-1);

                    // if (vt_present) this.VertexAttrib4(3, vt[face_texcoord1][0], vt[face_texcoord1][1], vt[face_texcoord1][2], vt[face_texcoord1][3]);
                    // if (vc_present) this.VertexAttrib4(2, vc[face_vertex1], vc[face_vertex1][1], vc[face_vertex1][2], vc[face_vertex1][3]);
                    // if (vn_present) this.vertexAttrib3(1, vn[face_normal1][0], vn[face_normal1][1], vn[face_normal1][2]);
                    // this.vertexAttrib3(0, v[face_vertex1][0], v[face_vertex1][1], v[face_vertex1][2]);

                    // if (face_texcoord2) this.vertexAttrib2(3, vt[face_texcoord2][0], vt[face_texcoord2][1]);
                    // if (!flatshaded && face_normal2) this.vertexAttrib3(1, vn[face_normal2][0], vn[face_normal2][1], vn[face_normal2][2]);
                    // this.vertexAttrib3(0, v[face_vertex2][0], v[face_vertex2][1], v[face_vertex2][2]);

                    // if (face_texcoord3) this.vertexAttrib2(3, vt[face_texcoord3][0], vt[face_texcoord3][1]);
                    // if (!flatshaded && face_normal3) this.vertexAttrib3(1, vn[face_normal3][0], vn[face_normal3][1], vn[face_normal3][2]);
                    // this.vertexAttrib3(0, v[face_vertex3][0], v[face_vertex3][1], v[face_vertex3][2]);

                    // vertexIndexCount += 3;
                }


                faces++;
            }
            else if (tokens[0] == "usemtl") {
                usemtl = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "mtllib") {
                mtllib = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "g") {
                OBJg = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "s") {
                OBJs = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "o") {
                OBJo = tokens[1];
                flushSurface = true;
            }
            else {
                // what is this?                
            }

            if (flushSurface) {
                flushSurface = false;
                if (faces !== 0) {
                    this.EndSurface();
                    faces = 0;
                }
            }
        }

        alert("loaded!");
    }

    private makeArray(tokens: RegExpMatchArray, baseIndex: number = 0): number[] {
        let x: number = 0;
        let y: number = 0;
        let z: number = 0;
        let w: number = 1;
        if (tokens.length > baseIndex) {
            x = Number(tokens[baseIndex]);
        }
        if (tokens.length > baseIndex + 1) {
            y = Number(tokens[baseIndex + 1]);
        }
        if (tokens.length > baseIndex + 2) {
            z = Number(tokens[baseIndex + 2]);
        }
        if (tokens.length > baseIndex + 3) {
            w = Number(tokens[baseIndex + 3]);
        }
        return [x, y, z, w];
    }

    private makeVector4(tokens: RegExpMatchArray, baseIndex: number = 0): Vector4 {
        let x: number = 0;
        let y: number = 0;
        let z: number = 0;
        let w: number = 1;
        if (tokens.length > baseIndex) {
            x = Number(tokens[baseIndex]);
        }
        if (tokens.length > baseIndex + 1) {
            y = Number(tokens[baseIndex + 1]);
        }
        if (tokens.length > baseIndex + 2) {
            z = Number(tokens[baseIndex + 2]);
        }
        if (tokens.length > baseIndex + 3) {
            w = Number(tokens[baseIndex + 3]);
        }
        return new Vector4(x, y, z, w);
    }
}
