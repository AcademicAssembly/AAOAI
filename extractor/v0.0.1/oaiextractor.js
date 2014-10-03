var request = require('request');
var xml2js = require('xml2js');
var fs = require('fs');
var list = require('./list_extractor');
var record = require('./record_extractor');

var urlroot = process.argv[2];

var dirname = urlroot.slice(7);

dirname = dirname.slice(0,dirname.indexOf('/'));

var allFails = [];

var records = [];

function getEachRecord(arr,index, path,obj){
    var callback = function(){
        if(index+1 < arr.length){
            console.log('index '+index+'/'+arr.length);
            getEachRecord(arr,index+1,path,obj);
        }
        else{
            console.log('\n\n\t\t'+(obj.index-1)+' Done extracting records from '+obj.name+'\n'+(obj.index-1)+'/'+records.length+'\n');
            if(records.length > obj.index)
                getRepoRecords(records,obj.index,obj.path);
            else
                console.log('Extracted all of it');
        }
    }
    var elem = arr[index];
    var aux = record(elem,path,urlroot,callback);
    aux.getRecord();
}

function getRepoRecords(arr,index,path){
    var elem = arr[index];
    var direc = path+'/'+elem.name;
    
    fs.mkdir(direc,function(err){
       if(err)
           console.log('Failed to create '+direc);
        else{
            console.log('\n\t\tCreated '+direc+' and starting to extract records\n');
            getEachRecord(elem.identifiers,0,direc,{'path':path,'index':index+1,'name':elem.name});
        }
    });
}

function getAllRecords(path){
    console.log('Successfull creating '+path);
    
    getRepoRecords(records,0,path);
}

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
            console.log('\n\t\t'+index+'\tDone extracting List of Identifiers from '+ set.setName[0]+'\n');
            if(smth.fail)
                allFails.push(smth.smth);
            if('name' in smth.res)
                records.push(smth.res);
            index++;
            if(index < arr.length)
                listRecords(arr,index,dirIdent);
            else{
                console.log('Number of fails: '+allFails.length);
                fs.writeFile('fails',JSON.stringify(allFails),function(err){
                    if(err)
                        console.log('Failed to write fails');
                    var recordDir = dirname+'/Records';
                    fs.mkdir(recordDir,function(err){
                       if(err)
                           console.log('\n\n\t\tFailed to create Records \n\n');
                        else
                            getAllRecords(recordDir);
                    });
                });
            }
        }
    };
    list(params,urlroot,dirIdent);
}

var callback = function(obj){
    var dirIdent = dirname+'/ListIdentifiers';
    console.log('\nDone extracting ListSets\n');    
    fs.mkdir(dirIdent,function(err){
       if(err)
           console.log('Problems creating '+dirIdent);
        else{
            console.log('Sucessful creating '+dirIdent);
            
            var arr = obj.res;
            
            listRecords(arr,0,dirIdent);
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



