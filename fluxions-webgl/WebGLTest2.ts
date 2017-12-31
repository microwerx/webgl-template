/// <reference path="Fluxions.ts" />
/// <reference path="IndexedGeometryMesh.ts" />

class WebGLTest2 {
    // New properties
    fluxions: Fluxions | null = null;
    renderConfig: RenderConfig | null = null;
    geometryMesh: IndexedGeometryMesh | null = null;
    initialized: boolean = false;

    // Original properties
    vertShader: WebGLShader | null = null;
    fragShader: WebGLShader | null = null;
    program: WebGLProgram | null = null;
    vbo: WebGLBuffer | null = null;
    ibo: WebGLBuffer | null = null;
    texture2D: WebGLTexture | null = null;
    textureCM: WebGLTexture | null = null;

    uniforms: Map<string, WebGLUniformLocation | null> = new Map<string, WebGLUniformLocation | null>([
        ["CameraMatrix", null],
        ["ProjectionMatrix", null],
        ["WorldMatrix", null]
    ]);

    CameraMatrix: Matrix4 = Matrix4.makeLookAt(new Vector3(0, 0, 10), new Vector3(), new Vector3(0, 1, 0));
    WorldMatrix: Matrix4 = Matrix4.makeIdentity();
    Object1Matrix: Matrix4 = Matrix4.makeTranslation(-.2, 0, 0);
    Object2Matrix: Matrix4 = Matrix4.makeTranslation(.2, 0, 0);
    ProjectionMatrix: Matrix4 = Matrix4.makePerspective(45, 1, 0.1, 100.0);

    vertices: number[] = [
        0, 1, 0, 1,
        -1, -1, 0, 1,
        1, -1, 0, 1
    ];
    indices: number[] = [
        0, 1, 2
    ];

    private readonly vertShaderSource: string = `
uniform mat4 WorldMatrix;
uniform mat4 CameraMatrix;
uniform mat4 ProjectionMatrix;

attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec4 aColor;
attribute vec4 aTexCoord;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;
varying vec3 VS_CameraDir;

void main(void)
{
    VS_Position = WorldMatrix * aPosition;
    VS_CameraDir = CameraMatrix[3].xyz - VS_Position.xyz;
    VS_Normal = aNormal;
    VS_Color = aColor;
    VS_TexCoord = aTexCoord;
    gl_Position = ProjectionMatrix * CameraMatrix * WorldMatrix * aPosition;
}
        `;

    private readonly fragShaderSource: string = `
precision mediump float;

uniform float timer;
uniform vec2  mouse;
uniform vec3  LightDir;

uniform sampler2D Texture2D;
uniform samplerCube TextureCubeMap;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;
varying vec3 VS_CameraDir;

void main(void)
{
    vec3 V = normalize(VS_CameraDir);
    vec3 L = normalize (LightDir);
    vec3 N = normalize (VS_Normal);
    float NdotL = max(0.0, dot(N, L));
    gl_FragColor = NdotL * vec4(VS_Color.rgb,1.0);//vec4(1.0,1.0,1.0,1.0) * NdotL;// + texture2D(Texture2D, VS_TexCoord.st);
    gl_FragColor = texture2D(Texture2D, VS_TexCoord.st);
}
        `;

    constructor() { }

    test(gl: WebGLRenderingContext): boolean {
        if (!this.fluxions) {
            this.fluxions = new Fluxions(gl);

            if (!this.initShaders(gl)) {
                this.kill(gl);
                return false;
            }
            if (!this.initBuffers(gl)) {
                this.kill(gl);
                return false;
            }
        }
        if (!this.drawScene(gl)) {
            this.kill(gl);
            return false;
        }
        //this.kill(gl);
        return true;
    }

    kill(gl: WebGLRenderingContext): void {
        if (this.vertShader) {
            gl.deleteShader(this.vertShader);
            this.vertShader = null;
        }
        if (this.fragShader) {
            gl.deleteShader(this.fragShader);
            this.fragShader = null;
        }
        if (this.program) {
            gl.deleteProgram(this.program);
            this.program = null;
        }
        if (this.vbo) {
            gl.deleteBuffer(this.vbo);
            this.vbo = null;
        }
        if (this.ibo) {
            gl.deleteBuffer(this.ibo);
            this.ibo = null;
        }
        if (this.texture2D) {
            gl.deleteTexture(this.texture2D);
            this.texture2D = null;
        }
        if (this.textureCM) {
            gl.deleteTexture(this.textureCM);
            this.textureCM = null;
        }
        this.fluxions = null;
    }

