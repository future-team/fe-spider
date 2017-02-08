/**
 * Created by panqianjin on 2017/2/8.
 */
var express = require('express');
var spider = require('../src/spider');
var action = require('../src/action');
var app = express();
var url = 'https://github.com/future-team/',
    domain = 'https://github.com',
    path = 'data.json',
    list="eagle-ui";
/**
 * res callback
 * */
function callback(data){
    action(path,data);
}
var num =1;
app.get('/', function (req, res, next) {
    spider(url,domain,num,list,function(data){
        res.send(data);
        callback(data);
    });
});


app.listen(3000, function () {
    console.log('app is listening at port 3000');
});