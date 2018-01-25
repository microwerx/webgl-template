/// <reference path="Fluxions.ts" />
/// <reference path="Colors.ts" />
/// <reference path="IndexedGeometryMesh.ts" />

class WebGLTest3 {
    // New properties
    fluxions: Fluxions | null = null;
    renderConfig: RenderConfig | null = null;
    geometryMesh: IndexedGeometryMesh | null = null;
    initialized: boolean = false;
    shaderLoader: Utils.ShaderLoader | null = null;

    // Original properties
    texture2D: WebGLTexture | null = null;
    textureCM: WebGLTexture | null = null;
    textureCubePerlin: WebGLTexture | null = null;
    texturePerlin: WebGLTexture | null = null;

    CameraMatrix: Matrix4 = Matrix4.makeLookAt(new Vector3(0, 0, 10), new Vector3(), new Vector3(0, 1, 0));
    WorldMatrix: Matrix4 = Matrix4.makeIdentity();
    Object1Matrix: Matrix4 = Matrix4.makeTranslation(0, -0.5, 0);
    Object2Matrix: Matrix4 = Matrix4.makeTranslation(.2, 0, -5);
    ProjectionMatrix: Matrix4 = Matrix4.makePerspectiveY(45, 1, 0.1, 100.0);

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
uniform samplerCube TextureCube;

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
    gl_FragColor = textureCube(TextureCube, vec3(-1.0, VS_TexCoord.s, VS_TexCoord.t));
    gl_FragColor = texture2D(Texture2D, VS_TexCoord.st);
}
        `;

    constructor() { }

    test(gl: WebGLRenderingContext, timeInSeconds: number): boolean {
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
        if (!this.drawScene(gl, timeInSeconds)) {
            this.kill(gl);
            return false;
        }
        //this.kill(gl);
        return true;
    }

    kill(gl: WebGLRenderingContext): void {
        if (this.texture2D) {
            gl.deleteTexture(this.texture2D);
            this.texture2D = null;
        }
        if (this.textureCM) {
            gl.deleteTexture(this.textureCM);
            this.textureCM = null;
        }
        if (this.textureCubePerlin) {
            gl.deleteTexture(this.textureCubePerlin);
            this.textureCubePerlin = null;
        }
        if (this.texturePerlin) {
            gl.deleteTexture(this.texturePerlin);
            this.texturePerlin = null;
        }
        this.fluxions = null;
    }

    initShaders(gl: WebGLRenderingContext): boolean {
        if (this.fluxions) {
            this.renderConfig = this.fluxions.CreateRenderConfig(this.vertShaderSource, this.fragShaderSource);
            //this.shaderLoader = new Utils.ShaderLoader(this.renderConfig, "shaders/fullscreenquad.vert", "shaders/fullscreenquad.frag");
            this.shaderLoader = new Utils.ShaderLoader(this.renderConfig, "shaders/pbr.vert", "shaders/pbr.frag");
        }

        return true;
    }

    initBuffers(gl: WebGLRenderingContext): boolean {
        if (!this.fluxions)
            return false;
        this.geometryMesh = new IndexedGeometryMesh(this.fluxions, 1048576, 1048576);
        // this.geometryMesh.VertexAttrib3(1, 0, 1, 1);

        // this.geometryMesh.VertexAttrib3(2, 0, 1, 1);
        // this.geometryMesh.VertexAttrib4(3, 0.5, 1, 0, 0);
        // this.geometryMesh.VertexAttrib4(0, 0, 1, 0, 1);

        // this.geometryMesh.VertexAttrib3(2, 1, 0, 1);
        // this.geometryMesh.VertexAttrib4(3, 0, 0, 0, 0);
        // this.geometryMesh.VertexAttrib4(0, -1, -1, 0, 1);

        // this.geometryMesh.VertexAttrib3(2, 1, 1, 0);
        // this.geometryMesh.VertexAttrib4(3, 1, 0, 0, 0);
        // this.geometryMesh.VertexAttrib4(0, 1, -1, 0, 1);
        // this.geometryMesh.BeginSurface(gl.TRIANGLES);
        // this.geometryMesh.AddIndex(0);
        // this.geometryMesh.AddIndex(1);
        // this.geometryMesh.AddIndex(2);

        this.geometryMesh.LoadObject("assets/teapot.obj");

        let x: number = 2.0;// * 640 / 384;
        let y: number = 2.0;
        this.geometryMesh.VertexAttrib3(1, 0.0, 1.0, 0.0);
        this.geometryMesh.VertexAttrib3(1, 1.0, 1.0, 1.0);
        this.geometryMesh.VertexAttrib2(3, 0.0, 0.0);
        this.geometryMesh.VertexAttrib2(0, -x, y);
        this.geometryMesh.VertexAttrib2(3, 1.0, 0.0);
        this.geometryMesh.VertexAttrib2(0, x, y);
        this.geometryMesh.VertexAttrib2(3, 1.0, 1.0);
        this.geometryMesh.VertexAttrib2(0, x, -y);
        this.geometryMesh.VertexAttrib2(3, 0.0, 1.0);
        this.geometryMesh.VertexAttrib2(0, -x, -y);
        this.geometryMesh.BeginSurface(gl.TRIANGLE_FAN);
        this.geometryMesh.AddIndex(-1);
        this.geometryMesh.AddIndex(-1);
        this.geometryMesh.AddIndex(-1);
        this.geometryMesh.AddIndex(-1);

        if (gl.getError() != gl.NO_ERROR) {
            console.error("Error initializing buffers");
            return false;
        }

        const cubeColorsLight = [
            Colors.LightRed,
            Colors.LightCyan,
            Colors.LightGreen,
            Colors.LightMagenta,
            Colors.LightBlue,
            Colors.LightYellow
        ];
        const cubeColorsDark = [
            Colors.DarkRed,
            Colors.DarkCyan,
            Colors.DarkGreen,
            Colors.DarkMagenta,
            Colors.DarkBlue,
            Colors.DarkYellow
        ];
        this.texture2D = gl.createTexture();
        this.textureCM = gl.createTexture();
        if (!this.texture2D || !this.textureCM)
            return false;
        gl.bindTexture(gl.TEXTURE_2D, this.texture2D);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Texture.CreateCheckerBoard(8, 8, 8, Colors.Blue, Colors.Yellow));
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCM);
        for (let i = 0; i < 6; i++) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Texture.CreateCheckerBoard(8, 8, 8, cubeColorsDark[i], cubeColorsLight[i]));
        }
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

        this.textureCubePerlin = gl.createTexture();
        if (this.textureCubePerlin) {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCubePerlin);
            for (let i = 0; i < 6; i++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Texture.CreatePerlinCube(128, i, cubeColorsDark[i], cubeColorsLight[i]));
            }
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }

        this.texturePerlin = gl.createTexture();
        if (this.texturePerlin) {
            gl.bindTexture(gl.TEXTURE_2D, this.texturePerlin);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Texture.CreatePerlinCube(32, 4, Colors.Blue, Colors.Green));
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }

        if (gl.getError() != gl.NO_ERROR) {
            console.error("Error initializing textures");
            return false;
        }

        return true;
    }

    drawScene(gl: WebGLRenderingContext, timeInSeconds: number): boolean {
        if (!this.renderConfig)
            return false;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);

        this.renderConfig.Use();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture2D);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCM);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCubePerlin);
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, this.texturePerlin);

        let loc: any;
        if (loc = this.renderConfig.uniforms.get("CameraMatrix")) {
            // this.CameraMatrix.LoadIdentity();
            // this.CameraMatrix.Translate(0.0, 0.0, 5.0);
            // this.CameraMatrix.Rotate(10.0 * Math.sin(timeInSeconds), 0.0, 1.0, 0.0);
            // this.CameraMatrix.Rotate(timeInSeconds, 1.0, 0.0, 0.0);
            gl.uniformMatrix4fv(loc, false, this.CameraMatrix.asColMajorArray());
        }

        if (loc = this.renderConfig.uniforms.get("LightDir")) {
            gl.uniform3fv(loc, new Vector3(0.25, 0.25, 1.0).toFloat32Array());
        }

        if (loc = this.renderConfig.uniforms.get("ProjectionMatrix")) {
            let aspect: number = gl.canvas.width / gl.canvas.height;
            this.ProjectionMatrix = Matrix4.makePerspectiveX(45, aspect, 0.1, 100.0);
            //this.ProjectionMatrix = Matrix4.makeOrtho2D(-aspect, aspect, -1.0, 1.0);
            gl.uniformMatrix4fv(loc, false, this.ProjectionMatrix.asColMajorArray());
        }

        if (loc = this.renderConfig.uniforms.get("Texture2D")) {
            gl.uniform1i(loc, 0);
        }

        if (loc = this.renderConfig.uniforms.get("TextureCube")) {
            gl.uniform1i(loc, 1);
        }

        if (loc = this.renderConfig.uniforms.get("TextureCubePerlin")) {
            gl.uniform1i(loc, 2);
        }

        if (loc = this.renderConfig.uniforms.get("TexturePerlin")) {
            gl.uniform1i(loc, 3);
        }

        let wmloc = this.renderConfig.uniforms.get("WorldMatrix")
        if (wmloc) {
            let matRotate = Matrix4.multiply(this.Object1Matrix, Matrix4.makeRotation(5 * timeInSeconds, 0, 1, 0));
            let matrix: number[] = matRotate.asColMajorArray();
            gl.uniformMatrix4fv(wmloc, false, matrix);
        }
        if (this.geometryMesh && this.renderConfig) {
            this.geometryMesh.Render(this.renderConfig);
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.activeTexture(gl.TEXTURE0);
        gl.useProgram(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.disable(gl.DEPTH_TEST);
        return true;
    }
};