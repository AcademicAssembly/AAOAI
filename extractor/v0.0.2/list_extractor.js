/*
    Author: Carlos Pinto Machado
    Date: 3 / 10 /2014
    Description: A general purpose extractor of OAI-PMH elements,which may have resumption tokens.
*/

var fs = require('fs'); // required for file operations
var request = require('request'); // required for xhr operations
var xml2js = require('xml2js');// required for xml parsing and search of resumption token


function List_ext(params,url,path,callback){
    this.params = params; // params of requests, verb is the one that is established
    this.url = url; // url of oai directory , e.g. run.unl.pt/oai/request?
    this.path = path; // path of folder to store info
    this.callback = callback;
    this.num = 0;
}


List_ext.prototype = {
    'storeList':
        function(data,index){
            var filename = this.path + '/'+this.params.verb;
            if(index > 0)
                filename += '_'+index;
            filename +='.xml';
            fs.writeFile(filename,data,function(err){
                if(err)
                    console.log('Problems writting '+filename);
                else
                    console.log('Successful writting '+filename); 
            });
        },
    'getList':
        function(){
            var url = this.url;
            var params = this.params;
            var path = this.path;
            
            for(var i in params){
                if(i != 'verb')
                    url+= '&';
                url+=i +'='+encodeURIComponent(params[i]);
            }
            
            
            var options = {
                'method': 'GET',
                'headers':{
                    'user-agent': 'Guto', // parameters required for certain repo's
                    'accept': 'application/json'
                },
                'uri':url
            };
            
            var aux = this;
            
            function callback(err,response,body){
                if(err)
                    console.log('Problem with '+url);
                else{
                    var parser = xml2js.Parser();
                    
                    parser.parseString(body,function(err,res){
                        if(err)
                            console.log('Problem parsing the xml');
                        else{
                            var elem = res['OAI-PMH'];
                            
                            if(!('error' in elem)){ // if it isn't there
                                elem = elem[aux.params.verb][0];
                                console.log(aux.num+'\t\tJust got a file from '+aux.params.verb);
                                
                                aux.storeList(body,aux.num);
                                aux.num++;
                                
                                if('resumptionToken' in elem && '_' in elem['resumptionToken'][0]){
                                    for(var i in aux.params)
                                        if(i != 'verb')
                                            delete aux.params[i];
                                    aux.params['resumptionToken'] = elem['resumptionToken'][0]['_'];
                                    aux.getList();
                                }
                                else
                                    aux.callback(aux);
                            }
                            else
                                aux.callback(aux);
                        }
                    });
                }
            }
            
            request(options,callback);
        }
    
};

module.exports = function(params,url,path,callback){
    var a = new List_ext(params,url,path,callback);
    return a;
};
