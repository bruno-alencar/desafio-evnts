var mongoose = require('mongoose');
var host = 'mongodb://localhost/produto'


function createDBConnection(){
	mongoose.connect(host);
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log("mongoose conectado");
	});

	return mongoose;
}

module.exports = function(){
	return createDBConnection;
}