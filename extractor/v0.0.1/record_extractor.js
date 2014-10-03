var fs = require('fs');
var request = require('request');

function RecordExt(identifier,path,url,callback){
    this.identifier = identifier;
    this.url = url;
    this.path = path;
    this.callback = callback;
}

RecordExt.prototype = {
    'storeRecord':
        function(path,data,identifier){
            identifier = identifier.slice(identifier.lastIndexOf(':')+1);
            
            identifier = identifier.replace('/','_');
            
            var filename = path + '/'+identifier;
            
            fs.writeFile(filename,data,function(err){
               if(err)
                    console.log('Problems writting '+filename);
                else
                    console.log('Successfully in writting '+filename);
            });
        },
    'getRecord':
        function(){
            var url = this.url;
            
            url+= 'verb=GetRecord&metadataPrefix=oai_dc&identifier='+this.identifier;
            
            var options = {
                'method': 'GET',
                'headers':{
                        'user-agent': 'Guto',
                        'accept': 'application/json',
                },
                'uri':url
            }
            
            var path = this.path;
            
            var aux = this;
            
            console.log(url);
            
            function callback(err,response,body){
                if(err)
                    console.log('Problems with '+url);
                else
                    aux.storeRecord(aux.path,body,aux.identifier);
                aux.callback(aux);
            }
            
            request(options,callback);
        }
    
}


module.exports = function(identifier,path,url,callback){
    var smth = new RecordExt(identifier,path,url,callback);
    
    return smth;
}


