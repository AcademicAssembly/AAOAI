
var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');


function ListSets(url,path){
    this.url = url+'/request?verb=ListSets';
    this.path = path;
    this.ready = false;
    this.num = 0;
};

ListSets.prototype = {
    'storeListSets': function(data,index){
        var filename = this.path + '/set'+index+'.xml';
        fs.writeFile(filename,data,function(err){
            if(err)
                console.log('Problems writing');
            else
                console.log('Success writting '+filename);
        });
    },
    'getTheRest': function(options,token){
        options['uri'] = this.url + '&resumptionToken='+token;
        var aux = this;
        console.log(options.uri);
        function callback(err,response,body){
            if(err)
                console.log('Problems getting List Sets number '+aux.num);
            else{
                aux.storeListSets(body,aux.num);
                var parser = xml2js.Parser();
                
                parser.parseString(body,function(err,res){
                    if(err)
                        console.log('Problems parsing List Set');
                    else{
                        var ListSets = res['OAI-PMH']['ListSets'][0];
                        if('resumptionToken' in ListSets && '_' in ListSets['resumptionToken'][0])
                            aux.getTheRest(aux.options,ListSets['resumptionToken'][0]['_']);
                        else
                            aux.ready = true;
                        aux.num++;
                    }
                });
            }    
        }
        
        request(options,callback);
    },
    'getListSets': function(){
        var options = {
            'method': 'GET',
            'headers':{
                'user-agent': 'Guto',
                'accept': 'application/json',
            },
            'uri': this.url
        };
        
        this.options = options;
        var aux = this;
        console.log(options.uri);
        
        function callback(err,response,body){
            if(err)
                console.log('Problems getting List Sets number '+aux.num);
            else{
                aux.storeListSets(body,aux.num);
                
                var parser = xml2js.Parser();
                
                parser.parseString(body,function(err,res){
                    if(err)
                        console.log('Problems parsing List Set');
                    else{
                        var ListSets = res['OAI-PMH']['ListSets'][0];
                        if('resumptionToken' in ListSets && '_' in ListSets['resumptionToken'][0])
                            aux.getTheRest(aux.options,ListSets['resumptionToken'][0]['_']);
                        else
                            aux.ready = true;
                        aux.num++;
                    }
                });
            }    
        }
        request(options,callback);
    }
    
};

module.exports = function(url,path){
    var obj = new ListSets(url,path);
    return obj;
    
};
