'use strict';
const http = require('http').createServer(server),
  fs = require('fs'),
  //a socketio se le pasa como argumento la instancia del servidor
  io = require('socket.io')(http)

let conexions = 0;

function server(req, res) {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      return res.end('<h1>Error Interno del Servidor</h1>')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(data, 'utf-8')
    }
  })
}

http.listen(3000, () => console.log('servidor corriendo en localhost 3000'));

//connection es el evento cuando se conecta el socket por primera vez en el servidor
//socket es el objeto donde esta toda la funcionalidad de la librea socsket.io
io.on('connection', (socket) => {
  //emit emite un mensaje a todos los clientes, iincluyendo al que lo envia
  //hello no es el mensaje, hello es el nombre del evento que se va a correr cuando haya una connection
  socket.emit('hello', { message: 'hola mundo con socket io' });
  //el servidor puede recibir eventos del cliente con datos
  socket.on('otroevento', data => console.log(data));
  conexions++;
  console.log(`conexiones: ${conexions}`);
  socket.emit('connect users', { numbers: conexions });
  //broadcast emite el evento a todos los usuarios conectados, excepto al mismo que lo envió
  socket.broadcast.emit('connect users', { numbers: conexions });
  //disconnect es cuando se desconecta un cliente
  socket.on('disconnect', () => {
    conexions--;
    console.log(`conexiones despues del disconnect: ${conexions}`);
    socket.broadcast.emit('disconnectusers', { numbers: conexions });

    console.log('ya lo emiti');
  })
});
