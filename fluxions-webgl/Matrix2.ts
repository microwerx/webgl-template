/// <reference path="Fluxions.ts" />

class Matrix2 {
	constructor(
		public m11: number, public m21: number,
		public m12: number, public m22: number
	) { }

	static makeIdentity(): Matrix2 {
		return new Matrix2(
			1, 0,
			0, 1
		)
	}

	static makeZero(): Matrix2 {
		return new Matrix2(
			0, 0,
			0, 0
		)
	}

	static makeColMajor(
		m11: number, m21: number,
		m12: number, m22: number
	) {
		return new Matrix2(
			m11, m21,
			m12, m22
		);
	}

	static makeRowMajor(
		m11: number, m12: number,
		m21: number, m22: number): Matrix2 {
		return new Matrix2(
			m11, m21,
			m12, m22
		);
	}

	static fromRowMajorArray(v: number[]): Matrix2 {
		if (v.length >= 4)
			return new Matrix2(
				v[0], v[2],
				v[1], v[3]
			);
		return new Matrix2(0, 0, 0, 0);
	}

	static fromColMajorArray(v: number[]): Matrix2 {
		if (v.length >= 4)
			return new Matrix2(
				v[0], v[1],
				v[2], v[3]
			);
		return new Matrix2(0, 0, 0, 0);
	}

	static makeScale(x: number, y: number): Matrix2 {
		return Matrix2.makeRowMajor(
			x, 0,
			0, y
		);
	}

	static makeRotation(angleInDegrees: number, x: number, y: number, z: number): Matrix2 {
		var c: number = Math.cos(angleInDegrees * Math.PI / 180.0);
		var s: number = Math.sin(angleInDegrees * Math.PI / 180.0);

		return Matrix2.makeRowMajor(
			c, -s,
			s, c
		);
	}

	asColMajorArray(): number[] {
		return [
			this.m11, this.m21,
			this.m12, this.m22
		];
	}

	asRowMajorArray(): number[] {
		return [
			this.m11, this.m12,
			this.m21, this.m22
		];
	}

	static multiply(m1: Matrix2, m2: Matrix2): Matrix2 {
		return new Matrix2(
			m1.m11 * m2.m11 + m1.m21 * m2.m12,
			m1.m11 * m2.m21 + m1.m21 * m2.m22,

			m1.m12 * m2.m11 + m1.m22 * m2.m12,
			m1.m12 * m2.m21 + m1.m22 * m2.m22
		);
	}

	copy(m: Matrix2): Matrix2 {
		this.m11 = m.m11; this.m21 = m.m21;
		this.m12 = m.m12; this.m22 = m.m22;
		return this;
	}

	concat(m: Matrix2): Matrix2 {
		this.copy(Matrix2.multiply(this, m));
		return this;
	}

	transform(v: Vector2): Vector2 {
		return new Vector2(
			this.m11 * v.x + this.m12 * v.y,
			this.m21 * v.x + this.m22 * v.y
		);
	}

	asInverse(): Matrix2 {
		var tmpD = 1.0 / (this.m11 * this.m22 - this.m12 * this.m21);

		return Matrix2.makeRowMajor(
			this.m22 * tmpD, -this.m12 * tmpD,
			-this.m21 * tmpD, this.m11 * tmpD
		);
	}

	asTranspose(): Matrix2 {
		return Matrix2.makeRowMajor(
			this.m11, this.m21,
			this.m12, this.m22
		);
	}
} // class Matrix2