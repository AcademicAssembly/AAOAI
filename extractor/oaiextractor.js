var request = require('request');
var xml2js = require('xml2js');
var fs = require('fs');
var list = require('./list_extractor');

var urlroot = process.argv[2];

var dirname = urlroot.slice(7);

dirname = dirname.slice(0,dirname.indexOf('/'));

function listRecords(arr, index,dirIdent){
    var set = arr[index];

    var params = {
        'type': 'ListIdentifiers',
        'params':{
            'verb': 'ListIdentifiers',
            'metadataPrefix':'oai_dc',
            'set': set.setSpec[0]
        },
        'set':{
            'setName': set.setName[0],
            'setSpec': set.setSpec[0]
        },
        'callback':function(smth){
            console.log('\t\t'+index+'\tDone extracting '+ set.setName[0]);
            /*if(index < arr.length-1)
                listRecords(arr,index+1,dirIdent);*/
        }
    };
    list(params,urlroot,dirIdent);
}

var callback = function(obj){
    var dirIdent = dirname+'/ListIdentifiers';
        
    fs.mkdir(dirIdent,function(err){
       if(err)
           console.log('Problems creating '+dirIdent);
        else{
            console.log('Sucessful creating '+dirIdent);
            
            var arr = obj.res;
            for(var i in arr)
                listRecords(arr,i,dirIdent);
        }
    });
    
}

var obj = {
    type: 'ListSets',
    params:{
        verb:'ListSets'
    },
    'callback': callback
};

console.log(dirname);

fs.mkdir(dirname,function(err){
    if(err)
        console.log('failed to create folder');
    else{
        console.log('Success creating '+ dirname);
        var setExt = list(obj,urlroot,dirname);
    }
});



