'use strict';
//todos los middlewares se deben llamar en la definicion de la aplicacion, donde se coloca todo lo que va a usar la aplicacion
const express = require('express'),
    pug = require('pug'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    morgan = require('morgan'),
    //_method es el nombre de la variable con que se enviar el metodo http desde la vista
    restFul = require('express-method-override')('_method'),
    errors = require('./middlewares/errors'),
    auth = require('./routes/auth-router'),
    routes = require('./routes/team-router'),
    favicon = require('serve-favicon')(`${__dirname}/public/favicon.png`),
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    optOptions = {
      secret:'shhhhh',
      // saveUninitialized destruye las sesiones cuando se cierra el navegador o se tumba el servidor desde la consola
      saveUninitialized: true,
      //resave mantiene las sesiones activas cuando se reinicia un modulo, ejemplo usando nodemon
      resave: true
    },
    port = (process.env.PORT || 3000);

let app = express();

app
  .set('views', viewDir)
  .set('view engine', 'pug')
  .set('port', port)
  .use(session(optOptions))
  //parsea el continido del request que venga del front end a formato json
  .use(bodyParser.json())
  // extended false permite recibir variables desde el front end
  .use(bodyParser.urlencoded({ extended: false }))
  .use(publicDir)
  .use(favicon)
  //dev es para que morgan haga los logs solo cuando la aplicacion esté en desarrollo
  .use(morgan('dev'))
  .use(restFul)
  .use(auth)
  .use(routes)
  .use(errors.http404);

module.exports = app;
