/// <reference path="fluxions.ts" />


class Vector4 {
    constructor(public x: number = 0.0, public y: number = 0.0, public z = 0.0, public w = 1.0) {
    }

    copy(v: Vector4): Vector4 {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
        return this;
    }

    reset(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 1.0): Vector4 {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    add(v: Vector4): Vector4 {
        return new Vector4(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z,
            this.w + v.w
        );
    }

    sub(v: Vector4): Vector4 {
        return new Vector4(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z,
            this.w - v.w
        );
    }

    mul(multiplicand: number): Vector4 {
        return new Vector4(
            this.x * multiplicand,
            this.y * multiplicand,
            this.z * multiplicand,
            this.w * multiplicand
        );
    }

    // returns 0 if denominator is 0
    div(divisor: number): Vector4 {
        if (divisor == 0.0)
            return new Vector4();
        return new Vector4(
            this.x / divisor,
            this.y / divisor,
            this.z / divisor,
            this.w / divisor
        )
    }

    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }

    toArray(): number[] {
        return [this.x, this.y, this.z, this.w];
    }

    toVector2(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    toVector3(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    project(): Vector3 {
        return new Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    norm(): Vector4 {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector4();
        else
            len = Math.sqrt(len);
        return new Vector4(this.x / len, this.y / len, this.z / len, this.w / len);
    }

    static dot(v1: Vector4, v2: Vector4): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
    }

    static normalize(v: Vector4): Vector4 {
        let len = v.length();
        if (len == 0.0) {
            v.reset(0.0, 0.0, 0.0, 0.0);
        } else {
            v.x /= len;
            v.y /= len;
            v.z /= len;
            v.w /= len;
        }
        return v;
    }
}