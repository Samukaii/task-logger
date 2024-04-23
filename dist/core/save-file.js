import os from "node:os";
import fs from "node:fs";
var save = function (path, content) {
    var userDir = os.homedir();
    var dir = "".concat(userDir, "/task-logger");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync("".concat(dir, "/").concat(path, ".json"), content);
};
var read = function (path) {
    var userDir = os.homedir();
    var baseDir = "".concat(userDir, "/task-logger");
    fs.mkdirSync(baseDir, { recursive: true });
    var result;
    try {
        var file = fs.readFileSync("".concat(baseDir, "/").concat(path, ".json"), 'utf-8');
        result = JSON.parse(file);
    }
    catch (e) { }
    return result;
};
export var persistence = {
    save: save,
    read: read
};
//# sourceMappingURL=save-file.js.map