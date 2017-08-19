'use strict';
const mysql = require('mysql'),
    conf = require('./db-conf'),
    dbOptions = {
        host: conf.mysql.host,
        user: conf.mysql.user,
        password: conf.mysql.password,
        port: conf.mysql.port,
        database: conf.mysql.database
    },
    conn = mysql.createConnection(dbOptions);

    conn.connect((err)=>{
        return (err)
            ? console.log(`Error al conectarse a mysql: ${err.stack}`) 
            : console.log(`Conexion establecida con mysql N° ${conn.threadId}`) 
    })

module.exports=conn;
