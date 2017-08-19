(function(doc,io){
	'use strict';
	var io =io(),
	chatForm = doc.querySelector('#chat-form'),
	messageText = doc.querySelector('#message-text'),
	chat = doc.querySelector('#chat');

	chatForm.onsubmit= function(e){
		//cuando se hace submit de un formulario, se actualiza automaticamente la pagina,
		//con esto se previene que se actualice
		e.preventDefault();
		io.emit('new message', messageText.value)
		//se coloca el value null para limpiar el input donde se escribe el mensaje despues de enviarlo
		messageText.value = null;
		//si algun navegador hace algo al darle submit al formulario, con esto se evita retornando false el submit
		return false;
	}

	io.on('new user', function(newUser){
		alert(newUser.message);
	})
	io.on('user says', function(userSays){
		//insertAdjacentHTML inserta un elemento html en el DOM, el primer paramatro es la posicion donde lo va a insertar
		//beforeend lo inserta despues del ultimo hijo, antes de que termine el elemento
		//el segundo parametro es el elemento que va a insertar
		chat.insertAdjacentHTML('beforeend','<li>'+userSays+'</li>')
	})
	io.on('bye bye user', function(byebyeUser){
		alert(byebyeUser.message);
	})

})(document,io)