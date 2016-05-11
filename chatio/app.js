var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);
usernames =[];

server.listen(process.env.PORT || 3000);  //we are pushing this app to heroku so we need to have port as variable
//locally we are using 3000 
// heroku will use process.env.PORT


app.get('/',function(req, res){
       
       res.sendFile(__dirname+ '/index.html');
});

io.sockets.on('connection',function(socket){
   
   //new event 
   socket.on('new user',function(data, callback){
      
       if(usernames.indexOf(data)!=-1){
       	callback(false);
       }
       else
       {
       	callback(true);
       	socket.username = data;
       	usernames.push(socket.username);
        updateUsernames();
       }
  
   });

    // update username
    function updateUsernames(){
    	io.socket.emit('usernames',usernames);
    }




   //send message event
   socket.on('send message',function(data){
   	io.sockets.emit('new message', {msg: data, user: socket.username});
   });
 

     //for diconnecting 
     socket.on('disconnect',function(data){
     	if(!socket.username) return;
     	username.splice(usernames.indexOf(socket.username),1);
     	updateUsernames();
     })

});

