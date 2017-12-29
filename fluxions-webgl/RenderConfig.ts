/// <reference path="./fluxions.ts"/>

class RenderConfig {
    private _isCompiled: boolean = false;
    private _isLinked: boolean = false;
    private _vertShader: WebGLShader | null = null;
    private _fragShader: WebGLShader | null = null;
    private _program: WebGLProgram | null = null;
    private _vertShaderInfoLog: string = "";
    private _fragShaderInfoLog: string = "";
    private _vertShaderCompileStatus: boolean = false;
    private _fragShaderCompileStatus: boolean = false;
    private _programInfoLog: string = "";
    private _programLinkStatus: boolean = false;

    constructor(private _context: Fluxions, private _vertShaderSource: string, private _fragShaderSource: string) {
        this.Reset(this._vertShaderSource, this._fragShaderSource);
    }

    IsCompiledAndLinked(): boolean {
        if (this._isCompiled && this._isLinked)
            return true;
        return false;
    }

    public Use() {
        this._context.gl.useProgram(this._program);
    }

    public Restore() {

    }

    public GetAttribLocation(name: string): number {
        let gl = this._context.gl;
        return gl.getAttribLocation(this._program, name);
    }

    public GetUniformLocation(name: string): number {
        let gl = this._context.gl;
        let uloc: any = gl.getUniformLocation(this._program, name);
        if (!uloc) return -1;
        return uloc;
    }

    private Reset(vertShaderSource: string, fragShaderSource: string) {
        let gl = this._context.gl;

        let vertShader: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);
        if (vertShader) {
            gl.shaderSource(vertShader, vertShaderSource);
            gl.compileShader(vertShader);
            let status = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
            let infoLog: string | null = null;
            if (!status)
                infoLog = gl.getShaderInfoLog(vertShader);
            if (status)
                this._vertShaderCompileStatus = true;
            if (infoLog)
                this._vertShaderInfoLog = infoLog;
            this._vertShader = vertShader;
        }

        let fragShader: WebGLShader | null = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragShader) {
            gl.shaderSource(fragShader, fragShaderSource);
            gl.compileShader(fragShader);
            let status = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
            let infoLog: string | null = null;
            if (!status)
                infoLog = gl.getShaderInfoLog(fragShader);
            if (status)
                this._fragShaderCompileStatus = true;
            if (infoLog)
                this._fragShaderInfoLog = infoLog;
            this._fragShader = fragShader;
        }

        if (this._vertShaderCompileStatus && this._fragShaderCompileStatus) {
            this._program = gl.createProgram();
            if (this._program) {
                gl.attachShader(this._program, this._vertShader);
                gl.attachShader(this._program, this._fragShader);
                gl.linkProgram(this._program);
                if (gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
                    this._programLinkStatus = true;
                }
                else {
                    this._programLinkStatus = false;
                    let infolog = gl.getProgramInfoLog(this._program);
                    if (infolog)
                        this._programInfoLog = infolog;
                }
            }
        }
    }
}
