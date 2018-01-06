/// <reference path="./Fluxions.ts" />
/// <reference path="./RenderConfig.ts" />

namespace Utils {
    export class ShaderLoader {
        private vertLoaded: boolean = false;
        private fragLoaded: boolean = false;
        private vertShaderSource: string = "";
        private fragShaderSource: string = "";
        constructor(public rc: RenderConfig, public vertShaderUrl: string, public fragShaderUrl: string) {
            let self = this;
            let vertAjax: XMLHttpRequest = new XMLHttpRequest();
            vertAjax.addEventListener("load", (e) => {
                self.vertShaderSource = vertAjax.responseText;
                self.vertLoaded = true;
                if (self.vertLoaded && self.fragLoaded) {
                    self.rc.Reset(self.vertShaderSource, self.fragShaderSource);
                }
            });
            vertAjax.open("GET", vertShaderUrl);
            vertAjax.send();

            let fragAjax: XMLHttpRequest = new XMLHttpRequest();
            fragAjax.addEventListener("load", (e) => {
                self.fragShaderSource = fragAjax.responseText;
                self.fragLoaded = true;
                if (self.vertLoaded && self.fragLoaded)
                    self.rc.Reset(self.vertShaderSource, self.fragShaderSource);
            });
            fragAjax.open("GET", fragShaderUrl);
            fragAjax.send();
        }
    }

    export class TextFileLoader {
        public loaded: boolean = false;
        public error: boolean = false;
        public data: string = "";

        constructor(url: string, private callbackfn: (data: string) => void) {
            let self = this;
            let ajax = new XMLHttpRequest();
            ajax.addEventListener("load", (e) => {
                if (!ajax.responseText) {
                    self.error = true;
                    self.data = "unknown";
                }
                else {
                    self.data = ajax.responseText;
                }
                callbackfn(self.data);
                self.loaded = true;
            });
            ajax.open("GET", url);
            ajax.send();
        }
    }

    class GLTypeInfo {
        constructor(public type: number, public baseType: number, public components: number, public sizeOfType: number) { }

        CreateArray(size: number): Float32Array | Int32Array | Int16Array | Uint32Array | Uint16Array | Uint8ClampedArray | null {
            switch (this.type) {
                case WebGLRenderingContext.FLOAT:
                case WebGLRenderingContext.FLOAT_VEC2:
                case WebGLRenderingContext.FLOAT_VEC3:
                case WebGLRenderingContext.FLOAT_VEC4:
                case WebGLRenderingContext.FLOAT_MAT2:
                case WebGLRenderingContext.FLOAT_MAT3:
                case WebGLRenderingContext.FLOAT_MAT4:
                    return new Float32Array(size);
                case WebGLRenderingContext.INT:
                case WebGLRenderingContext.INT_VEC2:
                case WebGLRenderingContext.INT_VEC3:
                case WebGLRenderingContext.INT_VEC4:
                    return new Int32Array(size);
                case WebGLRenderingContext.SHORT:
                    return new Int16Array(size);
                case WebGLRenderingContext.UNSIGNED_INT:
                    return new Uint32Array(size);
                case WebGLRenderingContext.UNSIGNED_SHORT:
                    return new Uint16Array(size);
                case WebGLRenderingContext.UNSIGNED_BYTE:
                    return new Uint8ClampedArray(size);
                case WebGLRenderingContext.BOOL:
                    return new Uint32Array(size);
            }
            return null;
        }
    }

