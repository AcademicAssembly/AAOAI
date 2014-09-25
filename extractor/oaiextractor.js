var request = require('request');
var xml2js = require('xml2js');
var fs = require('fs');
var listsets = require('./listsets');

var urlroot = process.argv[2];

var dirname = urlroot.slice(7,urlroot.indexOf('/oai'));

var algo = listsets(urlroot,dirname+'/');

fs.mkdir(dirname,function(err){
    if(err)
        console.log('failed to create folder');
    else
        algo.getListSets();
});



