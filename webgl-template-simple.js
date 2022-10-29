// WebGL Template (simple)
//
// This is educational material to teach how to use WebGL on a web page.
//
// It is licensed under the MIT license.
//
// Copyright (C) 2022 Jonathan Metzgar
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

let vshader = `#version 300 es

layout (location=0) in vec4 position;
layout (location=1) in vec2 texcoord;

out vec2 vTexcoord;

void main() {
    vTexcoord = texcoord;
    gl_Position = position;
}
`;

let fshader = `#version 300 es
precision highp float;

in vec2 vTexcoord;
out vec4 fragColor;

void main() {
    fragColor = vec4(vTexcoord.xy, 1.0, 1.0);
}
`;

class PipelineState {
    /**
     *
     * @param {WebGL2RenderingContext} gl
     * @param {string} vertexSource
     * @param {string} fragmentSource
     */
    constructor(gl, vertexSource, fragmentSource) {
        this.gl = gl

        this.vertexShader = this.createShader(vertexSource, gl.VERTEX_SHADER)
        if (!this.vertexShader) {
            // return
        }

        this.fragmentShader = this.createShader(fragmentSource, gl.FRAGMENT_SHADER)
        if (!this.fragmentShader) {
            // return
        }

        this.program = this.createProgram(this.vertexShader, this.fragmentShader)
    }

    /**
     *
     * @param {string} source
     * @param {number} type
     * @returns {WebGLShader | null}
     */
    createShader(source, type) {
        let gl = this.gl
        let shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        // Check for errors.
        let status = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (!status) {
            // Print the info log.
            let infoLog = gl.getShaderInfoLog(shader)
            if (infoLog) {
                let shaderType = ''
                if (type == gl.VERTEX_SHADER)
                    shaderType = "vertex shader"
                else if (type == gl.FRAGMENT_SHADER)
                    shaderType = "fragment shader"
                console.log("Error compiling", shaderType, "InfoLog:")
                console.log(infoLog)
            }
            return null
        }

        return shader
    }

    /**
     *
     * @param {WebGLShader} vshader
     * @param {WebGLShader} fshader
     * @returns {WebGLProgram | null}
     */
    createProgram(vshader, fshader) {
        let gl = this.gl

        let program = gl.createProgram()
        if (vshader)
            gl.attachShader(program, vshader)
        if (fshader)
            gl.attachShader(program, fshader)
        gl.linkProgram(program)

        // Check for errors.
        let status = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (!status) {
            // Print the info log.
            let infoLog = gl.getProgramInfoLog(program)
            if (infoLog) {
                console.log("Failed to link program.")
                console.log(infoLog)
            }
            return null
        }

        return program
    }

    use() {
        this.gl.useProgram(this.program)
    }

    /**
     *
     * @param {string} uniformName
     * @param {Matrix4} matrix
     * @returns
     */
    setMatrix(uniformName, matrix) {
        let gl = this.gl
        let uloc = gl.getUniformLocation(this.program, uniformName)
        if (!uloc) {
            return
        }
        gl.uniformMatrix4fv(uloc, false, matrix.asFloat32Array(), 0, 0)
    }
}

/**
 * Stores a column vector in a Float32Array.
 */
class Vector4 {
    /**
     * Creates a member `v` that stores [x, y, z, w]
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    constructor(x, y, z, w) {
        this.v = new Float32Array([x, y, z, w])
    }
}

/**
 * Stores a 4x4 matrix in column major order.
 */
class Matrix4 {
    constructor(
        m11=1, m12=0, m13=0, m14=0, // Row 1
        m21=0, m22=1, m23=0, m24=0, // Row 2
        m31=0, m32=0, m33=1, m34=0, // Row 3
        m41=0, m42=0, m43=0, m44=1  // Row 4
    ) {
        this.m11 = m11; this.m12 = m12; this.m13 = m13; this.m14 = m14;
        this.m21 = m21; this.m22 = m22; this.m23 = m23; this.m24 = m24;
        this.m31 = m31; this.m32 = m32; this.m33 = m33; this.m34 = m34;
        this.m41 = m41; this.m42 = m42; this.m43 = m43; this.m44 = m44;
    }

