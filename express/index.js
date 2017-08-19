'use strict';

const express= require('express'),
  app = express();

app
  .get('/',(req,res)=>{
    res.end('<h1>homa lmundo desde express</h1>')
  })
  .listen(3000, ()=>{
    console.log('iniciando express en el puerto 3000');
  });
