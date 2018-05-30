var socket = io.connect('http://localhost:1234');
var inputPseudo = document.getElementById('inputUser');
var chatInput = document.getElementById('chatInput');
var pseudo;

inputPseudo.addEventListener('keyup', function (event) {
	event.preventDefault();
	if (event.keyCode === 13){
		launchPseudo();
	}
});

chatInput.addEventListener('keyup', function (event) {
	event.preventDefault();
	if (event.keyCode === 13){
		socket.emit('message', chatInput.value);
		chatInput.value = "";
	}
});

function launchPseudo() {
	pseudo = document.getElementById('inputUser').value;
	if (pseudo !== ""){
		document.getElementById('pseudo-input').innerHTML = "";
		document.getElementById('bonjour').innerHTML= 'Bonjour ' + pseudo + ' ! N\'hesite pas a participer sur le chat!';
		chatInput.disabled = false;
		chatInput.placeholder = "Votre message...";
		socket.emit('pseudo', pseudo);
	}
};

socket.on('join', function (pseudo) {
	document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + '<div class="join-msg"><p>' + pseudo + ' a rejoint le serveur !</p></div>';
});

socket.on('msg', function (msg) {
	document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + msg;
});
