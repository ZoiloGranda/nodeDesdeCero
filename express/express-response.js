'use strict';

const express= require('express'),
  app = express();

app
  .get('/',(req,res)=>{
  	res.send('<h1>hola mundo desde express</h1>')
  	})
  .get('/ed',(req,res)=>{
  	res.redirect(301, 'http://escuela.digital');
  })
  .get('/json', (req,res)=>{
		res.json({
			name: "Zoilo",
			age: 27,
			alias:"MasterArepa"
		})
	})
	 .get('/render', (req,res)=>{
		 //no funciona porque hay que consigurar el view engine, eso lo vemos mas adelante
		 res.render(`${__dirname}/index.html`);
	})
  .listen(3000, ()=>console.log('Iniciando express en el puerto 3000'))

