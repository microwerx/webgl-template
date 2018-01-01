/// <reference path="./Fluxions.ts" />
/// <reference path="./RenderConfig.ts" />

namespace Utils {
    export class ShaderLoader {
        private vertLoaded: boolean = false;
        private fragLoaded: boolean = false;
        private vertShaderSource: string = "";
        private fragShaderSource: string = "";
        constructor(public rc: RenderConfig, public vertShaderUrl: string, public fragShaderUrl: string) {
            let self = this;
            let vertAjax: XMLHttpRequest = new XMLHttpRequest();
            vertAjax.addEventListener("load", (e) => {
                self.vertShaderSource = vertAjax.responseText;
                self.vertLoaded = true;
                if (self.vertLoaded && self.fragLoaded) {
                    self.rc.Reset(self.vertShaderSource, self.fragShaderSource);
                }
            });
            vertAjax.open("GET", vertShaderUrl);
            vertAjax.send();

            let fragAjax: XMLHttpRequest = new XMLHttpRequest();
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
}