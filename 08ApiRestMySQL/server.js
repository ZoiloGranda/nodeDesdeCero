'use strict';
const app = require('./app'),
//se levanta la app en el puerto designado en la variable port
//app.get es un metodo de express para obtener el valor de las variables de configuracion de express
server = 
app.listen(app.get('port'), () => 
	console.log(`Iniciando API Rest MVC Express con MYSQL en el puerto ${app.get('port')}`))