    /**
     * Copies all the elements into a new matrix.
     * @returns {Matrix4}
     */
    duplicate() {
        return Matrix4(
            this.m11, this.m12, this.m13, this.m14, // Row 1
            this.m21, this.m22, this.m23, this.m24, // Row 2
            this.m31, this.m32, this.m33, this.m34, // Row 3
            this.m41, this.m42, this.m43, this.m44  // Row 4
        )
    }

    /**
     * Copies the elements from an `other` matrix into this one.
     * @param {Matrix4} other
     * @returns {Matrix4}
     */
    loadMatrix(other) {
        this.m11 = other.m11; this.m12 = other.m12; this.m13 = other.m13; this.m14 = other.m14;
        this.m21 = other.m21; this.m22 = other.m22; this.m23 = other.m23; this.m24 = other.m24;
        this.m31 = other.m31; this.m32 = other.m32; this.m33 = other.m33; this.m34 = other.m34;
        this.m41 = other.m41; this.m42 = other.m42; this.m43 = other.m43; this.m44 = other.m44;
    }

    /**
     * Multiplies two matrices togethers.
     * @param {Matrix4} m1
     * @param {Matrix4} m2
     * @returns {Matrix4}
     */
    multiply(m1, m2) {
        return new Matrix4(
            m1.m11 * m2.m11 + m1.m21 * m2.m12 + m1.m31 * m2.m13 + m1.m41 * m2.m14,
            m1.m11 * m2.m21 + m1.m21 * m2.m22 + m1.m31 * m2.m23 + m1.m41 * m2.m24,
            m1.m11 * m2.m31 + m1.m21 * m2.m32 + m1.m31 * m2.m33 + m1.m41 * m2.m34,
            m1.m11 * m2.m41 + m1.m21 * m2.m42 + m1.m31 * m2.m43 + m1.m41 * m2.m44,
            m1.m12 * m2.m11 + m1.m22 * m2.m12 + m1.m32 * m2.m13 + m1.m42 * m2.m14,
            m1.m12 * m2.m21 + m1.m22 * m2.m22 + m1.m32 * m2.m23 + m1.m42 * m2.m24,
            m1.m12 * m2.m31 + m1.m22 * m2.m32 + m1.m32 * m2.m33 + m1.m42 * m2.m34,
            m1.m12 * m2.m41 + m1.m22 * m2.m42 + m1.m32 * m2.m43 + m1.m42 * m2.m44,
            m1.m13 * m2.m11 + m1.m23 * m2.m12 + m1.m33 * m2.m13 + m1.m43 * m2.m14,
            m1.m13 * m2.m21 + m1.m23 * m2.m22 + m1.m33 * m2.m23 + m1.m43 * m2.m24,
            m1.m13 * m2.m31 + m1.m23 * m2.m32 + m1.m33 * m2.m33 + m1.m43 * m2.m34,
            m1.m13 * m2.m41 + m1.m23 * m2.m42 + m1.m33 * m2.m43 + m1.m43 * m2.m44,
            m1.m14 * m2.m11 + m1.m24 * m2.m12 + m1.m34 * m2.m13 + m1.m44 * m2.m14,
            m1.m14 * m2.m21 + m1.m24 * m2.m22 + m1.m34 * m2.m23 + m1.m44 * m2.m24,
            m1.m14 * m2.m31 + m1.m24 * m2.m32 + m1.m34 * m2.m33 + m1.m44 * m2.m34,
            m1.m14 * m2.m41 + m1.m24 * m2.m42 + m1.m34 * m2.m43 + m1.m44 * m2.m44
        );
    }

    /**
     * Multiplies `other` by this matrix and returns `this`.
     * @param {Matrix4} other
     * @returns {Matrix4}
     */
    multMatrix(other) {
        this.loadMatrix(this.multiply(this, other))
        return this
    }

    asFloat32Array() {
        return new Float32Array([
            this.m11, this.m21, this.m31, this.m41, // Column 1
            this.m12, this.m22, this.m32, this.m42, // Column 2
            this.m13, this.m23, this.m33, this.m43, // Column 3
            this.m14, this.m24, this.m34, this.m44, // Column 4
        ])
    }

    loadIdentity() {
        this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
        this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
        this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
        this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
        return this;
    }

    translate(x, y, z) {
        let T = new Matrix4(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1)
        return this.multMatrix(T)
    }

    scale(x, y, z) {
        let S = new Matrix4(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        )
        return this.multMatrix(S)
    }

