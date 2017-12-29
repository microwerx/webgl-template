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
    static makePerspective(fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(Math.PI * fovy / 360.0);
        return Matrix4.makeRowMajor(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0);
    }
    static makePerspectiveY(fovx, aspect, near, far) {
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
    copy(m) {
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
    concat(m) {
        this.copy(Matrix4.multiply(this, m));
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
            if (!status)
                infoLog = gl.getShaderInfoLog(vertShader);
            if (status)
                this._vertShaderCompileStatus = true;
            if (infoLog)
                this._vertShaderInfoLog = infoLog;
            this._vertShader = vertShader;
        }
        let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragShader) {
            gl.shaderSource(fragShader, fragShaderSource);
            gl.compileShader(fragShader);
            let status = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
            let infoLog = null;
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
    }
    add() { this.count++; }
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
            new AttribInfo(0, "aVertex", true, new Vector4(0, 0, 0, 1)),
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
        this._vertices = new Float32Array(this._maxVertices);
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
            gl.vertexAttribPointer(this._attribInfo[i].location, 4, gl.FLOAT, false, 8 * 4 * 4, i * 4 * 4);
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
            if (this._attribInfo[i].enabled) {
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
        else {
            this._indices[this._indexCount] = index;
        }
        this._indexCount++;
        this._surfaces[this._surfaces.length - 1].add();
        this._dirty = true;
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
}
/// <reference path="./Fluxions.ts"/>
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
class WebGLTest {
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
        this.ProjectionMatrix = Matrix4.makePerspective(45, 1, 0.1, 100.0);
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
    test(gl) {
        if (!this.initShaders(gl)) {
            this.kill(gl);
            return false;
        }
        if (!this.initBuffers(gl)) {
            this.kill(gl);
            return false;
        }
        if (!this.drawScene(gl)) {
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
    drawScene(gl) {
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
            this.ProjectionMatrix = Matrix4.makePerspective(45, aspect, 0.1, 100.0);
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
/// <reference path="IndexedGeometryMesh.ts" />
class WebGLTest2 {
    constructor() {
        // New properties
        this.fluxions = null;
        this.renderConfig = null;
        this.geometryMesh = null;
        // Original properties
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
        this.ProjectionMatrix = Matrix4.makePerspective(45, 1, 0.1, 100.0);
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
    test(gl) {
        this.fluxions = new Fluxions(gl);
        if (!this.initShaders(gl)) {
            this.kill(gl);
            return false;
        }
        if (!this.initBuffers(gl)) {
            this.kill(gl);
            return false;
        }
        if (!this.drawScene(gl)) {
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
        this.fluxions = null;
    }
    initShaders(gl) {
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
        for (let uniform of this.uniforms) {
            this.uniforms.set(uniform[0], gl.getUniformLocation(this.program, uniform[0]));
        }
        return true;
    }
    initBuffers(gl) {
        if (!this.fluxions)
            return false;
        this.geometryMesh = new IndexedGeometryMesh(this.fluxions);
        this.geometryMesh.VertexAttrib4(0, 0, 1, 0, 1);
        this.geometryMesh.VertexAttrib4(0, -1, -1, 0, 1);
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
    drawScene(gl) {
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
            this.ProjectionMatrix = Matrix4.makePerspective(45, aspect, 0.1, 100.0);
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
        //gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
        if (this.geometryMesh) {
            this.geometryMesh.Render(this.renderConfig);
        }
        gl.disableVertexAttribArray(0);
        gl.useProgram(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
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
/// <reference path="RenderConfig.ts" />
/// <reference path="IndexedGeometryMesh.ts" />
/// <reference path="Texture.ts" />
/// <reference path="MaterialLibrary.ts" />
/// <reference path="WebGLTest.ts" />
/// <reference path="WebGLTest2.ts" />
class Fluxions {
    constructor(gl) {
        this.gl = gl;
        this.testWebGL = new WebGLTest();
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