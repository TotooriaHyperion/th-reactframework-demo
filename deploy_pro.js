/**
 * Created by Totooria Hyperion on 2016/10/18.
 */
"use strict";
const fs = require("fs");
let file = fs.readFileSync('./deploy_constants.js','utf-8');
let newFile = file.replace(/\{orderJSHost\}/,'productionserver/api/');
fs.writeFileSync('./constants/constants.js',newFile);