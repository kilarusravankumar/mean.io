//Built in http module provides Http server ,client functionality
var http=require('http');

//Built in fs module provides filesystem related functionality
var fs=require('fs');

//Buit in path module provides file-system path- related functionality.
var path=require('path');

//ADD-on MIME module ability to drive a mime type extension file.
var mime=require('mime');

//Cache object whre content of cached files are stored.
var cache={};

var send404=function(response){
response.writeHead(404,{'content-Type':'text/plain'});
response.write('Error 404: resource not found.');
response.end();
}

var sendFile=function(response,filePath,fileContents){
    response.writeHead(200,{'content-Type':mime.lookup(path.basename(filePath))});
    response.end();
}

var serveStatic=function(response,cache,absPath){
if(cache[absPath]){//check if file cached memory
    sendFile(response,absPath,cache[absPath]);//serve file
}else{
    fs.exists(absPath,function(exists){//check if file exists
        if(exists){
            fs.readFile(absPath,function(err,data){//Read file from disk
                if(err){
                    send404(response);
                }else{
                    cache[absPath]=data;
                    sendFile(response,absPath,data);
}//serve file read from disk
            });
        }
        else{
            send404(response);
        }
    });
}


}

var server=http.createServer(function(req,res){
    var filepath=false;
    if(req.url=='/'){
        filePath='public/index.html';
}else{
    filepath='public'+req.url;
}
    var absPath='./'+filepath;
    serveStatic(res,cache,absPath);
});

server.listen(3000,function(){
    console.log("Server listening on port 3000")
});

var chatServer=require('lib/chatServer');
chatServer.listen(server);
