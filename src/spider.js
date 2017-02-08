/**
 * Created by panqianjin on 2017/2/7.
 */
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var items =[];
/**
 * 获取显示元素
 * */
function getContent($, domain,list) {
    $('#org-repositories .source').each(function (idx, element) {
        var $element = $(element),
            $title = $element.find('a[itemprop="name codeRepository"]'),
            $desc = $element.find('p[itemprop="description"]');
        var title = $title.text().replace(/(^\s*)|(\s*$)/g,"");
        //console.log(title);
        isValid(title,list) && (items.push({
            title: title,
            link: domain + $title.attr('href'),
            desc: $desc.text()
        }));
    });
    //console.log(items.length);
}
/**
 * 去除不满足条件的数据
 * */
function isValid(title,list){
   return list.indexOf(title) < 0;
}
function start(url, domain,list,callback,isEnd) {
    superagent.get(url)
        .end(function (err, sres) {
            if (err) {
                console.log(err);
                return;
            }
            var $ = cheerio.load(sres.text);
            getContent($, domain,list);
            isEnd && callback(items,items.length+'');
        })
}
function spider(url, domain, num,list,callback) {
    if(num > 0){
        for (var i = 1; i <num+1; i++) {
            var tUrl = url + '?page=' + i;
            var isEnd = i==num?true:false;
            start(tUrl, domain, list,callback,isEnd);
        }
    }else{
        callback('什么都没找到')
    }
}


module.exports = spider;



