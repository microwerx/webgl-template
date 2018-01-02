# HOWTO

## Introduction

WebGL Template is a graphics from scratch engine. Graphics from Scratch is a term for doing things with as little precooked ingredients as possible. So, WebGL Template is a collection of components to make WebGL easier to use in terms of shader experimentation. We use a few components from Fluxions, in particular vectors and matrices. The goal is to get data in and out of the shader.

## Quick TypeScript Information

If using Microsoft Visual Studio Code, then you can open two terminals. In terminal 1, you want to run the command `tsc -w` which will watch for changes in your source code and recompile. In terminal 2, you want to run the command `lite-server` which will look for changes in your source code and refresh the browser. The file `webgl-template.ts` is where you want to update your application.

## Contents

* Fluxions 3D Engine
  * Mathematics
    * `Vector2`
    * `Vector3`
    * `Vector4`
    * `Matrix2`
    * `Matrix3`
    * `Matrix4`
  * Rendering
    * `RenderConfig`
    * `Texture`
    * `ShaderSourceCode`
    * `IndexedGeometryMesh`
    * `MaterialLibrary`
    * `SimpleSceneGraph`
  * Examples
    * Real-time Ray Tracing
    * Physically Based Rendering
* WebGL Template
  * `WebGLTest1`
  * `WebGLTest2`

## Fluxions 3D Engine

### Mathematics

There are six basic classes for 2, 3, and 4 component vectors and 2x2, 3x3, and 4x4 component matrices. Each one has static methods for component-wise addition, subtraction, negation, multiplication, and division.

Here are the constructors:

    class Vector2 {
        constructor(public x: number, public y: number)
        { }
    };

    class Vector3 {
        constructor(public x: number, public y: number, public z: number)
        { }
    };

    class Vector4 {
        constructor(public x: number, public y: number, public z: number, public w: number)
        { }
    }

    class Matrix2 {
        constructor(
            public m11: number, public m21: number,
            public m12: number, public m22: number
        ) { }
    }

    class Matrix3 {
        constructor(
            public m11: number, public m21: number, public m31: number,
            public m12: number, public m22: number, public m32: number,
            public m13: number, public m23: number, public m33: number
        ) { }
    }

    class Matrix4 {
        constructor(
            public m11: number, public m21: number, public m31: number, public m41: number,
            public m12: number, public m22: number, public m32: number, public m42: number,
            public m13: number, public m23: number, public m33: number, public m43: number,
            public m14: number, public m24: number, public m34: number, public m44: number
        ) { }
    }

We define the term `VectorType` to be a `number`, `Vector{234}`, and `Matrix{234}`. The supported static operations are:

    static add(a: VectorType, b: VectorType): VectorType {
        return new VectorType(a.x + b.x, ...);
    }

    static sub(a: VectorType, b: VectorType): VectorType {
        return new VectorType(a.x - b.x, ...);
    }

    static mul(a: VectorType, b: VectorType): VectorType {
        return new VectorType(a.x * b.x, ...);
    }

    static div(a: VectorType, b: VectorType): VectorType {
        return new VectorType(a.x / b.x, ...);
    }

The supported member functions are:

    copy(): VectorType {
        return new VectorType(this);
    }

    equals(b: VectorType, epsilon: number = 1e-6): boolean {
        // return true if equal, false if not
        if (this.x - b.x >= epsilon) return false;
        // ...
        return true;
    }

    notequals(b: VectorType, epsilon: number = 1e-6): boolean {
        return !this.equals(v, epsilon);
    }

    lessThan(b: VectorType, epsilon: number = 1e-6): boolean {
        return (); ///
    }

    add(b: VectorType): VectorType {
        this.x += b.x;
        // ...
        return this;
    }

    sub(b: VectorType): VectorType {
        this.x -= b.x;
        // ...
        return this;
    }

    mul(b: VectorType): VectorType {
        // this.x *= b.x;
        return this;
    }

    compMult(m: MatrixType): MatrixType {
        this.m11 *= m.m11;
        // ...
        return this;
    }

    negate(): VectorType {
        this.x = -this.x;
        // ...
        return this;
    }

TODO: finish this section

## Examples

### Real-time Ray Tracing

TODO: implement sphere based ray tracing with GLSL

### Physically Based BRDF

TODO: implement physically based BRDF