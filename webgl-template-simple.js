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
        let vshader = ''
        let fshader = ''
        this.pso = new PipelineState(this.gl, vshader, fshader)
    }

    loadObjects() {

    }

    setDebugMessage(str) {
        if (!this.console)
            return

        this.console.innerHTML = str
    }

    update(dt) {

    }

    draw(gl) {
        // Clear the screen.
        gl.clearColor(1.0, 0.0, 0.0, 1.0)
        gl.clearColor(Math.abs(Math.sin(this.currentTime)) * 1.0, 0.0, 0.0, 1.0);
        gl.clear(gl.CLEAR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // Set the pipeline state object.

        // Draw the object.
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
