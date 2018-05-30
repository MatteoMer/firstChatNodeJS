// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: mmervoye <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/05/25 16:06:17 by mmervoye          #+#    #+#             //
//   Updated: 2018/05/30 19:02:08 by mmervoye         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pseudos = [];

server.listen(1234);

app.use('/public', express.static('public'))
.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.on('pseudo', function (pseudo){
		socket.pseudo = pseudo;
		socket.broadcast.emit('join', socket.pseudo);
		socket.emit('join', socket.pseudo);
	});
	socket.on('message', function (message){
		if (message !== ""){
			let msg = '<div class="msg"><p><strong>' + socket.pseudo + '</strong>: ' + message + '</p></div>';
			socket.broadcast.emit('msg', msg);
			socket.emit('msg', msg);
		}
	});
});