    initShaders(gl: WebGLRenderingContext): boolean {
        if (this.fluxions) {
            this.renderConfig = this.fluxions.CreateRenderConfig(this.vertShaderSource, this.fragShaderSource);
        }
        this.vertShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        this.program = gl.createProgram();
        if (!this.vertShader || !this.fragShader || !this.program)
            return false;
        gl.shaderSource(this.vertShader, this.vertShaderSource);
        gl.compileShader(this.vertShader);
        if (!gl.getShaderParameter(this.vertShader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(this.vertShader));
            return false;
        }
        gl.attachShader(this.program, this.vertShader);

        gl.shaderSource(this.fragShader, this.fragShaderSource);
        gl.compileShader(this.fragShader);
        if (!gl.getShaderParameter(this.fragShader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(this.fragShader));
            return false;
        }
        gl.attachShader(this.program, this.fragShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(this.program));
            return false;
        }

        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        this.uniforms.clear();
        for (let i = 0; i < numUniforms; i++) {
            let uniform: WebGLActiveInfo | null = gl.getActiveUniform(this.program, i);
            if (!uniform)
                continue;
            this.uniforms.set(uniform.name, gl.getUniformLocation(this.program, uniform.name));
        }

        return true;
    }

    initBuffers(gl: WebGLRenderingContext): boolean {
        if (!this.fluxions)
            return false;
        this.geometryMesh = new IndexedGeometryMesh(this.fluxions);
        this.geometryMesh.VertexAttrib3(1, 0, 1, 1);

        this.geometryMesh.VertexAttrib3(2, 0, 1, 1);
        this.geometryMesh.VertexAttrib4(3, 0.5, 1, 0, 0);
        this.geometryMesh.VertexAttrib4(0, 0, 1, 0, 1);

        this.geometryMesh.VertexAttrib3(2, 1, 0, 1);
        this.geometryMesh.VertexAttrib4(3, 0, 0, 0, 0);
        this.geometryMesh.VertexAttrib4(0, -1, -1, 0, 1);

        this.geometryMesh.VertexAttrib3(2, 1, 1, 0);
        this.geometryMesh.VertexAttrib4(3, 1, 0, 0, 0);
        this.geometryMesh.VertexAttrib4(0, 1, -1, 0, 1);
        this.geometryMesh.BeginSurface(gl.TRIANGLES);
        this.geometryMesh.AddIndex(0);
        this.geometryMesh.AddIndex(1);
        this.geometryMesh.AddIndex(2);

        this.vbo = gl.createBuffer();
        this.ibo = gl.createBuffer();
        if (!this.vbo || !this.ibo)
            return false;
        gl.getError();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        if (gl.getError() != gl.NO_ERROR) {
            console.error("Error initializing buffers");
            return false;
        }

        const textureCubeMapSPI = [
            new ImageData(new Uint8ClampedArray([255, 0, 0, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([0, 255, 255, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([0, 255, 0, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([255, 0, 255, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([0, 0, 255, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([255, 255, 0, 255]), 1, 1)
        ];
        const checkerBoardImage: ImageData = Texture.CreateCheckerBoard(8, 8, 8, [30, 30, 30, 255], [210, 210, 210, 255]);

        this.texture2D = gl.createTexture();
        this.textureCM = gl.createTexture();
        if (!this.texture2D || !this.textureCM)
            return false;
        gl.bindTexture(gl.TEXTURE_2D, this.texture2D);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, checkerBoardImage);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCM);
        for (let i = 0; i < 6; i++) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCubeMapSPI[i]);
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

        if (gl.getError() != gl.NO_ERROR) {
            console.error("Error initializing textures");
            return false;
        }

        return true;
    }

    drawScene(gl: WebGLRenderingContext): boolean {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        let vloc = gl.getAttribLocation(this.program, "aPosition");
        if (vloc >= 0) {
            gl.vertexAttribPointer(vloc, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vloc);
        }

        gl.useProgram(this.program);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture2D);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCM);

        let loc: any;
        if (loc = this.uniforms.get("CameraMatrix")) {
            gl.uniformMatrix4fv(loc, false, this.CameraMatrix.asColMajorArray());
        }

        if (loc = this.uniforms.get("LightDir")) {
            gl.uniform3fv(loc, new Vector3(0.25, 0.25, 1.0).toFloat32Array());
        }

        if (loc = this.uniforms.get("ProjectionMatrix")) {
            let aspect: number = gl.canvas.width / gl.canvas.height;
            this.ProjectionMatrix = Matrix4.makePerspective(45, aspect, 0.1, 100.0);
            gl.uniformMatrix4fv(loc, false, this.ProjectionMatrix.asColMajorArray());
        }

        if (loc = this.uniforms.get("Texture2D")) {
            gl.uniform1i(loc, 0);
        }

        if (loc = this.uniforms.get("TextureCubeMap")) {
            gl.uniform1i(loc, 1);
        }

        let wmloc = this.uniforms.get("WorldMatrix")
        if (wmloc) {
            let matrix: number[] = this.Object1Matrix.asColMajorArray();
            gl.uniformMatrix4fv(wmloc, false, matrix);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        if (wmloc) {
            let matrix: number[] = this.Object2Matrix.asColMajorArray();
            gl.uniformMatrix4fv(wmloc, false, matrix);
        }
        //gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
        if (this.geometryMesh && this.renderConfig) {
            this.geometryMesh.Render(this.renderConfig);
        }

        if (vloc >= 0) {
            gl.disableVertexAttribArray(vloc);
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        gl.activeTexture(gl.TEXTURE0);
        gl.useProgram(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return true;
    }
};