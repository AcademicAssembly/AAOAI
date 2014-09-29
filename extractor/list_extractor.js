var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');

function ListExt(obj,url,path){
    this.url = url;
    this.obj = obj;
    
    if(obj.type != 'ListSets')
        path+= '/'+obj.set.setName;
    else
        path = path +'/'+obj.type;
    
    var aux = this;
    
    fs.mkdir(path,function(err){
        if(err)
            console.log('Problems creating folder '+path);
        else
            console.log('Success creating folder '+ path);
        aux.getList();
    });
    this.path = path;
    this.num = 0;
    this.res = [];
}



ListExt.prototype = {
    'storeList':
        function (path,data,index){
            var filename = path +'/list'+index+'.xml';
            var aux = this;
            
            fs.writeFile(filename,data,function(err){
                if(err)
                    console.log('Problems writting '+filename);
                else
                    console.log('Success writting '+ filename);
            });
        },
    
    'getList':
        function(){
            if('params' in this.obj){
                var url = this.url;
                
                for(var i in this.obj.params)
                    url += i + '=' + encodeURIComponent(this.obj.params[i])+'&';
                url = url.slice(0,url.length - 1);
                console.log(url);
                
                var options = {
                    'method': 'GET',
                    'headers':{
                        'user-agent': 'Guto',
                        'accept': 'application/json',
                    },
                    'uri': url
                };
                var path = this.path;
                var index = this.num;
                var storeList = this.storeList;
                var aux = this;
                
                function callback(err,response,body){
                    if(err)
                        console.log('Problems with '+url);
                    else{
                        var parser = xml2js.Parser();
                        
                        parser.parseString(body,function(err,res){
                            if(err)
                                console.log('Problem parsing '+ url);
                            else{
                                var list = res['OAI-PMH'];
                                
                                if(list && aux.obj.type in list){
                                    list = list[aux.obj.type][0];
                                    
                                    storeList(path,body,index);
                                    aux.num++;
                                    
                                    if(aux.obj.type === 'ListSets')
                                        aux.res = aux.res.concat(list.set);
                                    else
                                        aux.res = aux.res.concat(list.header);

                                    if('resumptionToken' in list && '_' in list['resumptionToken'][0]){
                                        aux.obj.params['resumptionToken'] = list['resumptionToken'][0]['_'];
                                        for(var i in aux.obj.params)
                                            if(i != 'verb' && i != 'resumptionToken')
                                                delete aux.obj.params[i];
                                        aux.getList();
                                    }
                                    else
                                        aux.obj.callback(aux);
                                }
                                else{
                                    console.log(url + ' returned nill');
                                    aux.obj.callback(aux);
                                }
                            }
                        });
                    }
                }
                
                request(options,callback);
            }
            else
                console.log('Error lacking parameters');
        }
};

module.exports = function (obj,url,path){
    var res = new ListExt(obj,url,path);
    
    return res;
}

