import os from "node:os";
import fs from "node:fs";

const save = (path: string, content: string) => {
    const userDir = os.homedir();
    const dir = `${userDir}/task-logger`;

    fs.mkdirSync(dir, {recursive: true});

    fs.writeFileSync(`${dir}/${path}.json`, content);
};

const read = <T>(path: string) => {
    const userDir = os.homedir();
    const baseDir = `${userDir}/task-logger`;

    fs.mkdirSync(baseDir, {recursive: true});

    let result: T | undefined;

    try {
        const file = fs.readFileSync(`${baseDir}/${path}.json`, 'utf-8');

        result = JSON.parse(file) as T;
    }
    catch (e) {}

    return result;
};

export const persistence = {
    save,
    read
}