/// <reference path="./Fluxions.ts"/>
/// <reference path="./Utils.ts" />


class Property {
    private _loc: number = -1;
    private _value: number[];
    private _count: number = 0;
    private _isFloat: boolean = false;

    get data(): Int32Array | Float32Array {
        if (this._isFloat)
            return new Float32Array(this._value);
        return new Int32Array(this._value);
    }
    get count(): number { return this._count; }
    get size(): number { return this._value.length; }
    get sizeInBytes(): number { return this._value.length * 4; }

    constructor(readonly name: string, readonly type: number, values: number[], readonly transposed = false) {
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

    GetLocation(gl: WebGLRenderingContext, program: WebGLProgram): boolean {
        let loc: any = gl.getUniformLocation(program, this.name);
        if (loc) {
            this._loc = loc;
            return true;
        } else {
            this._loc = -1;
        }
        return false;
    }

    Set1i(x: number): boolean {
        if (this.type == WebGLRenderingContext.INT) {
            this._value[0] = x;
            return true;
        }
        return false;
    }

    Set2i(x: number, y: number): boolean {
        if (this.type == WebGLRenderingContext.INT_VEC2) {
            this._value[0] = x;
            this._value[1] = y;
            return true;
        }
        return false;
    }
}

class Material {
    readonly Properties: Map<string, Property> = new Map<string, Property>();

    constructor(private _context: Fluxions, name: string = "unknown") {
    }

    SetProperty1i(name: string, x: number): boolean {
        return this.SetPropertyiv(name, [x]);
    }
    SetProperty2i(name: string, x: number, y: number): boolean {
        return this.SetPropertyiv(name, [x, y]);
    }
    SetProperty3i(name: string, x: number, y: number, z: number): boolean {
        return this.SetPropertyiv(name, [x, y, z]);
    }
    SetProperty4i(name: string, x: number, y: number, z: number, w: number): boolean {
        return this.SetPropertyiv(name, [x, y, z, w]);
    }
    SetProperty1f(name: string, x: number): boolean {
        return this.SetPropertyfv(name, [x]);
    }
    SetProperty2f(name: string, x: number, y: number): boolean {
        return this.SetPropertyfv(name, [x, y]);
    }
    SetProperty3f(name: string, x: number, y: number, z: number): boolean {
        return this.SetPropertyfv(name, [x, y, z]);
    }
    SetProperty4f(name: string, x: number, y: number, z: number, w: number): boolean {
        return this.SetPropertyfv(name, [x, y, z, w]);
    }
    SetPropertyMatrix2f(name: string, m: Matrix2, transposed: boolean = false): boolean {
        return this.SetPropertyMatrixfv(name, m.asColMajorArray(), transposed);
    }
    SetPropertyMatrix3f(name: string, m: Matrix3, transposed: boolean = false): boolean {
        return this.SetPropertyMatrixfv(name, m.asColMajorArray(), transposed);
    }
    SetPropertyMatrix4f(name: string, m: Matrix4, transposed: boolean = false): boolean {
        return this.SetPropertyMatrixfv(name, m.asColMajorArray(), transposed);
    }

    SetPropertyiv(name: string, values: number[]): boolean {
        let type: number = 0;
        switch (values.length) {
            case 1: type = this._context.gl.INT; break;
            case 2: type = this._context.gl.INT_VEC2; break;
            case 3: type = this._context.gl.INT_VEC3; break;
            case 4: type = this._context.gl.INT_VEC4; break;
        }
        if (!type) return false;

        let property: Property | undefined;
        if (this.Properties.has(name)) {
            property = this.Properties.get(name);
            if (!property || property.type != type)
                return false;
        }

        let intValues = new Array<number>(values.length);
        for (let i = 0; i < values.length; i++) {
            intValues[i] = values[i] | 0;
        }
        this.Properties.set(name, new Property(name, type, intValues));
        return true;
    }

    SetPropertyfv(name: string, values: number[]): boolean {
        let type: number = 0;
        switch (values.length) {
            case 1: type = this._context.gl.FLOAT; break;
            case 2: type = this._context.gl.FLOAT_VEC2; break;
            case 3: type = this._context.gl.FLOAT_VEC3; break;
            case 4: type = this._context.gl.FLOAT_VEC4; break;
        }
        if (!type) return false;

        let property: Property | undefined;
        if (this.Properties.has(name)) {
            property = this.Properties.get(name);
            if (!property || property.type != type)
                return false;
        }
        this.Properties.set(name, new Property(name, type, values));
        return true;
    }

    SetPropertyMatrixfv(name: string, values: number[], transposed: boolean = false): boolean {
        let type: number = 0;
        switch (values.length) {
            case 4: type = this._context.gl.FLOAT_MAT2; break;
            case 9: type = this._context.gl.FLOAT_MAT3; break;
            case 16: type = this._context.gl.FLOAT_MAT4; break;
        }
        if (!type) return false;

        let property: Property | undefined;
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
    public defaultMaterial: Material = new Material(this._context, "unknown");
    public materials: Map<string, Material> = new Map<string, Material>();
    constructor(private _context: Fluxions) {
    }

    IsMaterial(name: string): boolean {
        return this.materials.has(name);
    }

    GetMaterial(name: string): Material {
        let material = this.materials.get(name);
        if (!material) {
            material = new Material(this._context, name)
            this.materials.set(name, material);
        }
        return material;
    }
}

function testMaterialLibrary(fluxions: Fluxions): boolean {
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