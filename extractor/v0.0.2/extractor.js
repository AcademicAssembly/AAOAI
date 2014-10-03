/*
    author: Carlos Pinto Machado
    date: 3 / 10 /2014
*/

var fs = require('fs'); // to create directories
var list_ext = require('./list_extractor'); // extractor of elements

function getMetaPre(url,dirname){
    var options = {
        'verb':'ListMetadataFormats',
    };
    
    function callback(obj){
        console.log('ListMetadataFormats completed');
    }
    
    var folder = dirname+'/ListMetadataFormats';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else
            list_ext(options,url,folder,callback).getList();    
    });
}

function getRecords(url,dirname){
    var options = {
        'verb':'ListRecords',
        'metadataPrefix':'oai_dc'
    };
    
    function callback(obj){
        console.log('ListRecords completed');
        getMetaPre(url,dirname);
    }
    
    var folder = dirname+'/ListRecords';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else
            list_ext(options,url,folder,callback).getList();    
    });
}

function getIdentifiers(url,dirname){
    var options = {
        'verb':'ListIdentifiers',
        'metadataPrefix':'oai_dc'
    };
    
    function callback(obj){
        console.log('ListIdentifiers completed');
        getRecords(url,dirname);
    }
    
    var folder = dirname+'/ListIdentifiers';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else
            list_ext(options,url,folder,callback).getList();    
    });
}


function getListSets(url,dirname){
    var options = {
        'verb':'ListSets'
    };
    
    function callback(obj){
        console.log('ListSets completed');
        getIdentifiers(url,dirname);
    }
    
    var folder = dirname+'/ListSets';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else
            list_ext(options,url,folder,callback).getList();    
    });
}

function identify(url,dirname){
    var options = {
        'verb':'Identify'
    };
    
    function callback(obj){
        console.log('Identify completed');
        getListSets(url,dirname);
    }
    
    var folder = dirname+'/Identify';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else
            list_ext(options,url,folder,callback).getList();    
    });
}

function extract(url,dirname){
    fs.mkdir(dirname,function(err){
        if(err)
            console.log('Problems creating '+dirname);
        else
            identify(url,dirname);
    });
}

var url = process.argv[2];

var dirname = './'+process.argv[3];

extract(url,dirname);

