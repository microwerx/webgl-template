/// <reference path="./Fluxions.ts" />

class Texture {
    private _texture: WebGLTexture | null = null;
    private _target: number = 0;
    private _image: HTMLImageElement | null = null;
    private _lastBoundUnit: number = 0;
    private _loaded: boolean = false;
    private _width: number = 0;
    private _height: number = 0;

    get isCubeMap(): boolean { return this._isCubeMap; }
    get isTexture2D(): boolean { return !this.isCubeMap; }
    get isLoaded(): boolean { return this._loaded; }
    get width(): number { return this._width; }
    get height(): number { return this._height; }
    get boundUnit(): number { return this._lastBoundUnit; }

    constructor(private _context: Fluxions, private _isCubeMap: boolean, private _url: string) {
        let gl = this._context.gl;
        if (!gl) return;
        this.loadTexture(gl, _url);
    }

    Upload(): boolean {
        return true;
    }

    Bind(textureUnit: number = 0): boolean {
        if (!this._texture) return false;
        this._context.gl.activeTexture(textureUnit);
        this._context.gl.bindTexture(this._target, this._texture);
        this._lastBoundUnit = textureUnit;
        return true;
    }

    Unbind(): boolean {
        if (!this._texture) return false;
        this._context.gl.activeTexture(this._lastBoundUnit);
        this._context.gl.bindTexture(this._target, null);
        this._lastBoundUnit = 0;
        return true;
    }

    private createTexture(isCubeMap: boolean): boolean {
        let gl = this._context.gl;
        if (!gl) return false;

        if (this._texture) {
            gl.deleteTexture(this._texture);
            this._texture = null;
        }

        this._texture = gl.createTexture();
        if (!this._texture)
            return false;

        if (isCubeMap) {
            this._isCubeMap = true;
            this._target = gl.TEXTURE_CUBE_MAP;
        } else {
            this._isCubeMap = false;
            this._target = gl.TEXTURE_2D;
        }
        gl.bindTexture(this._target, this._texture);
        gl.bindTexture(this._target, null);
        return true;
    }

    private setImageData(image: HTMLImageElement | null): void {
        const textureCubeMapSPI = [
            new ImageData(new Uint8ClampedArray([255, 0, 0, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([0, 255, 255, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([0, 255, 0, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([255, 0, 255, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([0, 0, 255, 255]), 1, 1),
            new ImageData(new Uint8ClampedArray([255, 255, 0, 255]), 1, 1)
        ];
        const texture2DSPI = new ImageData(new Uint8ClampedArray([255, 0, 255, 255]), 1, 1);
        let gl = this._context.gl;
        if (!gl)
            return;

        let isCubeMap = this._isCubeMap;
        let isPowerOf2 = false;
        let w = 0;
        let h = 0;
        let loadSPI = false;
        let images: any = [null, null, null, null, null, null];
        if (!image) {
            loadSPI = true;
            if (isCubeMap) {
                for (let i = 0; i < 6; i++) {
                    images[i] = textureCubeMapSPI[i];
                }
            }
            else {
                images[0] = texture2DSPI;
            }
            w = 1;
            h = 1;
        } else {
            if (image.width == 6 * image.height) {
                isCubeMap = true;
                w = image.width / 6;
                h = image.height;
                for (let i = 0; i < 6; i++) {
                    images[i] = Texture.getCubeSubTexture(i, image);
                }
            }
            else {
                w = image.width;
                h = image.height;
                images[0] = Texture.getCubeSubTexture(0, image);
            }
        }

        if ((w & (w - 1)) == 0 && (h & (h - 1)) == 0) {
            isPowerOf2 = true;
        }

        if (this.createTexture(isCubeMap)) {
            if (isCubeMap) {
                this.Bind();
                for (let i = 0; i < 6; i++) {
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Texture.getCubeSubTexture(i, images[i]));
                }
            }
            else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[0]);
            }
            if (isPowerOf2) {
                gl.generateMipmap(this._target);
                gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameterf(this._target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
            else {
                gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameterf(this._target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
        }

        this._width = w;
        this._height = h;
    }

    private loadTexture(gl: WebGLRenderingContext, url: string): boolean {
        this._loaded = false;
        this.setImageData(null);
        var self = this;
        this._image = new Image();
        this._image.onload = () => {
            if (!self._image) return;
            self.setImageData(self._image);
            self._loaded = true;
        };
        this._image.src = url;
        return true;
    }

    static getCubeSubTexture(index: number, image: HTMLImageElement): ImageData {
        const textureCubeMapSPI = [
            new Uint8ClampedArray([255, 0, 0, 255]),
            new Uint8ClampedArray([0, 255, 255, 255]),
            new Uint8ClampedArray([0, 255, 0, 255]),
            new Uint8ClampedArray([255, 0, 255, 255]),
            new Uint8ClampedArray([0, 0, 255, 255]),
            new Uint8ClampedArray([255, 255, 0, 255])
        ];
        if (image.width != image.height * 6) {
            // return the first image as the default
            index = 0;
        }
        let canvas = document.createElement("canvas");
        let size = image.height;
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        if (!context)
            return new ImageData(textureCubeMapSPI[index], 1, 1);
        context.drawImage(image, 0, 0);
        let x1 = index * size;
        let x2 = (index + 1) * size - 1;
        let y1 = 0;
        let y2 = size - 1;
        return context.getImageData(x1, y1, size, size);
    }
}