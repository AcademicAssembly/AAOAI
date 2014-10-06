/*
    author: Carlos Pinto Machado
    date: 6 / 10 /2014
*/

var fs = require('fs'); // to create directories
var list_ext = require('./list_extractor'); // extractor of elements

var num = 0;

var begins = new Date();

function timeTest(){
    var ends = new Date();
    
    var seconds = ends.getSeconds() - begins.getSeconds();
    
    var minutes = ends.getMinutes() - begins.getMinutes();
    
    if(seconds < 0){
        seconds+=60;
        minutes++;
    }
    
    if(minutes < 0)
        minutes += 60;
    console.log('It took '+minutes+'m '+seconds + 's\n');
}

function getMetaPre(url,dirname){
    var options = {
        'verb':'ListMetadataFormats',
    };
    
    function callback(obj){
        console.log('\nListMetadataFormats completed and extracted '+obj.num+'\n');
        
        num++; 
        
        if(num > 4)
            timeTest();
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
        console.log('\nListRecords completed and extracted '+obj.num+'\n');
        
        num++; 
        
        if(num > 4)
            timeTest();
    }
    
    var folder = dirname+'/ListRecords';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else{
            list_ext(options,url,folder,callback).getList();    
            getMetaPre(url,dirname);
        }
    });
}

function getIdentifiers(url,dirname){
    var options = {
        'verb':'ListIdentifiers',
        'metadataPrefix':'oai_dc'
    };
    
    function callback(obj){
        console.log('\nListIdentifiers completed and extracted '+obj.num+'\n');
        
        num++; 
        
        if(num > 4)
            timeTest();
    }
    
    var folder = dirname+'/ListIdentifiers';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else{
            list_ext(options,url,folder,callback).getList();    
            getRecords(url,dirname);
        }
    });
}


function getListSets(url,dirname){
    var options = {
        'verb':'ListSets'
    };
    
    function callback(obj){
        console.log('\nListSets completed and extracted '+obj.num+'\n');
        
        num++; 
        
        if(num > 4)
            timeTest();
    }
    
    var folder = dirname+'/ListSets';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else{
            list_ext(options,url,folder,callback).getList();
            getIdentifiers(url,dirname);
        }    
    });
}

function identify(url,dirname){
    var options = {
        'verb':'Identify'
    };
    
    function callback(obj){
        console.log('\nIdentify completed and extracted '+obj.num+'\n');
        
        num++;
        
        if(num > 4)
            timeTest();
    }
    
    var folder = dirname+'/Identify';
    
    fs.mkdir(folder,function(err){
       if(err)
           console.log('Problems creating '+folder);
        else{
            list_ext(options,url,folder,callback).getList();
            getListSets(url,dirname);
        }    
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

