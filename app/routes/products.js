module.exports = function(app){

	app.get('/produtos', function(req, res, next){
		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.list(function(err, results){
			if(err){
				return next(err);
			}

			res.format({
				html: function(){
					res.render('products/list', {list: results});
				},
				json: function(){
					res.json(results);
				}
			})
		});

		mongoose.connection.close();
	});

	app.get('/produtos/:category', function(req,res){

		var category = req.params.category;

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.listByCategory(category, function(err, results){
			res.format({
				html: function(){
					res.render('products/list', {list: results});
				},
				json: function(){
					res.json(results);
				}
			})
		});

		mongoose.connection.close();
	});

	app.get('/cadastrar', function(req,res){
		res.render('products/form', {validationErrors:{}, product:{}});
	})

	app.post('/produtos', function(req, res){
		
		var product = req.body;

		req.assert('name', 'O nome é obrigatório').notEmpty();
		req.assert('price', 'Preço é obrigatório, formato inválido (ex: 22.22) e maior que 0').isFloat();
		req.assert('category', 'A categoria é obrigatória').notEmpty();
		req.assert('description', 'A descrição é obrigatória').notEmpty();

		var errors = req.validationErrors();

		if(errors){
			res.format({
				html: function(){
					res.status(400).render('products/form',{validationErrors: errors, product:product});		
				},
				json: function(){
					res.status(400).json(errors);
				}
			});
			return;
		}

		if(product.price < 0){
			res.format({
				html: function(){
					res.status(400).render('products/form',{validationErrors: {}, product:product});		
				},
				json: function(){
					res.status(400).json(errors);
				}
			});
		}

		// var image = new Buffer(req.body.picture, "base64");
		
		// var fs = require('fs');
		// product.picture.data = fs.readFileSync('./'+req.body.picture);
		// product.picture.contentType = 'image/png';

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.save(product, function(err, results){
			res.redirect('/produtos');
		});
		mongoose.connection.close();
	});

	app.post('/produtos/all', function(req, res){
		
		var products = req.body;

		for(var i = 21; i < products.length ;i++){
		// req.assert('name', 'O nome é obrigatório').notEmpty();
		// req.assert('price', 'Preço é obrigatório, formato inválido (ex: 22.22) e maior que 0').isFloat();
		// req.assert('category', 'A categoria é obrigatória').notEmpty();
		// req.assert('description', 'A descrição é obrigatória').notEmpty();

		// var errors = req.validationErrors();

		// if(errors){
		// 	res.format({
		// 		html: function(){
		// 			res.status(400).render('products/form',{validationErrors: errors, product:product});		
		// 		},
		// 		json: function(){
		// 			res.status(400).json(errors);
		// 		}
		// 	});
		// 	return;
		// }

		// if(product.price < 0){
		// 	res.format({
		// 		html: function(){
		// 			res.status(400).render('products/form',{validationErrors: {}, product:product});		
		// 		},
		// 		json: function(){
		// 			res.status(400).json(errors);
		// 		}
		// 	});
		// }

		// var image = new Buffer(req.body.picture, "base64");
		
		// var fs = require('fs');
		// product.picture.data = fs.readFileSync('./'+req.body.picture);
		// product.picture.contentType = 'image/png';


		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.save(products[i], function(err, results){
			res.redirect('/produtos');
		});
		mongoose.connection.close();
		}
	});


	app.delete('/produtos', function(req, res){

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		var id = req.body.id;
		console.log(id);

		productDAO.delete (id, function(err, results){
			res.redirect('/produtos');
		});

		mongoose.connection.close();
	});

	app.put('/produtos/:id', function(req, res){

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		var product = req.body;
		var id = req.params.id;

		productDAO.update(id, product, function(err, results){
			res.redirect('/produtos');
		});
		mongoose.connection.close();
	})
}
