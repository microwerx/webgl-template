/// <reference path="Vector2.ts" />
/// <reference path="Vector3.ts" />
/// <reference path="Vector4.ts" />
/// <reference path="Matrix2.ts" />
/// <reference path="Matrix3.ts" />
/// <reference path="Matrix4.ts" />
/// <reference path="RenderConfig.ts" />
/// <reference path="IndexedGeometryMesh.ts" />
/// <reference path="Texture.ts" />
/// <reference path="MaterialLibrary.ts" />
/// <reference path="WebGLTest.ts" />
/// <reference path="WebGLTest2.ts" />

class Fluxions {
    constructor(public gl: WebGLRenderingContext) {

    }

    CreateRenderConfig(vertShaderText: string, fragShaderText: string): RenderConfig {
        return new RenderConfig(this, vertShaderText, fragShaderText);
    }

    CreateIndexGeometryMesh(): IndexedGeometryMesh {
        return new IndexedGeometryMesh(this);
    }

    testWebGL: WebGLTest = new WebGLTest();
    testWebGL2: WebGLTest2 = new WebGLTest2();
}