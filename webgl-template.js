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
/// <reference path="./Fluxions.ts" />
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
    static add(a, b) {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    static sub(a, b) {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    static mul(a, b) {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }
    static div(a, b) {
        return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
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
    toArray() {
        return [this.x, this.y, this.z, this.w];
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
/// <reference path="Fluxions.ts" />
class Matrix2 {
    constructor(m11, m21, m12, m22) {
        this.m11 = m11;
        this.m21 = m21;
        this.m12 = m12;
        this.m22 = m22;
    }
    static makeIdentity() {
        return new Matrix2(1, 0, 0, 1);
    }
    static makeZero() {
        return new Matrix2(0, 0, 0, 0);
    }
    static makeColMajor(m11, m21, m12, m22) {
        return new Matrix2(m11, m21, m12, m22);
    }
    static makeRowMajor(m11, m12, m21, m22) {
        return new Matrix2(m11, m21, m12, m22);
    }
    static fromRowMajorArray(v) {
        if (v.length >= 4)
            return new Matrix2(v[0], v[2], v[1], v[3]);
        return new Matrix2(0, 0, 0, 0);
    }
    static fromColMajorArray(v) {
        if (v.length >= 4)
            return new Matrix2(v[0], v[1], v[2], v[3]);
        return new Matrix2(0, 0, 0, 0);
    }
    static makeScale(x, y) {
        return Matrix2.makeRowMajor(x, 0, 0, y);
    }
    static makeRotation(angleInDegrees, x, y, z) {
        var c = Math.cos(angleInDegrees * Math.PI / 180.0);
        var s = Math.sin(angleInDegrees * Math.PI / 180.0);
        return Matrix2.makeRowMajor(c, -s, s, c);
    }
    asColMajorArray() {
        return [
            this.m11, this.m21,
            this.m12, this.m22
        ];
    }
    asRowMajorArray() {
        return [
            this.m11, this.m12,
            this.m21, this.m22
        ];
    }
    static multiply(m1, m2) {
        return new Matrix2(m1.m11 * m2.m11 + m1.m21 * m2.m12, m1.m11 * m2.m21 + m1.m21 * m2.m22, m1.m12 * m2.m11 + m1.m22 * m2.m12, m1.m12 * m2.m21 + m1.m22 * m2.m22);
    }
    copy(m) {
        this.m11 = m.m11;
        this.m21 = m.m21;
        this.m12 = m.m12;
        this.m22 = m.m22;
        return this;
    }
    concat(m) {
        this.copy(Matrix2.multiply(this, m));
        return this;
    }
    transform(v) {
        return new Vector2(this.m11 * v.x + this.m12 * v.y, this.m21 * v.x + this.m22 * v.y);
    }
    asInverse() {
        var tmpD = 1.0 / (this.m11 * this.m22 - this.m12 * this.m21);
        return Matrix2.makeRowMajor(this.m22 * tmpD, -this.m12 * tmpD, -this.m21 * tmpD, this.m11 * tmpD);
    }
    asTranspose() {
        return Matrix2.makeRowMajor(this.m11, this.m21, this.m12, this.m22);
    }
} // class Matrix2
/// <reference path="Fluxions.ts"/>
class Matrix3 {
    constructor(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        this.m11 = m11;
        this.m21 = m21;
        this.m31 = m31;
        this.m12 = m12;
        this.m22 = m22;
        this.m32 = m32;
        this.m13 = m13;
        this.m23 = m23;
        this.m33 = m33;
    }
    static makeIdentity() {
        return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
    static makeZero() {
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeColMajor(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        return new Matrix3(m11, m21, m31, m12, m22, m32, m13, m23, m33);
    }
    static makeRowMajor(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        return new Matrix3(m11, m21, m31, m12, m22, m32, m13, m23, m33);
    }
    static fromRowMajorArray(v) {
        if (v.length >= 9)
            return new Matrix3(v[0], v[3], v[6], v[1], v[4], v[7], v[2], v[5], v[8]);
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static fromColMajorArray(v) {
        if (v.length >= 9)
            return new Matrix3(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8]);
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeScale(x, y, z) {
        return Matrix3.makeRowMajor(x, 0, 0, 0, y, 0, 0, 0, z);
    }
    static makeRotation(angleInDegrees, x, y, z) {
        var c = Math.cos(angleInDegrees * Math.PI / 180.0);
        var s = Math.sin(angleInDegrees * Math.PI / 180.0);
        var invLength = 1.0 / Math.sqrt(x * x + y * y + z * z);
        x *= invLength;
        y *= invLength;
        z *= invLength;
        return Matrix3.makeRowMajor(x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c);
    }
    static makeCubeFaceMatrix(face) {
        // +X
        if (face == 0)
            return Matrix3.makeRotation(90.0, 0.0, 1.0, 0.0);
        // -X
        if (face == 1)
            return Matrix3.makeRotation(270.0, 0.0, 1.0, 0.0);
        // +Y
        if (face == 2)
            return Matrix3.makeRotation(90.0, 1.0, 0.0, 0.0);
        // -Y
        if (face == 3)
            return Matrix3.makeRotation(270.0, 1.0, 0.0, 0.0);
        // +Z
        if (face == 4)
            return Matrix3.makeIdentity();
        // -Z
        if (face == 5)
            return Matrix3.makeRotation(180.0, 0.0, 1.0, 0.0);
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    asColMajorArray() {
        return [
            this.m11, this.m21, this.m31,
            this.m12, this.m22, this.m32,
            this.m13, this.m23, this.m33
        ];
    }
    asRowMajorArray() {
        return [
            this.m11, this.m12, this.m13,
            this.m21, this.m22, this.m23,
            this.m31, this.m32, this.m33
        ];
    }
    static multiply(m1, m2) {
        return new Matrix3(m1.m11 * m2.m11 + m1.m21 * m2.m12 + m1.m31 * m2.m13, m1.m11 * m2.m21 + m1.m21 * m2.m22 + m1.m31 * m2.m23, m1.m11 * m2.m31 + m1.m21 * m2.m32 + m1.m31 * m2.m33, m1.m12 * m2.m11 + m1.m22 * m2.m12 + m1.m32 * m2.m13, m1.m12 * m2.m21 + m1.m22 * m2.m22 + m1.m32 * m2.m23, m1.m12 * m2.m31 + m1.m22 * m2.m32 + m1.m32 * m2.m33, m1.m13 * m2.m11 + m1.m23 * m2.m12 + m1.m33 * m2.m13, m1.m13 * m2.m21 + m1.m23 * m2.m22 + m1.m33 * m2.m23, m1.m13 * m2.m31 + m1.m23 * m2.m32 + m1.m33 * m2.m33);
    }
    copy(m) {
        this.m11 = m.m11;
        this.m21 = m.m21;
        this.m31 = m.m31;
        this.m12 = m.m12;
        this.m22 = m.m22;
        this.m32 = m.m32;
        this.m13 = m.m13;
        this.m23 = m.m23;
        this.m33 = m.m33;
        return this;
    }
    concat(m) {
        this.copy(Matrix3.multiply(this, m));
        return this;
    }
    transform(v) {
        return new Vector3(this.m11 * v.x + this.m12 * v.y + this.m13 * v.z, this.m21 * v.x + this.m22 * v.y + this.m23 * v.z, this.m31 * v.x + this.m32 * v.y + this.m33 * v.z);
    }
    asInverse() {
        var tmpA = this.m22 * this.m33 - this.m23 * this.m32;
        var tmpB = this.m21 * this.m32 - this.m22 * this.m31;
        var tmpC = this.m23 * this.m31 - this.m21 * this.m33;
        var tmpD = 1.0 / (this.m11 * tmpA + this.m12 * tmpC + this.m13 * tmpB);
        return new Matrix3(tmpA * tmpD, (this.m13 * this.m32 - this.m12 * this.m33) * tmpD, (this.m12 * this.m23 - this.m13 * this.m22) * tmpD, tmpC * tmpD, (this.m11 * this.m33 - this.m13 * this.m31) * tmpD, (this.m13 * this.m21 - this.m11 * this.m23) * tmpD, tmpB * tmpD, (this.m12 * this.m31 - this.m11 * this.m32) * tmpD, (this.m11 * this.m22 - this.m12 * this.m21) * tmpD);
    }
    asTranspose() {
        return new Matrix3(this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
    }
} // class Matrix3
///<reference path="Fluxions.ts"/>
class Matrix4 {
    constructor(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        this.m11 = m11;
        this.m21 = m21;
        this.m31 = m31;
        this.m41 = m41;
        this.m12 = m12;
        this.m22 = m22;
        this.m32 = m32;
        this.m42 = m42;
        this.m13 = m13;
        this.m23 = m23;
        this.m33 = m33;
        this.m43 = m43;
        this.m14 = m14;
        this.m24 = m24;
        this.m34 = m34;
        this.m44 = m44;
    }
    copy(m) {
        return this.LoadMatrix(m);
    }
    LoadRowMajor(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m24 = m24;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        this.m34 = m34;
        this.m41 = m41;
        this.m42 = m42;
        this.m43 = m43;
        this.m44 = m44;
        return this;
    }
    LoadColMajor(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m24 = m24;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        this.m34 = m34;
        this.m41 = m41;
        this.m42 = m42;
        this.m43 = m43;
        this.m44 = m44;
        return this;
    }
    LoadIdentity() {
        return this.LoadMatrix(Matrix4.makeIdentity());
    }
    Translate(x, y, z) {
        return this.MultMatrix(Matrix4.makeTranslation(x, y, z));
    }
    Rotate(angleInDegrees, x, y, z) {
        return this.MultMatrix(Matrix4.makeRotation(angleInDegrees, x, y, z));
    }
    Scale(sx, sy, sz) {
        return this.MultMatrix(Matrix4.makeScale(sx, sy, sz));
    }
    LookAt(eye, center, up) {
        return this.MultMatrix(Matrix4.makeLookAt(eye, center, up));
    }
    Frustum(left, right, bottom, top, near, far) {
        return this.MultMatrix(Matrix4.makeFrustum(left, right, bottom, top, near, far));
    }
    Ortho(left, right, bottom, top, near, far) {
        return this.MultMatrix(Matrix4.makeOrtho(left, right, bottom, top, near, far));
    }
    Ortho2D(left, right, bottom, top) {
        return this.MultMatrix(Matrix4.makeOrtho2D(left, right, bottom, top));
    }
    PerspectiveX(fovx, aspect, near, far) {
        return this.MultMatrix(Matrix4.makePerspectiveX(fovx, aspect, near, far));
    }
    PerspectiveY(fovy, aspect, near, far) {
        return this.MultMatrix(Matrix4.makePerspectiveY(fovy, aspect, near, far));
    }
    ShadowBias() {
        return this.MultMatrix(Matrix4.makeShadowBias());
    }
    CubeFaceMatrix(face) {
        return this.MultMatrix(Matrix4.makeCubeFaceMatrix(face));
    }
    static makeIdentity() {
        return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    static makeZero() {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeColMajor(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        return new Matrix4(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44);
    }
    static makeRowMajor(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        return new Matrix4(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44);
    }
    static fromRowMajorArray(v) {
        if (v.length >= 16)
            return new Matrix4(v[0], v[4], v[8], v[12], v[1], v[5], v[9], v[13], v[2], v[6], v[10], v[14], v[3], v[7], v[11], v[15]);
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static fromColMajorArray(v) {
        if (v.length >= 16)
            return new Matrix4(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9], v[10], v[11], v[12], v[13], v[14], v[15]);
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeTranslation(x, y, z) {
        return Matrix4.makeRowMajor(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    }
    static makeScale(x, y, z) {
        return Matrix4.makeRowMajor(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    }
    static makeRotation(angleInDegrees, x, y, z) {
        var c = Math.cos(angleInDegrees * Math.PI / 180.0);
        var s = Math.sin(angleInDegrees * Math.PI / 180.0);
        var invLength = 1.0 / Math.sqrt(x * x + y * y + z * z);
        x *= invLength;
        y *= invLength;
        z *= invLength;
        return Matrix4.makeRowMajor(x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, 0.0, y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, 0.0, x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    static makeOrtho(left, right, bottom, top, near, far) {
        var tx = -(right + left) / (right - left);
        var ty = -(top + bottom) / (top - bottom);
        var tz = -(far + near) / (far - near);
        return Matrix4.makeRowMajor(2 / (right - left), 0, 0, tx, 0, 2 / (top - bottom), 0, ty, 0, 0, -2 / (far - near), tz, 0, 0, 0, 1);
    }
    static makeOrtho2D(left, right, bottom, top) {
        return Matrix4.makeOrtho(left, right, bottom, top, -1, 1);
    }
    static makeFrustum(left, right, bottom, top, near, far) {
        var A = (right + left) / (right - left);
        var B = (top + bottom) / (top - bottom);
        var C = -(far + near) / (far - near);
        var D = -2 * far * near / (far - near);
        return Matrix4.makeRowMajor(2 * near / (right - left), 0, A, 0, 0, 2 * near / (top - bottom), B, 0, 0, 0, C, D, 0, 0, -1, 0);
    }
    static makePerspectiveY(fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(Math.PI * fovy / 360.0);
        return Matrix4.makeRowMajor(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0);
    }
    static makePerspectiveX(fovx, aspect, near, far) {
        var f = 1.0 / Math.tan(Math.PI * fovx / 360.0);
        return Matrix4.makeRowMajor(f, 0, 0, 0, 0, f * aspect, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0);
    }
    static makeLookAt(eye, center, up) {
        var F = Vector3.sub(center, eye).norm();
        var UP = up.norm();
        var S = Vector3.cross(F, UP).norm();
        var U = Vector3.cross(S, F).norm();
        return Matrix4.multiply(Matrix4.makeRowMajor(S.x, S.y, S.z, 0, U.x, U.y, U.z, 0, -F.x, -F.y, -F.z, 0, 0, 0, 0, 1), Matrix4.makeTranslation(-eye.x, -eye.y, -eye.z));
    }
    static makeShadowBias() {
        return Matrix4.makeRowMajor(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0);
    }
    static makeCubeFaceMatrix(face) {
        // +X
        if (face == 0)
            return Matrix4.makeRotation(90.0, 0.0, 1.0, 0.0);
        // -X
        if (face == 1)
            return Matrix4.makeRotation(270.0, 0.0, 1.0, 0.0);
        // +Y
        if (face == 2)
            return Matrix4.makeRotation(90.0, 1.0, 0.0, 0.0);
        // -Y
        if (face == 3)
            return Matrix4.makeRotation(270.0, 1.0, 0.0, 0.0);
        // +Z
        if (face == 4)
            return Matrix4.makeIdentity();
        // -Z
        if (face == 5)
            return Matrix4.makeRotation(180.0, 0.0, 1.0, 0.0);
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    asColMajorArray() {
        return [
            this.m11, this.m21, this.m31, this.m41,
            this.m12, this.m22, this.m32, this.m42,
            this.m13, this.m23, this.m33, this.m43,
            this.m14, this.m24, this.m34, this.m44
        ];
    }
    asRowMajorArray() {
        return [
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.m41, this.m42, this.m43, this.m44
        ];
    }
    static multiply(m1, m2) {
        return new Matrix4(m1.m11 * m2.m11 + m1.m21 * m2.m12 + m1.m31 * m2.m13 + m1.m41 * m2.m14, m1.m11 * m2.m21 + m1.m21 * m2.m22 + m1.m31 * m2.m23 + m1.m41 * m2.m24, m1.m11 * m2.m31 + m1.m21 * m2.m32 + m1.m31 * m2.m33 + m1.m41 * m2.m34, m1.m11 * m2.m41 + m1.m21 * m2.m42 + m1.m31 * m2.m43 + m1.m41 * m2.m44, m1.m12 * m2.m11 + m1.m22 * m2.m12 + m1.m32 * m2.m13 + m1.m42 * m2.m14, m1.m12 * m2.m21 + m1.m22 * m2.m22 + m1.m32 * m2.m23 + m1.m42 * m2.m24, m1.m12 * m2.m31 + m1.m22 * m2.m32 + m1.m32 * m2.m33 + m1.m42 * m2.m34, m1.m12 * m2.m41 + m1.m22 * m2.m42 + m1.m32 * m2.m43 + m1.m42 * m2.m44, m1.m13 * m2.m11 + m1.m23 * m2.m12 + m1.m33 * m2.m13 + m1.m43 * m2.m14, m1.m13 * m2.m21 + m1.m23 * m2.m22 + m1.m33 * m2.m23 + m1.m43 * m2.m24, m1.m13 * m2.m31 + m1.m23 * m2.m32 + m1.m33 * m2.m33 + m1.m43 * m2.m34, m1.m13 * m2.m41 + m1.m23 * m2.m42 + m1.m33 * m2.m43 + m1.m43 * m2.m44, m1.m14 * m2.m11 + m1.m24 * m2.m12 + m1.m34 * m2.m13 + m1.m44 * m2.m14, m1.m14 * m2.m21 + m1.m24 * m2.m22 + m1.m34 * m2.m23 + m1.m44 * m2.m24, m1.m14 * m2.m31 + m1.m24 * m2.m32 + m1.m34 * m2.m33 + m1.m44 * m2.m34, m1.m14 * m2.m41 + m1.m24 * m2.m42 + m1.m34 * m2.m43 + m1.m44 * m2.m44);
    }
    LoadMatrix(m) {
        this.m11 = m.m11;
        this.m21 = m.m21;
        this.m31 = m.m31;
        this.m41 = m.m41;
        this.m12 = m.m12;
        this.m22 = m.m22;
        this.m32 = m.m32;
        this.m42 = m.m42;
        this.m13 = m.m13;
        this.m23 = m.m23;
        this.m33 = m.m33;
        this.m43 = m.m43;
        this.m14 = m.m14;
        this.m24 = m.m24;
        this.m34 = m.m34;
        this.m44 = m.m44;
        return this;
    }
    MultMatrix(m) {
        this.LoadMatrix(Matrix4.multiply(this, m));
        return this;
    }
    transform(v) {
        return new Vector4(this.m11 * v.x + this.m12 * v.y + this.m13 * v.z + this.m14 * v.w, this.m21 * v.x + this.m22 * v.y + this.m23 * v.z + this.m24 * v.w, this.m31 * v.x + this.m32 * v.y + this.m33 * v.z + this.m34 * v.w, this.m41 * v.x + this.m42 * v.y + this.m43 * v.z + this.m44 * v.w);
    }
    asInverse() {
        var tmp1 = this.m32 * this.m43 - this.m33 * this.m42;
        var tmp2 = this.m32 * this.m44 - this.m34 * this.m42;
        var tmp3 = this.m33 * this.m44 - this.m34 * this.m43;
        var tmp4 = this.m22 * tmp3 - this.m23 * tmp2 + this.m24 * tmp1;
        var tmp5 = this.m31 * this.m42 - this.m32 * this.m41;
        var tmp6 = this.m31 * this.m43 - this.m33 * this.m41;
        var tmp7 = -this.m21 * tmp1 + this.m22 * tmp6 - this.m23 * tmp5;
        var tmp8 = this.m31 * this.m44 - this.m34 * this.m41;
        var tmp9 = this.m21 * tmp2 - this.m22 * tmp8 + this.m24 * tmp5;
        var tmp10 = -this.m21 * tmp3 + this.m23 * tmp8 - this.m24 * tmp6;
        var tmp11 = 1 / (this.m11 * tmp4 + this.m12 * tmp10 + this.m13 * tmp9 + this.m14 * tmp7);
        var tmp12 = this.m22 * this.m43 - this.m23 * this.m42;
        var tmp13 = this.m22 * this.m44 - this.m24 * this.m42;
        var tmp14 = this.m23 * this.m44 - this.m24 * this.m43;
        var tmp15 = this.m22 * this.m33 - this.m23 * this.m32;
        var tmp16 = this.m22 * this.m34 - this.m24 * this.m32;
        var tmp17 = this.m23 * this.m34 - this.m24 * this.m33;
        var tmp18 = this.m21 * this.m43 - this.m23 * this.m41;
        var tmp19 = this.m21 * this.m44 - this.m24 * this.m41;
        var tmp20 = this.m21 * this.m33 - this.m23 * this.m31;
        var tmp21 = this.m21 * this.m34 - this.m24 * this.m31;
        var tmp22 = this.m21 * this.m42 - this.m22 * this.m41;
        var tmp23 = this.m21 * this.m32 - this.m22 * this.m31;
        return new Matrix4(tmp4 * tmp11, (-this.m12 * tmp3 + this.m13 * tmp2 - this.m14 * tmp1) * tmp11, (this.m12 * tmp14 - this.m13 * tmp13 + this.m14 * tmp12) * tmp11, (-this.m12 * tmp17 + this.m13 * tmp16 - this.m14 * tmp15) * tmp11, tmp10 * tmp11, (this.m11 * tmp3 - this.m13 * tmp8 + this.m14 * tmp6) * tmp11, (-this.m11 * tmp14 + this.m13 * tmp19 - this.m14 * tmp18) * tmp11, (this.m11 * tmp17 - this.m13 * tmp21 + this.m14 * tmp20) * tmp11, tmp9 * tmp11, (-this.m11 * tmp2 + this.m12 * tmp8 - this.m14 * tmp5) * tmp11, (this.m11 * tmp13 - this.m12 * tmp19 + this.m14 * tmp22) * tmp11, (-this.m11 * tmp16 + this.m12 * tmp21 - this.m14 * tmp23) * tmp11, tmp7 * tmp11, (this.m11 * tmp1 - this.m12 * tmp6 + this.m13 * tmp5) * tmp11, (-this.m11 * tmp12 + this.m12 * tmp18 - this.m13 * tmp22) * tmp11, (this.m11 * tmp15 - this.m12 * tmp20 + this.m13 * tmp23) * tmp11);
    }
    asTranspose() {
        return new Matrix4(this.m11, this.m12, this.m13, this.m14, this.m21, this.m22, this.m23, this.m24, this.m31, this.m32, this.m33, this.m34, this.m41, this.m42, this.m43, this.m44);
    }
} // class Matrix4
/// <reference path="Vector4.ts" />
var Colors;
(function (Colors) {
    function lerp(a, b, mix) {
        return a * mix + (1 - mix) * b;
    }
    const DarkIntensity = 30;
    const LightIntensity = 210;
    const MediumIntensity = lerp(DarkIntensity, LightIntensity, 0.5);
    const GrayIntensity33 = lerp(DarkIntensity, LightIntensity, 0.66);
    const GrayIntensity66 = lerp(DarkIntensity, LightIntensity, 0.33);
    const Gr33Intensity = lerp(DarkIntensity, LightIntensity, 0.66);
    const Gr66Intensity = lerp(DarkIntensity, LightIntensity, 0.33);
    Colors.Black = [30, 30, 30, 255];
    Colors.White = [210, 210, 210, 255];
    Colors.Gray66 = [150, 150, 150, 255];
    Colors.Gray33 = [91, 91, 91, 255];
    Colors.Red = [210, 30, 30, 255];
    Colors.Orange = [210, 150, 30, 255];
    Colors.Yellow = [210, 210, 30, 255];
    Colors.Green = [30, 210, 30, 255];
    Colors.Cyan = [30, 210, 210, 255];
    Colors.Blue = [30, 30, 210, 255];
    Colors.Indigo = [91, 30, 210, 255];
    Colors.Violet = [150, 30, 150, 255];
    Colors.Magenta = [210, 30, 210, 255];
    // export const DarkGreen: number[] = [30, 91, 30, 255];
    Colors.Brown = [150, 91, 30, 255];
    Colors.SkyBlue = [30, 150, 210, 255];
    Colors.DarkRed = [120, 30, 30, 255];
    Colors.DarkCyan = [30, 120, 120, 255];
    Colors.DarkGreen = [30, 120, 30, 255];
    Colors.DarkMagenta = [120, 30, 120, 255];
    Colors.DarkBlue = [30, 30, 120, 255];
    Colors.DarkYellow = [120, 120, 30, 255];
    Colors.LightRed = [210, 120, 120, 255];
    Colors.LightCyan = [120, 210, 210, 255];
    Colors.LightGreen = [120, 210, 120, 255];
    Colors.LightMagenta = [210, 120, 210, 255];
    Colors.LightBlue = [120, 120, 210, 255];
    Colors.LightYellow = [210, 210, 120, 255];
    Colors.ArneOrange = [235, 137, 49, 255];
    Colors.ArneYellow = [247, 226, 107, 255];
    Colors.ArneDarkGreen = [47, 72, 78, 255];
    Colors.ArneGreen = [68, 137, 26, 255];
    Colors.ArneSlimeGreen = [163, 206, 39, 255];
    Colors.ArneNightBlue = [27, 38, 50, 255];
    Colors.ArneSeaBlue = [0, 87, 132, 255];
    Colors.ArneSkyBlue = [49, 162, 242, 255];
    Colors.ArneCloudBlue = [178, 220, 239, 255];
    Colors.ArneDarkBlue = [52, 42, 151, 255];
    Colors.ArneDarkGray = [101, 109, 113, 255];
    Colors.ArneLightGray = [204, 204, 204, 255];
    Colors.ArneDarkRed = [115, 41, 48, 255];
    Colors.ArneRose = [203, 67, 167, 255];
    Colors.ArneTaupe = [82, 79, 64, 255];
    Colors.ArneGold = [173, 157, 51, 255];
    Colors.ArneTangerine = [236, 71, 0, 255];
    Colors.ArneHoney = [250, 180, 11, 255];
    Colors.ArneMossyGreen = [17, 94, 51, 255];
    Colors.ArneDarkCyan = [20, 128, 126, 255];
    Colors.ArneCyan = [21, 194, 165, 255];
    Colors.ArneBlue = [34, 90, 246, 255];
    Colors.ArneIndigo = [153, 100, 249, 255];
    Colors.ArnePink = [247, 142, 214, 255];
    Colors.ArneSkin = [244, 185, 144, 255];
    Colors.ArneBlack = [30, 30, 30, 255];
})(Colors || (Colors = {}));
/// <reference path="./fluxions.ts"/>
class RenderConfig {
    constructor(_context, _vertShaderSource, _fragShaderSource) {
        this._context = _context;
        this._vertShaderSource = _vertShaderSource;
        this._fragShaderSource = _fragShaderSource;
        this._isCompiled = false;
        this._isLinked = false;
        this._vertShader = null;
        this._fragShader = null;
        this._program = null;
        this._vertShaderInfoLog = "";
        this._fragShaderInfoLog = "";
        this._vertShaderCompileStatus = false;
        this._fragShaderCompileStatus = false;
        this._programInfoLog = "";
        this._programLinkStatus = false;
        this.uniforms = new Map();
        this.uniformInfo = new Map();
        this.Reset(this._vertShaderSource, this._fragShaderSource);
    }
    IsCompiledAndLinked() {
        if (this._isCompiled && this._isLinked)
            return true;
        return false;
    }
    Use() {
        this._context.gl.useProgram(this._program);
    }
    Restore() {
    }
    GetAttribLocation(name) {
        let gl = this._context.gl;
        return gl.getAttribLocation(this._program, name);
    }
    GetUniformLocation(name) {
        let gl = this._context.gl;
        let uloc = gl.getUniformLocation(this._program, name);
        if (!uloc)
            return -1;
        return uloc;
    }
    Reset(vertShaderSource, fragShaderSource) {
        let gl = this._context.gl;
        let vertShader = gl.createShader(gl.VERTEX_SHADER);
        if (vertShader) {
            gl.shaderSource(vertShader, vertShaderSource);
            gl.compileShader(vertShader);
            let status = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
            let infoLog = null;
            if (!status) {
                infoLog = gl.getShaderInfoLog(vertShader);
                let errorElement = document.getElementById("errors");
                if (!errorElement && infoLog) {
                    let newDiv = document.createElement("div");
                    newDiv.appendChild(document.createTextNode(infoLog));
                    document.body.appendChild(newDiv);
                }
            }
            if (status)
                this._vertShaderCompileStatus = true;
            if (infoLog)
                this._vertShaderInfoLog = infoLog;
            this._vertShader = vertShader;
        }
        else {
            return false;
        }
        let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragShader) {
            gl.shaderSource(fragShader, fragShaderSource);
            gl.compileShader(fragShader);
            let status = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
            let infoLog = null;
            if (!status) {
                infoLog = gl.getShaderInfoLog(fragShader);
                let errorElement = document.getElementById("errors");
                if (!errorElement && infoLog) {
                    let newDiv = document.createElement("div");
                    newDiv.appendChild(document.createTextNode(infoLog));
                    document.body.appendChild(newDiv);
                }
            }
            if (status)
                this._fragShaderCompileStatus = true;
            if (infoLog)
                this._fragShaderInfoLog = infoLog;
            this._fragShader = fragShader;
        }
        else {
            return false;
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
                    let infoLog = gl.getProgramInfoLog(this._program);
                    if (infoLog) {
                        this._programInfoLog = infoLog;
                        let errorElement = document.getElementById("errors");
                        if (!errorElement && infoLog) {
                            let newDiv = document.createElement("div");
                            newDiv.appendChild(document.createTextNode(infoLog));
                            document.body.appendChild(newDiv);
                        }
                    }
                }
            }
        }
        else {
            return false;
        }
        this.updateActiveUniforms();
        return true;
    }
    updateActiveUniforms() {
        let gl = this._context.gl;
        let numUniforms = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
        this.uniforms.clear();
        this.uniformInfo.clear();
        for (let i = 0; i < numUniforms; i++) {
            let uniform = gl.getActiveUniform(this._program, i);
            if (!uniform)
                continue;
            this.uniformInfo.set(uniform.name, uniform);
            this.uniforms.set(uniform.name, gl.getUniformLocation(this._program, uniform.name));
        }
        return true;
    }
}
/// <reference path="./Fluxions.ts" />
class AttribInfo {
    constructor(index, attribName, enabled = true, value = new Vector4(0.0, 0.0, 0.0, 1.0)) {
        this.index = index;
        this.attribName = attribName;
        this.enabled = enabled;
        this.value = value;
        this.location = -1;
    }
    attrib1(x) {
        this.value.reset(x, 0, 0, 0);
    }
    attrib2(x, y) {
        this.value.reset(x, y, 0, 0);
    }
    attrib3(x, y, z) {
        this.value.reset(x, y, z, 0);
    }
    attrib4(x, y, z, w) {
        this.value.reset(x, y, z, w);
    }
    attrib2v(v) {
        this.value.reset(v.x, v.y, 0, 0);
    }
    attrib3v(v) {
        this.value.reset(v.x, v.y, v.z, 0);
    }
    attrib4v(v) {
        this.value.reset(v.x, v.y, v.z, v.w);
    }
}
var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType[PrimitiveType["Points"] = 0] = "Points";
    PrimitiveType[PrimitiveType["LineStrip"] = 1] = "LineStrip";
    PrimitiveType[PrimitiveType["LineLoop"] = 2] = "LineLoop";
    PrimitiveType[PrimitiveType["Triangles"] = 3] = "Triangles";
    PrimitiveType[PrimitiveType["TriangleStrip"] = 4] = "TriangleStrip";
    PrimitiveType[PrimitiveType["TriangleFan"] = 5] = "TriangleFan";
})(PrimitiveType || (PrimitiveType = {}));
class Surface {
    constructor(material, mode, first, offset) {
        this.material = material;
        this.mode = mode;
        this.first = first;
        this.offset = offset;
        this.count = 0;
        this.properties = new Map([
            ["o", "unknown"],
            ["g", "unknown"],
            ["s", "unknown"],
            ["usemtl", ""],
            ["mtllib", ""]
        ]);
        this.SetProperty("usemtl", material);
    }
    add() { this.count++; }
    SetProperty(key, value) {
        this.properties.set(key, value);
    }
    GetProperty(key) {
        let value = this.properties.get(key);
        if (value) {
            return value;
        }
        return "";
    }
}
class IndexedGeometryMesh {
    constructor(_context, _maxVertices = 32767, _maxIndices = 32767) {
        this._context = _context;
        this._maxVertices = _maxVertices;
        this._maxIndices = _maxIndices;
        this._vbo = null;
        this._ibo = null;
        // private _vao: WebGLVertexArrayObjectOES | null = null;
        this._dirty = true;
        this._isUint32 = false;
        this._surfaces = [];
        this._indexTypeSize = 0;
        this._indexCount = 0;
        this._vertexCount = 0;
        this._currentMaterialName = "unknown";
        this._attribInfo = [
            new AttribInfo(0, "aPosition", true, new Vector4(0, 0, 0, 1)),
            new AttribInfo(1, "aNormal", true, new Vector4(0, 0, 0, 0)),
            new AttribInfo(2, "aColor", true, new Vector4(1, 1, 1, 1)),
            new AttribInfo(3, "aTexCoord", true, new Vector4(0, 0, 0, 0)),
            new AttribInfo(4, "aGeneric1", false),
            new AttribInfo(5, "aGeneric2", false),
            new AttribInfo(6, "aGeneric3", false),
            new AttribInfo(7, "aGeneric4", false)
        ];
        this._vbo = _context.gl.createBuffer();
        this._ibo = _context.gl.createBuffer();
        this._vertices = new Float32Array(this._maxVertices * 8 * 4);
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
    BuildBuffers() {
        let gl = this._context.gl;
        if (this._vbo) {
            gl.deleteBuffer(this._vbo);
            this._vbo = null;
        }
        if (this._ibo) {
            gl.deleteBuffer(this._ibo);
            this._ibo = null;
        }
        if (!(this._vbo = gl.createBuffer())) {
            return false;
        }
        if (!(this._ibo = gl.createBuffer())) {
            return false;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this._dirty = false;
        return true;
    }
    Reset() {
        this._vertices = new Float32Array(this._maxVertices * 8 * 4);
        if (this._maxIndices < 32768) {
            this._indices = new Uint16Array(this._maxIndices);
            this._isUint32 = false;
            this._indexTypeSize = 2;
        }
        else {
            this._indices = new Uint32Array(this._maxIndices);
            this._isUint32 = true;
            this._indexTypeSize = 4;
        }
        this._surfaces = [];
        this._indexTypeSize = 0;
        this._indexCount = 0;
        this._vertexCount = 0;
        this._currentMaterialName = "unknown";
        this._dirty = true;
    }
    LoadObject(sceneUrl) {
        let self = this;
        let tfl = new Utils.TextFileLoader(sceneUrl, (data) => {
            self.loadObjectData(data);
        });
    }
    Render(rc, materialName) {
        let gl = this._context.gl;
        if (this._dirty) {
            if (!this.BuildBuffers())
                return false;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        // figure out attrib locations
        for (let i = 0; i < 8; i++) {
            if (!this._attribInfo[i].enabled)
                continue;
            this._attribInfo[i].location = rc.GetAttribLocation(this._attribInfo[i].attribName);
            if (this._attribInfo[i].location < 0)
                continue;
            gl.enableVertexAttribArray(this._attribInfo[i].location);
            let stride = 8 * 4 * 4;
            let offset = i * 4 * 4;
            gl.vertexAttribPointer(this._attribInfo[i].location, 4, gl.FLOAT, false, stride, offset);
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
            if (this._attribInfo[i].enabled && this._attribInfo[i].location >= 0) {
                gl.disableVertexAttribArray(this._attribInfo[i].location);
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return true;
    }
    EnableAttribArray(index) {
        if (index >= 0 && index < 8) {
            this._attribInfo[index].enabled = true;
        }
    }
    DisableAttribArray(index) {
        if (index >= 0 && index < 8) {
            this._attribInfo[index].enabled = false;
        }
    }
    SetAttribArrayName(index, name) {
        if (index >= 0 && index < 8) {
            this._attribInfo[index].attribName = name;
        }
    }
    BeginSurface(mode) {
        let surface = new Surface(this._currentMaterialName, mode, this._indexCount, this._indexCount * this._indexTypeSize);
        this._surfaces.push(surface);
    }
    EndSurface() {
    }
    AddIndex(index) {
        if (this._indexCount >= this._indices.length - 1)
            return;
        if (index > this._vertexCount) {
            this._indices[this._indexCount] = 0;
        }
        else if (index < 0) {
            this._indices[this._indexCount] = this._indexCount;
        }
        else {
            this._indices[this._indexCount] = index;
        }
        this._indexCount++;
        this._surfaces[this._surfaces.length - 1].add();
        this._dirty = true;
    }
    VertexAttrib1(index, x = 0) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib4(x, 0, 0, 1);
        if (index == 0)
            this.emitVertex();
    }
    VertexAttrib2(index, x = 0, y = 0) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib4(x, y, 0, 1);
        if (index == 0)
            this.emitVertex();
    }
    VertexAttrib3(index, x = 0, y = 0, z = 0) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib4(x, y, z, 1);
        if (index == 0)
            this.emitVertex();
    }
    VertexAttrib4(index, x = 0, y = 0, z = 0, w = 1) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib4(x, y, z, w);
        if (index == 0)
            this.emitVertex();
    }
    VertexAttrib2v(index, v) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib2v(v);
        if (index == 0)
            this.emitVertex();
    }
    VertexAttrib3v(index, v) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib3v(v);
        if (index == 0)
            this.emitVertex();
    }
    VertexAttrib4v(index, v) {
        if (index < 0 || index >= 8)
            return;
        this._attribInfo[index].attrib4v(v);
        if (index == 0)
            this.emitVertex();
    }
    emitVertex() {
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
    loadObjectData(data) {
        if (data == "unknown")
            return;
        let lines = data.split(/\r\n|\r|\n/g);
        let gl = this._context.gl;
        this.Reset();
        let vertexCount = 0;
        let normalCount = 0;
        let colorCount = 0;
        let texcoordCount = 0;
        let faces = 0;
        let v = [];
        let vn = [];
        let vc = [];
        let vt = [];
        let va1 = [];
        let va2 = [];
        let va3 = [];
        let va4 = [];
        let OBJg = "";
        let OBJo = "";
        let OBJs = "";
        let usemtl = "";
        let mtllib = "";
        let flushSurface = false;
        for (let line of lines) {
            let tokens = line.match(/\S+/g);
            if (tokens == null || tokens.length === 0)
                continue;
            if (tokens[0][0] == "#") {
                continue;
            }
            else if (tokens[0] == "v") {
                v.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "vn") {
                vn.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "vc") {
                vc.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "vt") {
                vt.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va1") {
                va1.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va2") {
                va2.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va3") {
                va3.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "va4") {
                va4.push(this.makeArray(tokens, 1));
            }
            else if (tokens[0] == "f") {
                let face = 1;
                let faceIndices = [];
                for (let face = 1; face < tokens.length; face++) {
                    let vertexIndex = 0;
                    let normalIndex = null;
                    let texcoordIndex = null;
                    let values = tokens[face].split("/");
                    if (values.length >= 1) {
                        vertexIndex = Number(values[0]);
                        if (vertexIndex < 0)
                            vertexIndex = v.length + vertexIndex;
                        else if (vertexIndex > 0)
                            vertexIndex -= 1; // correct for 1-indexing in the OBJ file
                    }
                    if (values.length == 2) {
                        normalIndex = Number(values[1]);
                        if (normalIndex < 0)
                            normalIndex = vn.length + normalIndex;
                        else if (normalIndex > 0)
                            normalIndex--;
                    }
                    if (values.length == 3) {
                        normalIndex = Number(values[2]);
                        if (normalIndex < 0)
                            normalIndex = vn.length + normalIndex;
                        else if (normalIndex > 0)
                            normalIndex--;
                        texcoordIndex = Number(values[1]);
                        if (texcoordIndex < 0)
                            texcoordIndex = vt.length + texcoordIndex;
                        else if (texcoordIndex > 0)
                            texcoordIndex--;
                    }
                    let vertex = [vertexIndex, normalIndex, texcoordIndex];
                    faceIndices.push(vertex);
                }
                if (faces === 0) {
                    this.BeginSurface(gl.TRIANGLES);
                    let surface = this._surfaces[this._surfaces.length - 1];
                    surface.SetProperty("g", OBJg);
                    surface.SetProperty("o", OBJo);
                    surface.SetProperty("s", OBJs);
                    surface.SetProperty("mtllib", mtllib);
                    surface.SetProperty("usemtl", usemtl);
                }
                let vc_present = (vc.length == v.length) ? true : false;
                let va1_present = (va1.length == v.length) ? true : false;
                let va2_present = (va2.length == v.length) ? true : false;
                let va3_present = (va3.length == v.length) ? true : false;
                let va4_present = (va4.length == v.length) ? true : false;
                let vt_present = (vt.length > 0) ? true : false;
                let vn_present = (vn.length > 0) ? true : false;
                // reset defaults
                for (let i = 1; i < 8; i++) {
                    this.VertexAttrib4(i, 0, 0, 0, 1);
                }
                let arrays = [
                    v, vn, vc, vt, va1, va2, va3, va4
                ];
                let arrays_enabled = [
                    true, vn_present, vc_present, vt_present, va1_present, va2_present, va3_present, va4_present
                ];
                for (let k = 1; k < faceIndices.length; k++) {
                    let iv0 = 0;
                    let iv1 = k % faceIndices.length;
                    let iv2 = (k + 1) % faceIndices.length;
                    let face_vertex1 = faceIndices[iv0][0];
                    let face_vertex2 = faceIndices[iv1][0];
                    let face_vertex3 = faceIndices[iv2][0];
                    let face_normal1 = faceIndices[iv0][1];
                    let face_normal2 = faceIndices[iv1][1];
                    let face_normal3 = faceIndices[iv2][1];
                    let face_texcoord1 = faceIndices[iv0][2];
                    let face_texcoord2 = faceIndices[iv1][2];
                    let face_texcoord3 = faceIndices[iv2][2];
                    let indices = [
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_normal1, face_normal2, face_normal3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_texcoord1, face_texcoord2, face_texcoord3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_vertex1, face_vertex2, face_vertex3],
                        [face_vertex1, face_vertex2, face_vertex3],
                    ];
                    for (let vindex = 0; vindex < 3; vindex++) {
                        for (let arrayIndex = 7; arrayIndex >= 0; arrayIndex--) {
                            if (arrays_enabled[arrayIndex]) {
                                let i = indices[arrayIndex][vindex];
                                if (i >= 0 && i < arrays[arrayIndex].length) {
                                    let x = arrays[arrayIndex][i][0];
                                    let y = arrays[arrayIndex][i][1];
                                    let z = arrays[arrayIndex][i][2];
                                    let w = arrays[arrayIndex][i][3];
                                    this.VertexAttrib4(arrayIndex, x, y, z, w);
                                }
                                else {
                                    console.error("index less than zero!");
                                    this.VertexAttrib4(arrayIndex, 0, 0, 0, 0);
                                }
                            }
                        }
                    }
                    this.AddIndex(-1);
                    this.AddIndex(-1);
                    this.AddIndex(-1);
                    // if (vt_present) this.VertexAttrib4(3, vt[face_texcoord1][0], vt[face_texcoord1][1], vt[face_texcoord1][2], vt[face_texcoord1][3]);
                    // if (vc_present) this.VertexAttrib4(2, vc[face_vertex1], vc[face_vertex1][1], vc[face_vertex1][2], vc[face_vertex1][3]);
                    // if (vn_present) this.vertexAttrib3(1, vn[face_normal1][0], vn[face_normal1][1], vn[face_normal1][2]);
                    // this.vertexAttrib3(0, v[face_vertex1][0], v[face_vertex1][1], v[face_vertex1][2]);
                    // if (face_texcoord2) this.vertexAttrib2(3, vt[face_texcoord2][0], vt[face_texcoord2][1]);
                    // if (!flatshaded && face_normal2) this.vertexAttrib3(1, vn[face_normal2][0], vn[face_normal2][1], vn[face_normal2][2]);
                    // this.vertexAttrib3(0, v[face_vertex2][0], v[face_vertex2][1], v[face_vertex2][2]);
                    // if (face_texcoord3) this.vertexAttrib2(3, vt[face_texcoord3][0], vt[face_texcoord3][1]);
                    // if (!flatshaded && face_normal3) this.vertexAttrib3(1, vn[face_normal3][0], vn[face_normal3][1], vn[face_normal3][2]);
                    // this.vertexAttrib3(0, v[face_vertex3][0], v[face_vertex3][1], v[face_vertex3][2]);
                    // vertexIndexCount += 3;
                }
                faces++;
            }
            else if (tokens[0] == "usemtl") {
                usemtl = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "mtllib") {
                mtllib = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "g") {
                OBJg = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "s") {
                OBJs = tokens[1];
                flushSurface = true;
            }
            else if (tokens[0] == "o") {
                OBJo = tokens[1];
                flushSurface = true;
            }
            else {
                // what is this?                
            }
            if (flushSurface) {
                flushSurface = false;
                if (faces !== 0) {
                    this.EndSurface();
                    faces = 0;
                }
            }
        }
        console.info("Loaded OBJ file with " + this._vertexCount.toString(10) + "/" + this._indexCount.toString(10) + " vertices/indices");
    }
    makeArray(tokens, baseIndex = 0) {
        let x = 0;
        let y = 0;
        let z = 0;
        let w = 1;
        if (tokens.length > baseIndex) {
            x = Number(tokens[baseIndex]);
        }
        if (tokens.length > baseIndex + 1) {
            y = Number(tokens[baseIndex + 1]);
        }
        if (tokens.length > baseIndex + 2) {
            z = Number(tokens[baseIndex + 2]);
        }
        if (tokens.length > baseIndex + 3) {
            w = Number(tokens[baseIndex + 3]);
        }
        return [x, y, z, w];
    }
    makeVector4(tokens, baseIndex = 0) {
        let x = 0;
        let y = 0;
        let z = 0;
        let w = 1;
        if (tokens.length > baseIndex) {
            x = Number(tokens[baseIndex]);
        }
        if (tokens.length > baseIndex + 1) {
            y = Number(tokens[baseIndex + 1]);
        }
        if (tokens.length > baseIndex + 2) {
            z = Number(tokens[baseIndex + 2]);
        }
        if (tokens.length > baseIndex + 3) {
            w = Number(tokens[baseIndex + 3]);
        }
        return new Vector4(x, y, z, w);
    }
}
/// <reference path="./Fluxions.ts" />
class Texture {
    constructor(_context, _isCubeMap, _url) {
        this._context = _context;
        this._isCubeMap = _isCubeMap;
        this._url = _url;
        this._texture = null;
        this._target = 0;
        this._image = null;
        this._lastBoundUnit = 0;
        this._loaded = false;
        this._width = 0;
        this._height = 0;
        let gl = this._context.gl;
        if (!gl)
            return;
        this.loadTexture(gl, _url);
    }
    get isCubeMap() { return this._isCubeMap; }
    get isTexture2D() { return !this.isCubeMap; }
    get isLoaded() { return this._loaded; }
    get width() { return this._width; }
    get height() { return this._height; }
    get boundUnit() { return this._lastBoundUnit; }
    Upload() {
        return true;
    }
    Bind(textureUnit = 0) {
        if (!this._texture)
            return false;
        this._context.gl.activeTexture(textureUnit);
        this._context.gl.bindTexture(this._target, this._texture);
        this._lastBoundUnit = textureUnit;
        return true;
    }
    Unbind() {
        if (!this._texture)
            return false;
        this._context.gl.activeTexture(this._lastBoundUnit);
        this._context.gl.bindTexture(this._target, null);
        this._lastBoundUnit = 0;
        return true;
    }
    createTexture(isCubeMap) {
        let gl = this._context.gl;
        if (!gl)
            return false;
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
        }
        else {
            this._isCubeMap = false;
            this._target = gl.TEXTURE_2D;
        }
        gl.bindTexture(this._target, this._texture);
        gl.bindTexture(this._target, null);
        return true;
    }
    setImageData(image) {
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
        let images = [null, null, null, null, null, null];
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
        }
        else {
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
    loadTexture(gl, url) {
        this._loaded = false;
        this.setImageData(null);
        var self = this;
        this._image = new Image();
        this._image.onload = () => {
            if (!self._image)
                return;
            self.setImageData(self._image);
            self._loaded = true;
        };
        this._image.src = url;
        return true;
    }
    static getCubeSubTexture(index, image) {
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
    static CreateCheckerBoard(w, h, size, blackColor, whiteColor) {
        const checkerboardImage = new ImageData(new Uint8ClampedArray([
            ...blackColor,
            ...whiteColor,
            ...whiteColor,
            ...blackColor
        ]), 2, 2);
        if (blackColor.length != 4 && whiteColor.length != 4)
            return checkerboardImage;
        let imageW = w * size;
        let imageH = h * size;
        let pixels = new Uint8ClampedArray(imageW * imageH * 4);
        let addr = 0;
        for (let y = 0; y < imageH; y++) {
            let row = y / size | 0;
            for (let x = 0; x < imageW; x++) {
                let col = x / size | 0;
                let isWhite = (row & 1) ? (col & 1) == 1 : (col & 1) == 0;
                let color = isWhite ? whiteColor : blackColor;
                for (let i = 0; i < 4; i++) {
                    pixels[addr + i] = color[i];
                }
                addr += 4;
            }
        }
        return new ImageData(pixels, imageW, imageH);
    }
    // s and t are between 0 and 1, face is 0 through 5
    // pos x, neg x, pos y, neg y, pos z, neg z
    static ConvertCubeUVtoXYZ(face, s, t) {
        let uc = 2 * s - 1;
        let vc = 2 * t - 1;
        let v = new Vector3();
        switch (face) {
            case 0:
                v.x = 1;
                v.y = vc;
                v.z = -uc;
                break; // POSITIVE X
            case 1:
                v.x = -1;
                v.y = vc;
                v.z = uc;
                break; // NEGATIVE X
            case 2:
                v.x = uc;
                v.y = 1;
                v.z = -vc;
                break; // POSITIVE Y
            case 3:
                v.x = uc;
                v.y = -1;
                v.z = vc;
                break; // NEGATIVE Y
            case 4:
                v.x = uc;
                v.y = vc;
                v.z = 1;
                break; // POSITIVE Z
            case 5:
                v.x = -uc;
                v.y = vc;
                v.z = -1;
                break; // NEGATIVE Z
        }
        return v;
    }
    static CreatePerlinCube(size, face, blackColor, whiteColor) {
        const checkerboardImage = new ImageData(new Uint8ClampedArray([
            ...blackColor,
            ...whiteColor,
            ...whiteColor,
            ...blackColor
        ]), 2, 2);
        if (face < 0 || face > 5)
            return checkerboardImage;
        if (blackColor.length != 4 && whiteColor.length != 4)
            return checkerboardImage;
        let imageW = size;
        let imageH = size;
        let pixels = new Uint8ClampedArray(imageW * imageH * 4);
        let addr = 0;
        for (let y = 0; y < imageH; y++) {
            let v = y / (imageH - 1);
            for (let x = 0; x < imageW; x++) {
                let u = x / (imageW - 1);
                let cubeDir = Texture.ConvertCubeUVtoXYZ(face, u, v);
                let waveletNoise = GTE.WaveletNoise.WaveletNoise(cubeDir.x, cubeDir.y, cubeDir.z);
                let color = [
                    GTE.lerp(blackColor[0], whiteColor[0], waveletNoise),
                    GTE.lerp(blackColor[1], whiteColor[1], waveletNoise),
                    GTE.lerp(blackColor[2], whiteColor[2], waveletNoise),
                    255.0
                ];
                for (let i = 0; i < 4; i++) {
                    pixels[addr + i] = GTE.clamp(color[i], 0, 255) | 0;
                }
                addr += 4;
            }
        }
        return new ImageData(pixels, imageW, imageH);
    }
}
/// <reference path="./Fluxions.ts" />
/// <reference path="./RenderConfig.ts" />
var Utils;
(function (Utils) {
    class ShaderLoader {
        constructor(rc, vertShaderUrl, fragShaderUrl) {
            this.rc = rc;
            this.vertShaderUrl = vertShaderUrl;
            this.fragShaderUrl = fragShaderUrl;
            this.vertLoaded = false;
            this.fragLoaded = false;
            this.vertShaderSource = "";
            this.fragShaderSource = "";
            let self = this;
            let vertAjax = new XMLHttpRequest();
            vertAjax.addEventListener("load", (e) => {
                self.vertShaderSource = vertAjax.responseText;
                self.vertLoaded = true;
                if (self.vertLoaded && self.fragLoaded) {
                    self.rc.Reset(self.vertShaderSource, self.fragShaderSource);
                }
            });
            vertAjax.open("GET", vertShaderUrl);
            vertAjax.send();
            let fragAjax = new XMLHttpRequest();
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
    Utils.ShaderLoader = ShaderLoader;
    class TextFileLoader {
        constructor(url, callbackfn) {
            this.callbackfn = callbackfn;
            this.loaded = false;
            this.error = false;
            this.data = "";
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
    Utils.TextFileLoader = TextFileLoader;
    class GLTypeInfo {
        constructor(type, baseType, components, sizeOfType) {
            this.type = type;
            this.baseType = baseType;
            this.components = components;
            this.sizeOfType = sizeOfType;
        }
        CreateArray(size) {
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
    Utils.WebGLTypeInfo = new Map([
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
    ]);
})(Utils || (Utils = {}));
/// <reference path="./Fluxions.ts"/>
/// <reference path="./Utils.ts" />
class Property {
    constructor(name, type, values, transposed = false) {
        this.name = name;
        this.type = type;
        this.transposed = transposed;
        this._loc = -1;
        this._count = 0;
        this._isFloat = false;
        this._value = [...values];
        switch (type) {
            case WebGLRenderingContext.FLOAT:
            case WebGLRenderingContext.FLOAT_VEC2:
            case WebGLRenderingContext.FLOAT_VEC3:
            case WebGLRenderingContext.FLOAT_VEC4:
            case WebGLRenderingContext.FLOAT_MAT2:
            case WebGLRenderingContext.FLOAT_MAT3:
            case WebGLRenderingContext.FLOAT_MAT4:
                this._isFloat = true;
                break;
            case WebGLRenderingContext.INT:
            case WebGLRenderingContext.INT_VEC2:
            case WebGLRenderingContext.INT_VEC3:
            case WebGLRenderingContext.INT_VEC4:
                this._isFloat = false;
                break;
        }
    }
    get data() {
        if (this._isFloat)
            return new Float32Array(this._value);
        return new Int32Array(this._value);
    }
    get count() { return this._count; }
    get size() { return this._value.length; }
    get sizeInBytes() { return this._value.length * 4; }
    GetLocation(gl, program) {
        let loc = gl.getUniformLocation(program, this.name);
        if (loc) {
            this._loc = loc;
            return true;
        }
        else {
            this._loc = -1;
        }
        return false;
    }
    Set1i(x) {
        if (this.type == WebGLRenderingContext.INT) {
            this._value[0] = x;
            return true;
        }
        return false;
    }
    Set2i(x, y) {
        if (this.type == WebGLRenderingContext.INT_VEC2) {
            this._value[0] = x;
            this._value[1] = y;
            return true;
        }
        return false;
    }
}
class Material {
    constructor(_context, name = "unknown") {
        this._context = _context;
        this.Properties = new Map();
    }
    SetProperty1i(name, x) {
        return this.SetPropertyiv(name, [x]);
    }
    SetProperty2i(name, x, y) {
        return this.SetPropertyiv(name, [x, y]);
    }
    SetProperty3i(name, x, y, z) {
        return this.SetPropertyiv(name, [x, y, z]);
    }
    SetProperty4i(name, x, y, z, w) {
        return this.SetPropertyiv(name, [x, y, z, w]);
    }
    SetProperty1f(name, x) {
        return this.SetPropertyfv(name, [x]);
    }
    SetProperty2f(name, x, y) {
        return this.SetPropertyfv(name, [x, y]);
    }
    SetProperty3f(name, x, y, z) {
        return this.SetPropertyfv(name, [x, y, z]);
    }
    SetProperty4f(name, x, y, z, w) {
        return this.SetPropertyfv(name, [x, y, z, w]);
    }
    SetPropertyMatrix2f(name, m, transposed = false) {
        return this.SetPropertyMatrixfv(name, m.asColMajorArray(), transposed);
    }
    SetPropertyMatrix3f(name, m, transposed = false) {
        return this.SetPropertyMatrixfv(name, m.asColMajorArray(), transposed);
    }
    SetPropertyMatrix4f(name, m, transposed = false) {
        return this.SetPropertyMatrixfv(name, m.asColMajorArray(), transposed);
    }
    SetPropertyiv(name, values) {
        let type = 0;
        switch (values.length) {
            case 1:
                type = this._context.gl.INT;
                break;
            case 2:
                type = this._context.gl.INT_VEC2;
                break;
            case 3:
                type = this._context.gl.INT_VEC3;
                break;
            case 4:
                type = this._context.gl.INT_VEC4;
                break;
        }
        if (!type)
            return false;
        let property;
        if (this.Properties.has(name)) {
            property = this.Properties.get(name);
            if (!property || property.type != type)
                return false;
        }
        let intValues = new Array(values.length);
        for (let i = 0; i < values.length; i++) {
            intValues[i] = values[i] | 0;
        }
        this.Properties.set(name, new Property(name, type, intValues));
        return true;
    }
    SetPropertyfv(name, values) {
        let type = 0;
        switch (values.length) {
            case 1:
                type = this._context.gl.FLOAT;
                break;
            case 2:
                type = this._context.gl.FLOAT_VEC2;
                break;
            case 3:
                type = this._context.gl.FLOAT_VEC3;
                break;
            case 4:
                type = this._context.gl.FLOAT_VEC4;
                break;
        }
        if (!type)
            return false;
        let property;
        if (this.Properties.has(name)) {
            property = this.Properties.get(name);
            if (!property || property.type != type)
                return false;
        }
        this.Properties.set(name, new Property(name, type, values));
        return true;
    }
    SetPropertyMatrixfv(name, values, transposed = false) {
        let type = 0;
        switch (values.length) {
            case 4:
                type = this._context.gl.FLOAT_MAT2;
                break;
            case 9:
                type = this._context.gl.FLOAT_MAT3;
                break;
            case 16:
                type = this._context.gl.FLOAT_MAT4;
                break;
        }
        if (!type)
            return false;
        let property;
        if (this.Properties.has(name)) {
            property = this.Properties.get(name);
            if (!property || property.type != type)
                return false;
        }
        this.Properties.set(name, new Property(name, type, values));
        return true;
    }
}
class MaterialLibrary {
    constructor(_context) {
        this._context = _context;
        this.defaultMaterial = new Material(this._context, "unknown");
        this.materials = new Map();
    }
    IsMaterial(name) {
        return this.materials.has(name);
    }
    GetMaterial(name) {
        let material = this.materials.get(name);
        if (!material) {
            material = new Material(this._context, name);
            this.materials.set(name, material);
        }
        return material;
    }
}
function testMaterialLibrary(fluxions) {
    let mtllib = new MaterialLibrary(fluxions);
    let mat1 = mtllib.GetMaterial("ShinyTeapot");
    mat1.SetProperty3f("Kd", 1, 1, 1);
    mat1.SetProperty3f("Ks", 1, 1, 1);
    let mat2 = mtllib.GetMaterial("ShinyClay");
    mat2.SetProperty3f("Kd", 1, 1, 1);
    mat2.SetProperty3f("Ks", 1, 1, 1);
    mat2.SetProperty1i("map_Kd", 1);
    return true;
}
/// <reference path="Fluxions.ts" />
class WebGLTest1 {
    constructor() {
        this.vertShader = null;
        this.fragShader = null;
        this.program = null;
        this.vbo = null;
        this.ibo = null;
        this.texture2D = null;
        this.textureCM = null;
        this.uniforms = new Map([
            ["CameraMatrix", null],
            ["ProjectionMatrix", null],
            ["WorldMatrix", null]
        ]);
        this.CameraMatrix = Matrix4.makeLookAt(new Vector3(0, 0, 10), new Vector3(), new Vector3(0, 1, 0));
        this.WorldMatrix = Matrix4.makeIdentity();
        this.Object1Matrix = Matrix4.makeTranslation(-.2, 0, 0);
        this.Object2Matrix = Matrix4.makeTranslation(.2, 0, 0);
        this.ProjectionMatrix = Matrix4.makePerspectiveY(45, 1, 0.1, 100.0);
        this.vertices = [
            0, 1, 0, 1,
            -1, -1, 0, 1,
            1, -1, 0, 1
        ];
        this.indices = [
            0, 1, 2
        ];
        this.vertShaderSource = `
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

void main(void)
{
    VS_Position = ProjectionMatrix * CameraMatrix * WorldMatrix * aPosition;
    VS_Normal = aNormal;
    VS_Color = aColor;
    VS_TexCoord = aTexCoord;
    gl_Position = ProjectionMatrix * CameraMatrix * WorldMatrix * aPosition;
}
        `;
        this.fragShaderSource = `
precision mediump float;

uniform float timer;
uniform vec2  mouse;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;

void main(void)
{
    gl_FragColor = VS_Color;
}
        `;
    }
    test(gl, timeInSeconds) {
        if (!this.initShaders(gl)) {
            this.kill(gl);
            return false;
        }
        if (!this.initBuffers(gl)) {
            this.kill(gl);
            return false;
        }
        if (!this.drawScene(gl, timeInSeconds)) {
            this.kill(gl);
            return false;
        }
        this.kill(gl);
        return true;
    }
    kill(gl) {
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
    }
    initShaders(gl) {
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
        for (let uniform of this.uniforms) {
            this.uniforms.set(uniform[0], gl.getUniformLocation(this.program, uniform[0]));
        }
        return true;
    }
    initBuffers(gl) {
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
        const texture2DSPI = new ImageData(new Uint8ClampedArray([255, 0, 255, 255]), 1, 1);
        this.texture2D = gl.createTexture();
        this.textureCM = gl.createTexture();
        if (!this.texture2D || !this.textureCM)
            return false;
        gl.bindTexture(gl.TEXTURE_2D, this.texture2D);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture2DSPI);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCM);
        for (let i = 0; i < 6; i++) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCubeMapSPI[i]);
        }
        if (gl.getError() != gl.NO_ERROR) {
            console.error("Error initializing textures");
            return false;
        }
        return true;
    }
    drawScene(gl, timeInSeconds) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        let vloc = gl.getAttribLocation(this.program, "aPosition");
        gl.vertexAttribPointer(vloc, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.useProgram(this.program);
        let loc;
        if (loc = this.uniforms.get("CameraMatrix")) {
            gl.uniformMatrix4fv(loc, false, this.CameraMatrix.asColMajorArray());
        }
        if (loc = this.uniforms.get("ProjectionMatrix")) {
            let aspect = gl.canvas.width / gl.canvas.height;
            this.ProjectionMatrix = Matrix4.makePerspectiveY(45, aspect, 0.1, 100.0);
            gl.uniformMatrix4fv(loc, false, this.ProjectionMatrix.asColMajorArray());
        }
        let wmloc = this.uniforms.get("WorldMatrix");
        if (wmloc) {
            let matrix = this.Object1Matrix.asColMajorArray();
            gl.uniformMatrix4fv(wmloc, false, matrix);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (wmloc) {
            let matrix = this.Object2Matrix.asColMajorArray();
            gl.uniformMatrix4fv(wmloc, false, matrix);
        }
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
        gl.disableVertexAttribArray(0);
        gl.useProgram(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return true;
    }
}
;
/// <reference path="Fluxions.ts" />
/// <reference path="Colors.ts" />
/// <reference path="IndexedGeometryMesh.ts" />
class WebGLTest2 {
    constructor() {
        // New properties
        this.fluxions = null;
        this.renderConfig = null;
        this.geometryMesh = null;
        this.initialized = false;
        this.shaderLoader = null;
        // Original properties
        this.texture2D = null;
        this.textureCM = null;
        this.CameraMatrix = Matrix4.makeLookAt(new Vector3(0, 0, 10), new Vector3(), new Vector3(0, 1, 0));
        this.WorldMatrix = Matrix4.makeIdentity();
        this.Object1Matrix = Matrix4.makeTranslation(0, 0, 0);
        this.ProjectionMatrix = Matrix4.makePerspectiveY(45, 1, 0.1, 100.0);
        this.vertShaderSource = `
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
        this.fragShaderSource = `
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
    }
    test(gl, timeInSeconds) {
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
    kill(gl) {
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
    initShaders(gl) {
        if (this.fluxions) {
            this.renderConfig = this.fluxions.CreateRenderConfig(this.vertShaderSource, this.fragShaderSource);
            this.shaderLoader = new Utils.ShaderLoader(this.renderConfig, "shaders/fullscreenquad.vert", "shaders/fullscreenquad.frag");
            //this.shaderLoader = new Utils.ShaderLoader(this.renderConfig, "shaders/pbr.vert", "shaders/pbr.frag");
        }
        return true;
    }
    initBuffers(gl) {
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
        // this.geometryMesh.AddIndex(-1);
        // this.geometryMesh.AddIndex(-1);
        // this.geometryMesh.AddIndex(-1);
        let x = 2.0 * 640 / 384;
        let y = 2.0;
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
        if (gl.getError() != gl.NO_ERROR) {
            console.error("Error initializing textures");
            return false;
        }
        return true;
    }
    drawScene(gl, timeInSeconds) {
        if (!this.renderConfig)
            return false;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        this.renderConfig.Use();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture2D);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCM);
        let loc;
        if (loc = this.renderConfig.uniforms.get("CameraMatrix")) {
            gl.uniformMatrix4fv(loc, false, this.CameraMatrix.asColMajorArray());
        }
        if (loc = this.renderConfig.uniforms.get("LightDir")) {
            gl.uniform3fv(loc, new Vector3(0.25, 0.25, 1.0).toFloat32Array());
        }
        if (loc = this.renderConfig.uniforms.get("ProjectionMatrix")) {
            let aspect = gl.canvas.width / gl.canvas.height;
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
        let wmloc = this.renderConfig.uniforms.get("WorldMatrix");
        if (wmloc) {
            let matRotate = Matrix4.multiply(this.Object1Matrix, Matrix4.makeRotation(5 * timeInSeconds, 0, 1, 0));
            let matrix = matRotate.asColMajorArray();
            gl.uniformMatrix4fv(wmloc, false, matrix);
        }
        if (this.geometryMesh && this.renderConfig) {
            this.geometryMesh.Render(this.renderConfig);
        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        gl.activeTexture(gl.TEXTURE0);
        gl.useProgram(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.disable(gl.DEPTH_TEST);
        return true;
    }
}
;
/// <reference path="Vector2.ts" />
/// <reference path="Vector3.ts" />
/// <reference path="Vector4.ts" />
/// <reference path="Matrix2.ts" />
/// <reference path="Matrix3.ts" />
/// <reference path="Matrix4.ts" />
/// <reference path="Colors.ts" />
/// <reference path="RenderConfig.ts" />
/// <reference path="IndexedGeometryMesh.ts" />
/// <reference path="Texture.ts" />
/// <reference path="MaterialLibrary.ts" />
/// <reference path="WebGLTest1.ts" />
/// <reference path="WebGLTest2.ts" />
/// <reference path="Utils.ts" />
class Fluxions {
    constructor(gl) {
        this.gl = gl;
        this.testWebGL1 = new WebGLTest1();
        this.testWebGL2 = new WebGLTest2();
    }
    CreateRenderConfig(vertShaderText, fragShaderText) {
        return new RenderConfig(this, vertShaderText, fragShaderText);
    }
    CreateIndexGeometryMesh() {
        return new IndexedGeometryMesh(this);
    }
}
/// <reference path="./fluxions-webgl/Fluxions.ts"/>
var WebGLTemplate;
(function (WebGLTemplate) {
    class Context {
        constructor() {
            this.parentElement = null;
            this.canvasElement = null;
            this.renderingContext = null;
            this.experimentalContext = false;
            this.initialized = false;
            this.enabledExtensions = [];
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
                console.log("standard derivatives, depth texture, texture float, and element index uint supported");
            }
            return ctx;
        }
    }
    WebGLTemplate.Context = Context;
})(WebGLTemplate || (WebGLTemplate = {}));
var GTE;
(function (GTE) {
    function clamp(x, a, b) {
        return x < a ? a : x > b ? b : x;
    }
    GTE.clamp = clamp;
    // 0 <= mix <= 1
    function lerp(a, b, mix) {
        return mix * a + (1 - mix) * b;
    }
    GTE.lerp = lerp;
    class WaveletNoiseCalculator {
        constructor(noiseTileSize = 128) {
            this.noiseTileSize = noiseTileSize;
            this.initialized = false;
            this.noiseTileData = new Float32Array(noiseTileSize * noiseTileSize * noiseTileSize);
            this.GenerateNoiseTile(noiseTileSize, 0);
        }
        Mod(x, n) {
            let m = x % n;
            return m < 0 ? m + n : m;
        }
        Downsample(from, to, n, stride) {
            const ARAD = 16;
            let coefs = new Float32Array([
                0.000334, -0.001528, 0.000410, 0.003545, -0.000938, -0.008233, 0.002172, 0.019120,
                -0.005040, -0.044412, 0.011655, 0.103311, -0.025936, -0.243780, 0.033979, 0.655340,
                0.655340, 0.033979, -0.243780, -0.025936, 0.103311, 0.011655, -0.044412, -0.005040,
                0.019120, 0.002172, -0.008233, -0.000938, 0.003546, 0.000410, -0.001528, 0.000334,
                0
            ]);
            let a = coefs.subarray(ARAD);
            for (let i = 0; i < ((n / 2) | 0); i++) {
                to[i * stride] = 0;
                for (let k = 2 * i - ARAD; k <= 2 * i + ARAD; k++) {
                    let _a = coefs[ARAD + k - 2 * i];
                    to[i * stride] += _a * from[this.Mod(k, n) * stride];
                    if (!isFinite(to[i * stride])) {
                        console.error("non finite number produced");
                    }
                }
            }
        }
        Upsample(from, to, n, stride) {
            const ARAD = 16;
            let pCoefs = new Float32Array([0.25, 0.75, 0.75, 0.25]);
            let p = pCoefs.subarray(2);
            for (let i = 0; i < n; i++) {
                to[i * stride] = 0;
                let k1 = (i / 2) | 0;
                let k2 = k1 + 1;
                for (let k = k1; k <= k2; k++) {
                    let _p = pCoefs[2 + i - 2 * k];
                    to[i * stride] += _p * from[this.Mod(k, n / 2) * stride];
                    if (!isFinite(to[i * stride])) {
                        console.error("non finite number produced");
                    }
                }
            }
        }
        GenerateNoiseTile(n) {
            if (n % 2) {
                n++;
            }
            let ix = 0;
            let iy = 0;
            let iz = 0;
            let sz = n * n * n * 4;
            let temp1 = new Float32Array(n * n * n);
            let temp2 = new Float32Array(n * n * n);
            let noise = new Float32Array(n * n * n);
            for (let i = 0; i < n * n * n; i++) {
                // Wavelet noise paper says "GaussianNoise"
                noise[i] = Math.random() * 2 - 1;
            }
            // Downsample and upsample
            for (iy = 0; iy < n; iy++) {
                for (iz = 0; iz < n; iz++) {
                    let i = iy * n + iz * n * n;
                    this.Downsample(noise.subarray(i), temp1.subarray(i), n, 1);
                    this.Upsample(temp1.subarray(i), temp2.subarray(i), n, 1);
                }
            }
            for (ix = 0; ix < n; ix++) {
                for (iz = 0; iz < n; iz++) {
                    let i = ix + iz * n * n;
                    this.Downsample(temp2.subarray(i), temp1.subarray(i), n, n);
                    this.Upsample(temp1.subarray(i), temp2.subarray(i), n, n);
                }
            }
            for (ix = 0; ix < n; ix++) {
                for (iy = 0; iy < n; iy++) {
                    let i = ix + iy * n;
                    this.Downsample(temp2.subarray(i), temp1.subarray(i), n, n * n);
                    this.Upsample(temp1.subarray(i), temp2.subarray(i), n, n * n);
                }
            }
            for (let i = 0; i < n * n * n; i++) {
                noise[i] -= temp2[i];
            }
            let offset = n / 2;
            if (offset % 2) {
                offset++;
            }
            for (let i = 0, ix = 0; ix < n; ix++) {
                for (iy = 0; iy < n; iy++) {
                    for (iz = 0; iz < n; iz++) {
                        temp1[i++] = noise[this.Mod(ix + offset, n) + this.Mod(iy + offset, n) * n + this.Mod(iz + offset, n) * n * n];
                    }
                }
            }
            for (let i = 0; i < n * n * n; i++) {
                noise[i] += temp1[i];
            }
            this.noiseTileData = noise;
            this.initialized = true;
        }
        WaveletNoise(x, y, z, octave = 128) {
            let p = [octave * x, octave * y, octave * z];
            let i = 0;
            let f = [0, 0, 0];
            let c = [0, 0, 0];
            let n = this.noiseTileSize;
            let mid = [0, 0, 0];
            let w = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            let t = 0;
            let result = 0;
            // B-spline quadratic basis function
            for (i = 0; i < 3; i++) {
                mid[i] = Math.ceil(p[i] - 0.5);
                t = mid[i] - (p[i] - 0.5);
                w[i][0] = t * t / 2;
                w[i][2] = (1 - t) * (1 - t) / 2;
                w[i][1] = 1 - w[i][0] - w[i][2];
            }
            for (f[2] = -1; f[2] <= 1; f[2]++) {
                for (f[1] = -1; f[1] <= 1; f[1]++) {
                    for (f[0] = -1; f[0] <= 1; f[0]++) {
                        let weight = 1;
                        for (i = 0; i < 3; i++) {
                            c[i] = this.Mod(mid[i] + f[i], n);
                            weight *= w[i][f[i] + 1];
                            result += weight * this.noiseTileData[c[2] * n * n + c[1] * n + c[0]];
                        }
                    }
                }
            }
            return result;
        }
    }
    GTE.WaveletNoiseCalculator = WaveletNoiseCalculator;
    GTE.WaveletNoise = new WaveletNoiseCalculator(64);
})(GTE || (GTE = {}));
/// <reference path="Fluxions.ts" />
/// <reference path="Colors.ts" />
/// <reference path="IndexedGeometryMesh.ts" />
class WebGLTest3 {
    constructor() {
        // New properties
        this.fluxions = null;
        this.renderConfig = null;
        this.geometryMesh = null;
        this.initialized = false;
        this.shaderLoader = null;
        // Original properties
        this.texture2D = null;
        this.textureCM = null;
        this.textureCubePerlin = null;
        this.texturePerlin = null;
        this.CameraMatrix = Matrix4.makeLookAt(new Vector3(0, 0, 10), new Vector3(), new Vector3(0, 1, 0));
        this.WorldMatrix = Matrix4.makeIdentity();
        this.Object1Matrix = Matrix4.makeTranslation(0, -0.5, 0);
        this.Object2Matrix = Matrix4.makeTranslation(.2, 0, -5);
        this.ProjectionMatrix = Matrix4.makePerspectiveY(45, 1, 0.1, 100.0);
        this.vertShaderSource = `
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
        this.fragShaderSource = `
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
    }
    test(gl, timeInSeconds) {
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
    kill(gl) {
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
    initShaders(gl) {
        if (this.fluxions) {
            this.renderConfig = this.fluxions.CreateRenderConfig(this.vertShaderSource, this.fragShaderSource);
            //this.shaderLoader = new Utils.ShaderLoader(this.renderConfig, "shaders/fullscreenquad.vert", "shaders/fullscreenquad.frag");
            this.shaderLoader = new Utils.ShaderLoader(this.renderConfig, "shaders/pbr.vert", "shaders/pbr.frag");
        }
        return true;
    }
    initBuffers(gl) {
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
        let x = 2.0; // * 640 / 384;
        let y = 2.0;
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
    drawScene(gl, timeInSeconds) {
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
        let loc;
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
            let aspect = gl.canvas.width / gl.canvas.height;
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
        let wmloc = this.renderConfig.uniforms.get("WorldMatrix");
        if (wmloc) {
            let matRotate = Matrix4.multiply(this.Object1Matrix, Matrix4.makeRotation(5 * timeInSeconds, 0, 1, 0));
            let matrix = matRotate.asColMajorArray();
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
}
;
//# sourceMappingURL=webgl-template.js.map