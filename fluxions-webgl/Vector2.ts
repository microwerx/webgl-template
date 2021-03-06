/// <reference path="fluxions.ts" />


class Vector2 {
    constructor(public x: number = 0.0, public y: number = 0.0) {
    }

    copy(v: Vector2): Vector2 {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    reset(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;
        return this;
    }

    add(v: Vector2): Vector2 {
        return new Vector2(
            this.x + v.x,
            this.y + v.y
        );
    }

    sub(v: Vector2): Vector2 {
        return new Vector2(
            this.x - v.x,
            this.y - v.y
        );
    }

    mul(multiplicand: number): Vector2 {
        return new Vector2(
            this.x * multiplicand,
            this.y * multiplicand
        );
    }

    // returns 0 if denominator is 0
    div(divisor: number): Vector2 {
        if (divisor == 0.0)
            return new Vector2();
        return new Vector2(
            this.x / divisor,
            this.y / divisor
        )
    }

    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y]);
    }

    toVector2(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    toVector3(): Vector3 {
        return new Vector3(this.x, this.y, 0.0);
    }

    toVector4(): Vector4 {
        return new Vector4(this.x, this.y, 0.0, 0.0);
    }

    project(): number {
        return this.x / this.y;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    norm(): Vector2 {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector2();
        else
            len = Math.sqrt(len);
        return new Vector2(this.x / len, this.y / len);
    }

    static dot(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static cross(a: Vector2, b: Vector2): number {
        return a.x * b.y - a.y * b.x;
    }

    static normalize(v: Vector2): Vector2 {
        let len = v.length();
        if (len == 0.0) {
            v.reset(0.0, 0.0);
        } else {
            v.x /= len;
            v.y /= len;
        }
        return v;
    }
}