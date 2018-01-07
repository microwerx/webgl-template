/// <reference path="./fluxions-webgl/Fluxions.ts"/>

namespace WebGLTemplate {
    export class Context {
        public parentElement: HTMLElement | null = null;
        public canvasElement: HTMLCanvasElement | null = null;
        public renderingContext: WebGLRenderingContext | null = null;
        public experimentalContext: boolean = false;
        private initialized: boolean = false;
        private enabledExtensions: any[] = [];

        private _hasStandardDerivatives = false;
        private _hasDepthTexture = false;
        private _hasTextureFloat = false;
        private _hasElementIndexUint = false;
        public get hasStandardDerivatives(): boolean {
            return this._hasStandardDerivatives;
        }
        public get hasDepthTexture(): boolean {
            return this._hasDepthTexture;
        }
        public get hasTextureFloat(): boolean {
            return this._hasTextureFloat;
        }
        public get hasElementIndexUint(): boolean {
            return this._hasElementIndexUint;
        }
        public get hasExpectedExtensions(): boolean {
            return this._hasDepthTexture && this._hasElementIndexUint && this._hasStandardDerivatives && this._hasTextureFloat;
        }

        public get gl(): WebGLRenderingContext | null {
            return this.renderingContext;
        }

        constructor() {
        }

        HasExtensions(names: string[]): boolean {
            if (!this.renderingContext) return false;

            let supportedExtensions = this.renderingContext.getSupportedExtensions();
            if (!supportedExtensions)
                return false;
            let allFound = true;
            for (var name of names) {
                let found = false;
                for (var ext of supportedExtensions) {
                    if (name == ext) {
                        this.enabledExtensions.push(this.renderingContext.getExtension(name));
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    allFound = false;
                    break;
                }
            }
            return allFound;
        }

        ClearScreen(r: number, g: number, b: number): void {
            if (!this.gl)
                return;
            this.gl.clearColor(r, g, b, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }

        static CreateContext(width: number = 512, height: number = 512, parentElement?: HTMLElement): Context | null {
            let ctx = new Context();
            ctx.canvasElement = document.createElement("canvas");
            if (!ctx.canvasElement)
                return null;
            ctx.canvasElement.width = width;
            ctx.canvasElement.height = height;
            if (parentElement)

                ctx.parentElement = parentElement;
            else
                ctx.parentElement = document.body;
            ctx.parentElement.appendChild(ctx.canvasElement);

            // Create rendering context, experimental if necessary
            ctx.renderingContext = ctx.canvasElement.getContext("webgl");
            if (!ctx.renderingContext) {
                ctx.renderingContext = ctx.canvasElement.getContext("experimental-webgl");
                ctx.experimentalContext = true;
            }

            if (!ctx.renderingContext) {
                return null;
            }

            // determine some essential extensions
            if (ctx.HasExtensions([
                "OES_standard_derivatives",
                "WEBGL_depth_texture",
                "OES_texture_float",
                "OES_element_index_uint"
            ])) {
                ctx._hasStandardDerivatives = true;
                ctx._hasDepthTexture = true;
                ctx._hasTextureFloat = true;
                ctx._hasElementIndexUint = true;
            }
            return ctx;
        }
    }
}