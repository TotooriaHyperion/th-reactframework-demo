/**
 * Created by Totooria Hyperion on 2016/8/22.
 */

"use strict";

const fs = require("fs");
const path = require("path");

console.log(process.argv);

let data = fs.readFileSync(path.join(__dirname,"/log/" + process.argv[2]),"utf-8");

data = data.split(",,,").concat(",");

data = data.slice(0,-2);

data = "[" + data + "]";

console.log(data);

console.log(JSON.parse(data));