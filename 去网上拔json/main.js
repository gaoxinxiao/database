//cheerio http爬虫 为服务特定制的 快速 灵活实施的jquery核心实现的
//1.下载 + 引入
const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');

// const $ = cheerio.load('<h1 class="title">hello world</h1>');
// // $('h1').addClass('tit2');
// // $('h1').text('hello');
// // console.log($.html());

// http.request('http://www.baidu.com:80', res => {
//     let data = '';
//     res.on('data', chunk => {
//         data += chunk;
//     }); 
//     res.on('end', () => {
//         const $ = cheerio.load(data);
//         console.log($('.mnav').text());
//     })
// }).end();

http.get('http://www.kugou.com:80/yy/html/rank.html', res =>{
    let data = '';
    let songlist = {};
    let arr = [];
    res.on('data', chunk => {
        arr.push(chunk);
    });
    res.on('end', () => {
        const buf = Buffer.concat(arr);
        const $ = cheerio.load(buf.toString()); 
        $('.pc_temp_songlist > ul > li > a').each(function () {   
            songlist[$(this).text()] = $(this).attr('href');                 
        })  
        fs.writeFileSync('./data.json',JSON.stringify(songlist));     
    })
});
// const buf1 = new Buffer('hello');
// const buf2 = new Buffer('world');
// const buf3 = Buffer.concat([buf1,buf2]);
// console.log(buf3.toString());