/**
 * Created by panqianjin on 2017/2/8.
 */
var fs =require('fs'),
    path = require('path');
function writeFile(path,data){
    fs.writeFile(path,JSON.stringify(data))
}
module.exports = writeFile;