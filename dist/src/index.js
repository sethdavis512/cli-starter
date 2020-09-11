"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const inquirer = require('inquirer');
const read = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
});
const write = (filePath, fileName, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}/${fileName}.json`, content, (err) => {
            if (err)
                reject(err);
            console.log('\n💥File successfully written!\n');
        });
    });
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const [firstArg] = process.argv.slice(2);
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Name'
            }
        ];
        try {
            const answers = yield inquirer.prompt(questions);
            const resolvedPath = path.resolve(firstArg);
            const targetDir = path.parse(resolvedPath).dir;
            const data = yield read(resolvedPath);
            const content = data.toString();
            console.log(content);
        }
        catch (error) {
            console.log(error);
        }
    });
}
run();