    export var WebGLTypeInfo: Map<number, GLTypeInfo> = new Map<number, GLTypeInfo>([
        [WebGLRenderingContext.BYTE, new GLTypeInfo(WebGLRenderingContext.BYTE, WebGLRenderingContext.BYTE, 1, 1)],
        [WebGLRenderingContext.UNSIGNED_BYTE, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_BYTE, WebGLRenderingContext.UNSIGNED_BYTE, 1, 1)],
        [WebGLRenderingContext.SHORT, new GLTypeInfo(WebGLRenderingContext.SHORT, WebGLRenderingContext.SHORT, 1, 2)],
        [WebGLRenderingContext.UNSIGNED_SHORT, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_SHORT, WebGLRenderingContext.UNSIGNED_SHORT, 1, 2)],
        [WebGLRenderingContext.INT, new GLTypeInfo(WebGLRenderingContext.INT, WebGLRenderingContext.INT, 1, 4)],
        [WebGLRenderingContext.UNSIGNED_INT, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        [WebGLRenderingContext.BOOL, new GLTypeInfo(WebGLRenderingContext.BOOL, WebGLRenderingContext.INT, 1, 4)],
        [WebGLRenderingContext.FLOAT, new GLTypeInfo(WebGLRenderingContext.FLOAT, WebGLRenderingContext.FLOAT, 1, 4)],
        [WebGLRenderingContext.FLOAT_VEC2, new GLTypeInfo(WebGLRenderingContext.FLOAT_VEC2, WebGLRenderingContext.FLOAT, 2, 4)],
        [WebGLRenderingContext.FLOAT_VEC3, new GLTypeInfo(WebGLRenderingContext.FLOAT_VEC3, WebGLRenderingContext.FLOAT, 3, 4)],
        [WebGLRenderingContext.FLOAT_VEC4, new GLTypeInfo(WebGLRenderingContext.FLOAT_VEC4, WebGLRenderingContext.FLOAT, 4, 4)],
        [WebGLRenderingContext.FLOAT_MAT2, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT2, WebGLRenderingContext.FLOAT, 4, 4)],
        [WebGLRenderingContext.FLOAT_MAT3, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT3, WebGLRenderingContext.FLOAT, 9, 4)],
        [WebGLRenderingContext.FLOAT_MAT4, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT4, WebGLRenderingContext.FLOAT, 16, 4)],
        // [WebGLRenderingContext.FLOAT_MAT2x3, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT2x3, WebGLRenderingContext.FLOAT, 6, 4)],
        // [WebGLRenderingContext.FLOAT_MAT2x4, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT2x4, WebGLRenderingContext.FLOAT, 8, 4)],
        // [WebGLRenderingContext.FLOAT_MAT3x2, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT3x2, WebGLRenderingContext.FLOAT, 6, 4)],
        // [WebGLRenderingContext.FLOAT_MAT3x4, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT3x4, WebGLRenderingContext.FLOAT, 12, 4)],
        // [WebGLRenderingContext.FLOAT_MAT4x2, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT4x2, WebGLRenderingContext.FLOAT, 8, 4)],
        // [WebGLRenderingContext.FLOAT_MAT4x3, new GLTypeInfo(WebGLRenderingContext.FLOAT_MAT4x3, WebGLRenderingContext.FLOAT, 12, 4)],
        // [WebGLRenderingContext.SAMPLER_1D, new GLTypeInfo(WebGLRenderingContext.SAMPLER_1D, WebGLRenderingContext.FLOAT, 1, 4)],
        [WebGLRenderingContext.SAMPLER_2D, new GLTypeInfo(WebGLRenderingContext.SAMPLER_2D, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_3D, new GLTypeInfo(WebGLRenderingContext.SAMPLER_3D, WebGLRenderingContext.FLOAT, 1, 4)],
        [WebGLRenderingContext.SAMPLER_CUBE, new GLTypeInfo(WebGLRenderingContext.SAMPLER_CUBE, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_1D_SHADOW, new GLTypeInfo(WebGLRenderingContext.SAMPLER_1D_SHADOW, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_2D_SHADOW, new GLTypeInfo(WebGLRenderingContext.SAMPLER_2D_SHADOW, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_2D_MULTISAMPLE, new GLTypeInfo(WebGLRenderingContext.SAMPLER_2D_MULTISAMPLE, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_2D_MULTISAMPLE_ARRAY, new GLTypeInfo(WebGLRenderingContext.SAMPLER_2D_MULTISAMPLE_ARRAY, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_1D_ARRAY, new GLTypeInfo(WebGLRenderingContext.SAMPLER_1D_ARRAY, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_2D_ARRAY, new GLTypeInfo(WebGLRenderingContext.SAMPLER_2D_ARRAY, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_1D_ARRAY_SHADOW, new GLTypeInfo(WebGLRenderingContext.SAMPLER_1D_ARRAY_SHADOW, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.SAMPLER_2D_ARRAY_SHADOW, new GLTypeInfo(WebGLRenderingContext.SAMPLER_2D_ARRAY_SHADOW, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.DOUBLE, new GLTypeInfo(WebGLRenderingContext.DOUBLE, WebGLRenderingContext.DOUBLE, 1, 8)],
        // [WebGLRenderingContext.DOUBLE_VEC2, new GLTypeInfo(WebGLRenderingContext.DOUBLE_VEC2, WebGLRenderingContext.DOUBLE, 2, 8)],
        // [WebGLRenderingContext.DOUBLE_VEC3, new GLTypeInfo(WebGLRenderingContext.DOUBLE_VEC3, WebGLRenderingContext.DOUBLE, 3, 8)],
        // [WebGLRenderingContext.DOUBLE_VEC4, new GLTypeInfo(WebGLRenderingContext.DOUBLE_VEC4, WebGLRenderingContext.DOUBLE, 4, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT2, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT2, WebGLRenderingContext.DOUBLE, 4, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT3, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT3, WebGLRenderingContext.DOUBLE, 9, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT4, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT4, WebGLRenderingContext.DOUBLE, 16, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT2x3, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT2x3, WebGLRenderingContext.DOUBLE, 6, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT2x4, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT2x4, WebGLRenderingContext.DOUBLE, 8, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT3x2, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT3x2, WebGLRenderingContext.DOUBLE, 6, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT3x4, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT3x4, WebGLRenderingContext.DOUBLE, 12, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT4x2, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT4x2, WebGLRenderingContext.DOUBLE, 8, 8)],
        // [WebGLRenderingContext.DOUBLE_MAT4x3, new GLTypeInfo(WebGLRenderingContext.DOUBLE_MAT4x3, WebGLRenderingContext.DOUBLE, 12, 8)],
        // [WebGLRenderingContext.INT_SAMPLER_1D, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_1D, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_2D, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_2D, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_3D, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_3D, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_CUBE, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_CUBE, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_2D_MULTISAMPLE, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_2D_MULTISAMPLE, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_2D_MULTISAMPLE_ARRAY, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_2D_MULTISAMPLE_ARRAY, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_1D_ARRAY, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_1D_ARRAY, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_SAMPLER_2D_ARRAY, new GLTypeInfo(WebGLRenderingContext.INT_SAMPLER_2D_ARRAY, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_1D, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_1D, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_3D, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_3D, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_CUBE, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_CUBE, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE_ARRAY, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D_MULTISAMPLE_ARRAY, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_1D_ARRAY, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_1D_ARRAY, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D_ARRAY, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_SAMPLER_2D_ARRAY, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_1D, new GLTypeInfo(WebGLRenderingContext.IMAGE_1D, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_2D, new GLTypeInfo(WebGLRenderingContext.IMAGE_2D, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_3D, new GLTypeInfo(WebGLRenderingContext.IMAGE_3D, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_2D_RECT, new GLTypeInfo(WebGLRenderingContext.IMAGE_2D_RECT, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_CUBE, new GLTypeInfo(WebGLRenderingContext.IMAGE_CUBE, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_BUFFER, new GLTypeInfo(WebGLRenderingContext.IMAGE_BUFFER, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_1D_ARRAY, new GLTypeInfo(WebGLRenderingContext.IMAGE_1D_ARRAY, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_2D_ARRAY, new GLTypeInfo(WebGLRenderingContext.IMAGE_2D_ARRAY, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_2D_MULTISAMPLE, new GLTypeInfo(WebGLRenderingContext.IMAGE_2D_MULTISAMPLE, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.IMAGE_2D_MULTISAMPLE_ARRAY, new GLTypeInfo(WebGLRenderingContext.IMAGE_2D_MULTISAMPLE_ARRAY, WebGLRenderingContext.FLOAT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_1D, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_1D, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_2D, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_2D, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_3D, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_3D, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_2D_RECT, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_2D_RECT, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_CUBE, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_CUBE, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_BUFFER, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_BUFFER, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_1D_ARRAY, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_1D_ARRAY, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_2D_ARRAY, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_2D_ARRAY, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_2D_MULTISAMPLE, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_2D_MULTISAMPLE, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.INT_IMAGE_2D_MULTISAMPLE_ARRAY, new GLTypeInfo(WebGLRenderingContext.INT_IMAGE_2D_MULTISAMPLE_ARRAY, WebGLRenderingContext.INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_1D, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_1D, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_3D, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_3D, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_RECT, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_RECT, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_CUBE, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_CUBE, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_BUFFER, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_BUFFER, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_1D_ARRAY, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_1D_ARRAY, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_ARRAY, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_ARRAY, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_MULTISAMPLE, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_MULTISAMPLE, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_MULTISAMPLE_ARRAY, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_IMAGE_2D_MULTISAMPLE_ARRAY, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
        // [WebGLRenderingContext.UNSIGNED_INT_ATOMIC_COUNTER, new GLTypeInfo(WebGLRenderingContext.UNSIGNED_INT_ATOMIC_COUNTER, WebGLRenderingContext.UNSIGNED_INT, 1, 4)],
    ]);
}