'use strict';

const express= require('express'),
  app = express();

app
  .get('/',(req,res)=>res.end('<h1>homa mundo desde express</h1>'))
  .get('/user/:id-:name-:age',(req,res)=>{
  	//http://localhost:3000/user/123ids2a-Zoilo-27
	  res.end(`<h1>${req.params.name}, bienvenido a express tu id es <b>${req.params.id}</b> y tienes ${req.params.age} a&ntilde;os</h1>`)
  })
  .get('/search', (req,res)=>{
    //http://localhost:3000/search?s=node
		res.end(`<h1> bienvenido a express, los resultado de tu busqueda son <mark>${req.query.s}</mark></h1>`)
	})
  .listen(3000, ()=>console.log('Iniciando express en el puerto 3000'))

