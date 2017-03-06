var mongoose = require('mongoose');
var host = 'mongodb://localhost/produto'


function createDBConnection(){

	if(!process.env.NODE_ENV){
		var host = 'mongodb://localhost/produto'
		mongoose.connect(host);
		var db = mongoose.connection;

		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			// console.log("mongoose conectado");
		});
	}

	if(process.env.NODE_ENV == 'test'){

		var host = 'mongodb://localhost/produto_test'
		mongoose.connect(host);
		var db = mongoose.connection;

		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			// console.log("mongoose conectado");
		});

		
	}
	return mongoose;
}

module.exports = function(){
	return createDBConnection;
}