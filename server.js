var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function (req, res) {
    var url = 'http://oringnet.com/en-global/products/index';
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body);
            var title = [];

            var json = {
                title
            };


            $('#sub_navi > li > a').each(function (index) {
                var data = $(this);

                title = data.text();

                json.title[index] = title;

            });

        };
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('File successfull');
        });
        res.send(json.title.forEach(function (index) {
            '<p>' + index + '</p><br>';
        }));
    });
});

app.listen('8081');

exports = module.exports = app;