    rotate(angleInDegrees, x, y, z) {
        let theta = angleInDegrees * Math.PI / 180.0
        let c = Math.cos(theta)
        let s = Math.sin(theta)
        let invLength = 1.0 / Math.sqrt(x * x + y * y + z * z)
        x *= invLength
        y *= invLength
        z *= invLength

        let R = new Matrix4(
            x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, 0.0,
            y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, 0.0,
            x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return this.multMatrix(R)
    }

    /**
     *
     * @param {number} fovy
     * @param {number} aspect
     * @param {number} near
     * @param {number} far
     * @returns
     */
    perspective(fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(Math.PI * fovy / 360.0);
        let P = new Matrix4(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / (near - far), 2 * far * near / (near - far),
            0, 0, -1, 0
        )
        return this.multMatrix(P)
    }
}

class Geometry {
    /**
     *
     * @param {WebGL2RenderingContext} gl
     */
    constructor(gl, size) {
        this.gl = gl

        this.positions = new Float32Array([
            -size, -size, 0,
             size, -size, 0,
             0, size, 0
        ])

        this.texcoords = new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            0.5, 1.0
        ])

        this.vertexArray = gl.createVertexArray()
        gl.bindVertexArray(this.vertexArray)

        // Create the buffer object to store the positions.
        this.positionsBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW)
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(0)

        // Create the buffer object to store the texture coordinates.
        this.texcoordBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.texcoords, gl.STATIC_DRAW)
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(1)
    }

    /**
     *
     * @param {WebGL2RenderingContext} gl
     * @param {WebGLProgram} program
     */
    drawPlane(gl, program) {
        gl.bindVertexArray(this.vertexArray)

        // Draw the triangle data.
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}

// Create the Canvas element.
class WebGLApp
{
    constructor(parentId) {
        this.parent = document.getElementById(parentId)
        if (!this.parent) {
            console.log("Parent container doesn't exist.")
            return
        }

        // Create the canvas element.
        this.canvas = document.createElement("canvas")
        this.parent.appendChild(this.canvas)
        this.canvas.width = this.parent.clientWidth
        this.canvas.height = (this.parent.clientWidth / 1.5) | 0;
        this.canvas.style.borderRadius = 5

        // Create the WebGL context.
        this.gl = this.canvas.getContext("webgl2")
        if (!this.gl) {
            console.log("WebGL context couldn't be made.")
            return
        }

        // Set up the timing variables.
        this.currentTime = 0
        this.deltaTime = 0
        this.frameNum = 0

        // Get the debug console if available.
        this.console = document.getElementById('console')

        this.setupGL()
        this.loadObjects()
    }

    setupGL() {
        this.pso = new PipelineState(this.gl, vshader, fshader)
    }

    loadObjects() {
        this.geometry = new Geometry(this.gl, 0.5)
    }

    setDebugMessage(str) {
        if (!this.console)
            return

        this.console.innerHTML = str
    }

    update(dt) {
        this.modelMatrix = new Matrix4()
        this.modelMatrix.translate(0, 0, -2)
        this.cameraMatrix = new Matrix4()
        this.projectionMatrix = new Matrix4()
        this.projectionMatrix.perspective(45.0, this.canvas.width/this.canvas.height, 0.1, 100.0)
    }

    draw(gl) {
        // Clear the screen.
        gl.clearColor(1.0, 0.0, 0.0, 1.0)
        gl.clearColor(Math.abs(Math.sin(this.currentTime)) * 1.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // Set the pipeline state object.
        this.pso.use()
        this.pso.setMatrix('WorldMatrix', this.modelMatrix)
        this.pso.setMatrix('CameraMatrix', this.cameraMatrix)
        this.pso.setMatrix('ProjectionMatrix', this.projectionMatrix)

        // Draw the object.
        this.geometry.drawPlane(gl, this.pso.program)
    }

    mainloop() {
        this.frameNum++
        let self = this
        requestAnimationFrame((t) => {
            // Calculate the timing variables for smooth animation.
            let tSeconds = t / 1000.0
            self.deltaTime = tSeconds - self.currentTime
            self.currentTime = tSeconds

            self.update(self.deltaTime)
            if (this.gl)
                self.draw(this.gl)
            this.setDebugMessage(this.frameNum.toString())

            // Call the mainloop again.
            self.mainloop()
        })
    }

    run() {
        this.mainloop()
    }
}
