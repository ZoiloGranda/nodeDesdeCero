'use strict';

const express = require('express'),
app = express(),
http = require('http').createServer(app),
//a socket io hay que pasarle la variable que levanta el servidor, no la variable de la aplicacion
io = require('socket.io')(http),
//process es el proceso donde corre node
port = process.env.PORT||3000,
publicDir = express.static(`${__dirname}/public`);

app
	.use(publicDir)
	.get('/', (req,res)=>res.sendFile(`${publicDir}/index.html`));
//%d  sirve para imprimir numeros en consola, es reemplazado por el valor de port
http.listen(port,()=>console.log('Iniciando express y socket.io en localhost:%d',port));

io.on('connection',(socket)=>{
	socket.broadcast.emit('new user', {message: 'Ha entrado un usuario al chat'})
	socket.on('new message', message=>io.emit('user says', message))
	socket.on('disconnect',()=>{
		console.log('ha salido un usuario del chat');
		socket.broadcast.emit('bye bye user',{ message: 'ha salido un usuario del chat'})
	})
})