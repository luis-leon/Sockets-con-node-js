var express = require ('express');
var app= express();
var server= require('http').Server(app);
var io= require('socket.io')(server);
var mensajes=[{
  id:1,
  text: "Bienvenido al sitio",
  author:"luis"

}];

app.use(express.static("public"));

app.get('/hello',function(req,res){
  res.status(200).send("hola mundo");
});

io.on("connection",function(socket){
    console.log("alguien se ha conectado con sockets");
    socket.emit("messages",mensajes);

      socket.on('new_message',function (data){
        mensajes.push(data);

        io.sockets.emit('messages',mensajes);
      });
    });


server.listen(3002, function(){
    console.log("servidor corriendo en http:/localhost:3002");
});
