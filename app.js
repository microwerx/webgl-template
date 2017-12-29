"use strict";
/// <reference path="fluxions.ts" />
class Vector2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    reset(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mul(multiplicand) {
        return new Vector2(this.x * multiplicand, this.y * multiplicand);
    }
    // returns 0 if denominator is 0
    div(divisor) {
        if (divisor == 0.0)
            return new Vector2();
        return new Vector2(this.x / divisor, this.y / divisor);
    }
    toFloat32Array() {
        return new Float32Array([this.x, this.y]);
    }
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    toVector3() {
        return new Vector3(this.x, this.y, 0.0);
    }
    toVector4() {
        return new Vector4(this.x, this.y, 0.0, 0.0);
    }
    project() {
        return this.x / this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    norm() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector2();
        else
            len = Math.sqrt(len);
        return new Vector2(this.x / len, this.y / len);
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    static normalize(v) {
        let len = v.length();
        if (len == 0.0) {
            v.reset(0.0, 0.0);
        }
        else {
            v.x /= len;
            v.y /= len;
        }
        return v;
    }
}
/// <reference path="fluxions.ts" />
class Vector3 {
    constructor(x = 0.0, y = 0.0, z = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    reset(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    mul(multiplicand) {
        return new Vector3(this.x * multiplicand, this.y * multiplicand, this.z * multiplicand);
    }
    // returns 0 if denominator is 0
    div(divisor) {
        if (divisor == 0.0)
            return new Vector3();
        return new Vector3(this.x / divisor, this.y / divisor, this.z / divisor);
    }
    toFloat32Array() {
        return new Float32Array([this.x, this.y, this.z]);
    }
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    toVector4(w) {
        return new Vector4(this.x, this.y, this.z, w);
    }
    project() {
        return new Vector2(this.x / this.z, this.y / this.z);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    norm() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector3();
        else
            len = Math.sqrt(len);
        return new Vector3(this.x / len, this.y / len, this.z / len);
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.x * v2.y;
    }
    static cross(a, b) {
        return new Vector3(a.y * b.z - b.y * a.z, a.z * b.x - b.z * a.x, a.x * b.y - b.x * a.y);
    }
}
/// <reference path="fluxions.ts" />
class Vector4 {
    constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
        return this;
    }
    reset(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    add(v) {
        return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    sub(v) {
        return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    mul(multiplicand) {
        return new Vector4(this.x * multiplicand, this.y * multiplicand, this.z * multiplicand, this.w * multiplicand);
    }
    // returns 0 if denominator is 0
    div(divisor) {
        if (divisor == 0.0)
            return new Vector4();
        return new Vector4(this.x / divisor, this.y / divisor, this.z / divisor, this.w / divisor);
    }
    toFloat32Array() {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    toVector3() {
        return new Vector3(this.x, this.y, this.z);
    }
    project() {
        return new Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    norm() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector4();
        else
            len = Math.sqrt(len);
        return new Vector4(this.x / len, this.y / len, this.z / len, this.w / len);
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
    }
    static normalize(v) {
        let len = v.length();
        if (len == 0.0) {
            v.reset(0.0, 0.0, 0.0, 0.0);
        }
        else {
            v.x /= len;
            v.y /= len;
            v.z /= len;
            v.w /= len;
        }
        return v;
    }
}
/// <reference path="Vector2.ts" />
/// <reference path="Vector3.ts" />
/// <reference path="Vector4.ts" />
class Fluxions {
    constructor() {
    }
}
/// <reference path="./fluxions-webgl/fluxions.ts"/>
var WebGLTemplate;
(function (WebGLTemplate) {
    class Context {
        constructor() {
            this.parentElement = null;
            this.canvasElement = null;
            this.renderingContext = null;
            this.experimentalContext = false;
            this.initialized = false;
            this._hasStandardDerivatives = false;
            this._hasDepthTexture = false;
            this._hasTextureFloat = false;
            this._hasElementIndexUint = false;
        }
        get hasStandardDerivatives() {
            return this._hasStandardDerivatives;
        }
        get hasDepthTexture() {
            return this._hasDepthTexture;
        }
        get hasTextureFloat() {
            return this._hasTextureFloat;
        }
        get hasElementIndexUint() {
            return this._hasElementIndexUint;
        }
        get hasExpectedExtensions() {
            return this._hasDepthTexture && this._hasElementIndexUint && this._hasStandardDerivatives && this._hasTextureFloat;
        }
        get gl() {
            return this.renderingContext;
        }
        HasExtensions(names) {
            if (!this.renderingContext)
                return false;
            let supportedExtensions = this.renderingContext.getSupportedExtensions();
            if (!supportedExtensions)
                return false;
            let allFound = true;
            for (var name of names) {
                let found = false;
                for (var ext of supportedExtensions) {
                    if (name == ext) {
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
        ClearScreen(r, g, b) {
            if (!this.gl)
                return;
            this.gl.clearColor(r, g, b, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }
        static CreateContext(width = 512, height = 512, parentElement) {
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
    WebGLTemplate.Context = Context;
})(WebGLTemplate || (WebGLTemplate = {}));
