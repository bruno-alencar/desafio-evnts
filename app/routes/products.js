module.exports = function(app){

	app.get('/produtos', function(req, res){
		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.list(function(err, results){
			res.format({
				html: function(){
					res.render('products/list', {list: results});
				},
				json: function(){
					response.json(results);
				}
			})
		});
	});

	app.get('/produtos/:category', function(req,res){

		var category = req.params.category;
		console.log("categoria: "+category);

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.listByCategory(category, function(err, results){
			res.format({
				html: function(){
					res.render('products/list', {list: results});
				},
				json: function(){
					response.json(results);
				}
			})
		});
	});

	app.get('/cadastrar', function(req,res){
		res.render('products/form', {validationErrors:{}, product:{}});
	})

	app.post('/produtos', function(req, res){
		
		var product = req.body;

		req.assert('name', 'O nome é obrigatório').notEmpty();
		req.assert('price', 'Preço é obrigatório ou Formato inválido (ex: 22.22)').isEmpty().isFloat();
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

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		productDAO.save(product, function(err, results){
			res.redirect('/produtos');
		});
	});

	app.delete('/produtos', function(req, res){

		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		var id = req.body.id;

		productDAO.delete (id, function(err, results){
			res.redirect('/produtos');
		})

	});

	app.put('/produtos', function(req, res){
		var mongoose = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(mongoose);

		var product = req.body;

		productDAO.update(product._id, product, function(err, results){
			res.redirect('/produtos');
		})
	})
}
