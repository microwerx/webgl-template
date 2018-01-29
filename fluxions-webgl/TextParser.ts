

class TextParser {
    public lines: Array<string[]> = [];
    constructor(private _data: string) {
        // split into lines
        let lines = this._data.split(/[\r\n]+/);

        for (let line of lines) {
            let splittokens = line.split(/\s+/);
            let tokens: string[] = [];
            for (let t of splittokens) {
                if (t.length != 0)
                    tokens.push(t);
            }

            // ignore blank lines
            if (tokens.length == 0) {
                continue;
            }
            // ignore comments
            if (tokens[0] == '#') {
                continue;
            }

            this.lines.push(tokens);
        }
    }

    static ParseVector(line: string[]): Vector3 {
        let x: number = (line.length >= 2) ? parseFloat(line[1]) : 0.0;
        let y: number = (line.length >= 3) ? parseFloat(line[2]) : 0.0;
        let z: number = (line.length >= 4) ? parseFloat(line[3]) : 0.0;
        return new Vector3(x, y, z);
    }

    static ParseFaceIndices(token: string): Array<number> {
        let indices: Array<number> = [0, 0, 0];
        let values = token.split("/");
        if (values.length >= 1) {
            indices[0] = parseInt(values[0]);
        }
        if (values.length == 2) {
            indices[2] = parseInt(values[1]);
        }
        else if (values.length == 3) {
            indices[1] = parseInt(values[1]);
            indices[2] = parseInt(values[2]);
        }
        return indices;
    }

    static ParseFace(tokens: string[]): Array<number> {
        let v1 = TextParser.ParseFaceIndices(tokens[1]);
        let v2 = TextParser.ParseFaceIndices(tokens[2]);
        let v3 = TextParser.ParseFaceIndices(tokens[3]);
        let indices = [...v1, ...v2, ...v3];
        return indices;
    }

    static ParseIdentifier(tokens: string[]): string {
        tokens.shift();
        let name = tokens.join('_').replace(/[^\w]/, "_");
        return name;
    }
}