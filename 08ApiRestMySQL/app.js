'use strict';

const express = require('express'),
    pug = require('pug'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    //_method es el nombre de la variable con que se enviar el metodo http desde la vista
    restFul = require('express-method-override')('_method'),
    routes = require('./routes/team-router'),
    favicon = require('serve-favicon')(`${__dirname}/public/favicon.png`),
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000);

let app = express();

app
  .set('views', viewDir)
  .set('view engine', 'pug')
  .set('port', port)
  //parsea el continido del request que venga del front end a formato json
  .use(bodyParser.json())
  // extended false permite recibir variables desde el front end
  .use(bodyParser.urlencoded({ extended: false }))
  .use(publicDir)
  .use(favicon)
  //dev es para que morgan haga los logs solo cuando la aplicacion esté en desarrollo
  .use(morgan('dev'))
  .use(restFul)
  .use(routes);

module.exports = app;
