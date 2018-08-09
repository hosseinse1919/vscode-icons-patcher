"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
var mydata = {
    JsonFile: "E:\\vscode-ext-gen\\test\\fileicons\\icon-theme.json",
    imageFolder: "E:\\vscode-ext-gen\\test\\fileicons\\images",
    colorsFolder: "E:\\vscode-ext-gen\\test\\fileicons\\colors",
    Customize: "E:\\vscode-ext-gen\\extension\\Generate\\Folder-customize-colors.json"
};
var less = fs_1.readFileSync("E:\\vscode-ext-gen\\extension\\Generate\\colors.less").toString();
var fd = fs_1.readFileSync("E:\\vscode-ext-gen\\extension\\Generate\\fd.svg").toString();
var fdo = fs_1.readFileSync("E:\\vscode-ext-gen\\extension\\Generate\\fdo.svg").toString();
var keys = [];
less.split("\n")
    .forEach(ln => {
    if (ln.startsWith("@")) {
        ln = ln.substring(ln.indexOf("@") + 1).split(";")[0];
        var k1 = ln.split(":")[0].trim();
        var v1 = ln.split(":")[1].trim();
        keys.push({ name: k1, val: v1 });
    }
});
var jsonFile = JSON.parse(fs_1.readFileSync(mydata.JsonFile).toString());
keys.forEach(k => {
    fs_1.writeFileSync(path_1.join(mydata.colorsFolder, k.name + "-fd.svg"), fd.replace("{{color}}", k.val));
    fs_1.writeFileSync(path_1.join(mydata.colorsFolder, k.name + "-fdo.svg"), fdo.replace("{{color}}", k.val));
    jsonFile.iconDefinitions[k.name + "-fd"] = {
        "iconPath": `./colors/${k.name}-fd.svg`
    };
    jsonFile.iconDefinitions[k.name + "-fdo"] = {
        "iconPath": `./colors/${k.name}-fdo.svg`
    };
});
//#CUSTOMIZE JSON
var customize = JSON.parse(fs_1.readFileSync(mydata.Customize).toString());
for (const key in customize) {
    const value = customize[key];
    jsonFile.folderNames[key] = value + "-fd";
    jsonFile.folderNamesExpanded[key] = value + "-fdo";
}
fs_1.writeFileSync(mydata.JsonFile, JSON.stringify(jsonFile));
