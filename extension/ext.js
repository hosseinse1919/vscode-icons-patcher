"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
//run for vscode and insiders
var vsnames = ["vscode", "vscode-insiders"];
//# Global Assign
var paths = {
    Extension: {
        Dir: [],
        JsonFile: "",
        imageFolder: "",
        colorFolder: ""
    },
    mydata: {
        JsonFile: "../test/icon-theme.json",
        imageFolder: "../test/fileicons/images",
        colorsFolder: "../test/fileicons/colors",
        Customize: "./Generate/Folder-customize-colors.json"
    }
};
//# Windows User Folder
function getUserHome() {
    var hpath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    if (hpath)
        return [true, hpath];
    return [false, ""];
}
//# start
var hpath = getUserHome();
if (hpath[0]) {
    vsnames.forEach(p => {
        var extfolder = path_1.join(hpath[1], ".", "extensions");
    });
}
//# Get Extension Src Path 
paths.Extension.Dir =
    [, `${getUserHome()}\\.\\extensions`];
paths.Extension.Dir.forEach(dirextpath => {
    fs_1.readdirSync(dirextpath).forEach(fdr => {
        if (fdr.startsWith("robertohuertasm.vscode-icons")) {
            var localpth = `${dirextpath}\\${fdr}\\out\\src`;
            paths.Extension.JsonFile = path_1.join(localpth, "icons.json");
            paths.Extension.imageFolder = path_1.join(localpth, "images");
            paths.Extension.colorFolder = path_1.join(localpth, "colors");
            console.log("Extension Detected", localpth);
            //#  generate Folders And Compare
            if (!fs_1.existsSync(paths.Extension.imageFolder)) {
                fs_1.mkdirSync(paths.Extension.imageFolder);
            }
            if (!fs_1.existsSync(paths.Extension.colorFolder)) {
                fs_1.mkdirSync(paths.Extension.colorFolder);
            }
            fs_1.readdirSync(paths.mydata.imageFolder).forEach(img => {
                var srcpath = path_1.join(paths.mydata.imageFolder, img);
                var destpath = path_1.join(paths.Extension.imageFolder, img);
                //? Copy ALL
                fs_1.copyFileSync(srcpath, destpath);
            });
            fs_1.readdirSync(paths.mydata.colorsFolder).forEach(img => {
                var srcpath = path_1.join(paths.mydata.colorsFolder, img);
                var destpath = path_1.join(paths.Extension.colorFolder, img);
                if (!fs_1.existsSync(destpath)) {
                    fs_1.copyFileSync(srcpath, destpath);
                }
            });
            //# Manage Data
            var ExtJsonData = JSON.parse(fs_1.readFileSync(paths.Extension.JsonFile).toString());
            var MyJsonData = JSON.parse(fs_1.readFileSync(paths.mydata.JsonFile).toString());
            //#CUSTOMIZE JSON
            var customize = JSON.parse(fs_1.readFileSync(paths.mydata.Customize).toString());
            for (const key in customize) {
                const value = customize[key];
                MyJsonData.folderNames[key] = value + "-fd";
                MyJsonData.folderNamesExpanded[key] = value + "-fdo";
            }
            for (const key in MyJsonData.iconDefinitions) {
                ExtJsonData.iconDefinitions[key] = MyJsonData.iconDefinitions[key];
            }
            for (const key in MyJsonData.folderNames) {
                ExtJsonData.folderNames[key] = MyJsonData.folderNames[key];
            }
            for (const key in MyJsonData.folderNamesExpanded) {
                ExtJsonData.folderNamesExpanded[key] = MyJsonData.folderNamesExpanded[key];
            }
            fs_1.writeFileSync(paths.Extension.JsonFile, JSON.stringify(ExtJsonData, null, " "));
        }
    });
});
