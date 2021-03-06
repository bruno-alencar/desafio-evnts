
var Product = require('../models/Product');
function ProductDAO(mongoose){

}

ProductDAO.prototype.list = function(callback){
	Product.find(callback,function(err, data){
		if(err){
			console.log('Erro: ', err);
		}
		// console.log('Listou:', data);
	});
}

ProductDAO.prototype.listByCategory = function(category, callback){
	Product.find({ category: category },callback,function(err, data){
		if(err){
			console.log('Erro: ', err);
		}
		// console.log('Listou:', data);
	});
}

ProductDAO.prototype.save = function(product, callback){

	_Product = new Product(product);
	_Product.save(callback, function(err, data) {
			if(err) {
				console.log('ERRO: ', err);
			}
			// console.log('Dados: ', data);
	});
}

ProductDAO.prototype.delete = function(id, callback){
	Product.remove({ _id: id}, callback, function(err, data){
		if(err) {
				console.log('ERRO: ', err);
			}
			// console.log('Dados: ', data);
	});
}

ProductDAO.prototype.update = function(id, product, callback){
	Product.update({_id, id}, product, {multi:false}, function(err, data){
		if(err){
			console.log('Erro: ', err);
		}
		// console.log('Listou:', data);
	});
}

module.exports = function(){
	return ProductDAO;
}	