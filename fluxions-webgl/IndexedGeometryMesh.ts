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
    constructor(public material: string, public mode: PrimitiveType, public first: number, public offset: number) { }
    add() { this.count++; }
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
        new AttribInfo(0, "aVertex", true, new Vector4(0, 0, 0, 1)),
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
            if (this._attribInfo[i].enabled) {
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
        } else {
            this._indices[this._indexCount] = index;
        }
        this._indexCount++;
        this._surfaces[this._surfaces.length - 1].add();
        this._dirty = true;
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
}
