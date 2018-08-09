# Add More Customization For VSCODE
this patcher update vscode-icons extension for visual studio code

for support material colorized folders

## to use 

1. first install vscode-icons extension
2. install npm
3. run ext-launcher.cmd in root folder
4. reload **visual studio code** or **visual studio code insiders** for changes

##  add your colors and keywords

to add your colors and keywords

inside *extension/Generate*  find *Folder-customize-colors.json*
and add your keywords

```json
{
"yourfoldername":"color-digit"
}
```

like
```json
{
"greenfolder":"green-500",
"redfolder":"red-500"
}
```

