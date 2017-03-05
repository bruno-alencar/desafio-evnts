module.exports = function(app){

	
		// var mongoose = require('mongoose');
		// mongoose.connect('mongodb://localhost/produto');
		// mongoose.Promise = global.Promise;

	app.get('/produtos', function(req, res){

		// product.name = 'teste';
		// product.description = 'teste';
		// product.price = '20.20';
		// dados = { name: 'teste01', description: 'teste', price: '10.10'};
		// var product = new Product();

		// product.save(function(err, data) {
		// 	if(err) {
		// 		console.log('ERRO: ', err);
		// 	}
		// 	console.log('Dados: ', data);
		// });

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.list(function(err, results){
			res.render('products/list', {list: results});
		});



		// mongoose.connection.close(function(){
		// 	console.log("mongoose closed");
		// 	process.exit(0);
		// })
		// res.render('products/list', {list: {}});

	});

	app.get('/cadastrar', function(req,res){
		res.render('products/form');
	})

	app.post('/produtos', function(req, res){

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		var product = req.body;
		console.log(product);

		productDAO.save(product, function(err, results){
			res.redirect('/produtos');
		});
	});
}
