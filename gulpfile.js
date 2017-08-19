'use strict';
const gulp = require ('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var svgmin = require('gulp-svgmin');
var webp = require('gulp-webp');
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var dir = {
//aqui en el objeto dir se guardan las direcciones de las carpetas principales del proyecto,
//asi si se cambia el nombre o la direccion de una carpeta nada mas hay que cambiarle el nombre
//en este objeto
  src: 'src',
  dist: 'dist',
  nm: 'node_modules'
};
var files = {
//${} son template strings de es6
  CSS: [
    `${dir.nm}/animate.css/animate.min.css`,
    `${dir.nm}/font-awesome/css/font-awesome.min.css`,
    `${dir.nm}/responsimple/responsimple.min.css`,
    `${dir.nm}/owl.carousel/dist/assets/owl.carousel.min.css`,
    `${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,
    `${dir.dist}/css/estilos.css`
  ],
//nombre con que se va a guardar el archivo css minificado
  mCSS: 'estilos.min.css',
  JS: [
    `${dir.nm}/jquery/dist/jquery.min.js`,
    `${dir.nm}/owl.carousel/dist/owl.carousel.min.js`,
    `${dir.nm}/wowjs/dist/wow.min.js`,
    `${dir.dist}/js/codigos.js`
  ],
//archivo js minificado generado con todos los archivos js del proyecto
  mJS: 'codigos.min.js',
  fonts: [
    `${dir.nm}/font-awesome/fonts/*.*`
  ],
  statics: [
    `${dir.src}/humans.txt`,
    `${dir.src}/sitemap.xml`
  ]
};

//en este objeto opts se guardan las opciones de las distintas librerias
//se hace asi para mantener todas las opciones configurables en un solo lugar
var opts = {
  pug: {
//pretty true para no minificar el codigo
    pretty: true,
//locals son las variables que pasa node a pug, o sea a la vista
    locals: {
      title: 'Maraton',
//en files pasa todos los archivos css, js, etc, para cargalos mas facil en la vista
      files: files
    }
  },
  sass: {
//compressed genera el css minificado
    outputStyle: 'compressed'
  },
//opciones de babel, para que procese usando es5
  es6:{
    "presets": ["es2015"],
    "env": {
      "production": {
        "presets": ["babili"]
      }
    }
  },
//opciones para optimizar imagenes
  imagemin:{
    progressive: true,
    use: [pngquant()]
  },
  svgmin:{
    plugins:[
      {convertColors: false}
    ]
  },
  uncss:{
    //directorio donde estan los archivos html, a los que les va a leer los selectores usados
    html:[`${dir.dist}/*.html`]
  },
  autoprefixer:{
    //compatibilidad con las ultimas 5 versiones de los navegadores
    browsers: ['last 5 versions'],
    cascade: false
  },
  htmlmin:{
    collapseWhitespace:true
  }
};
//'pug' es el nombre de la tarea que se esta automatizando con gulp, en la consola para ejecutarlo se usa
// gulp pug
gulp.task('pug',()=>{
  gulp
//src de donde se obtienen los recursos de gulp, aqui se coloca la carpeta donde estan los
//archivos .pug que se compilan a html. para esto se usa gulp-pug
    .src(`${dir.src}/pug/*.pug`)
    .pipe(pug(opts.pug))
//carpeta de destino donde se van a guardar los archivos ya procesados
    .pipe(gulp.dest(dir.dist));
});
//tarea de gulp para procesar los archivos scss, y convertirlos en archivos css
//para esto se usa node-sass y gulp-sass
gulp.task('sass',()=>{
  gulp
    .src(`${dir.src}/scss/*.scss`)
    .pipe(sass(opts.sass))
    .pipe(gulp.dest(`${dir.dist}/css`));
});
//tarea para convertir javascript es6 en javascript es5, compatible con mas navegadores
//para esto se usa babel
gulp.task('es6',()=>{
  gulp
    .src(`${dir.src}/es6/*.js`)
    .pipe(babel(opts.es6))
    .pipe(gulp.dest(`${dir.dist}/js`));
});
//tarea para optimizar imagenes
gulp.task('img', ()=>{
  gulp
    .src(`${dir.src}/img/**/*.+(png|jpeg|jpg|gif)`)
    .pipe(imagemin(opts.imagemin))
    .pipe(gulp.dest(`${dir.dist}/img`));
});
//optimizar svgs
gulp.task('svg',()=>{
  gulp
    .src(`${dir.src}/img/svg/*.svg`)
    .pipe(svgmin(opts.svgmin))
    .pipe(gulp.dest(`${dir.dist}/img/svg`));
});
//tarea para convertir a webp los formatos png, jpg y jpeg
gulp.task('webp',()=>{
  gulp
    .src(`${dir.src}/img/*.+(png|jpg|jpeg)`)
    .pipe(webp())
    .pipe(gulp.dest(`${dir.dist}/img/webp`));
});
//a las fonts no se les modifica nada, solamente se mueven de la carpeta de desarrollo, a la carpeta de
//produccion
gulp.task('fonts',()=>{
  gulp
    .src(files.fonts)
    .pipe(gulp.dest(`${dir.dist}/fonts`));
});
//a los archivos estaticos no se les modifica nada, solamente se mueven de la carpeta de desarrollo
//a la carpeta de produccion
gulp.task('statics', ()=>{
  gulp
    .src(files.statics)
    .pipe(gulp.dest(dir.dist));
});
//tarea para crear un solo archivo css y eliminar todos los selectores no usados
gulp.task('css', ()=>{
  gulp
    .src(files.CSS)
    //concat concatena (une) los archivos del src, y los guarda en un solo archivo en files.mCSS
    .pipe(concat(files.mCSS))
    //uncss elimina los selectores no usados en las librerias css
    .pipe(uncss(opts.uncss))
    // autoprefixer coloca los prefijos de cada navegador para las configuraciones no compatibles
    .pipe(autoprefixer(opts.autoprefixer))
    //cleancss minifica el archivo css final
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${dir.dist}/css`))
});
gulp.task('js',()=>{
  gulp
    .src(files.JS)
    //concat concatena (une) los archivos del src, y los guarda en un solo archivo en files.mJS
    .pipe(concat(files.mJS))
    //minificar JS
    //.pipe(uglify())
    .pipe(gulp.dest(`${dir.dist}/js`));
});
gulp.task('html',()=>{
  gulp
    .src(`${dir.dist}/*.html`)
    //useref sirve para cambiar las referencias de las etiquetas link y script, a los archivos css y js
    //minificados que se generan a partir de los demas archivos
    //hay que colocar unos comentarios en el archivo html para que funcione bien
    .pipe(useref())
    .pipe(htmlmin(opts.htmlmin))
    .pipe(gulp.dest(dir.dist))
})
