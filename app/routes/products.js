module.exports = function(app){



	app.get('/produtos', function(req, res){
		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.list(function(err, results){
			res.render('products/list', {list: results});
		});
	});

	app.get('/cadastrar', function(req,res){
		res.render('products/form');
	})

	app.post('/produtos', function(req, res){

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		var product = req.body;
		productDAO.save(product, function(err, results){
			res.redirect('/produtos');
		});
	});
}
