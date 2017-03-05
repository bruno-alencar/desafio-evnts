function ProductDAO(mongoose){
	_mongoose = mongoose;
	var Schema = _mongoose.Schema;

	var productSchema = _mongoose.Schema({
		name: String,
		description: String,
		price: String
	});

	Product = _mongoose.model('Product', productSchema);
}

ProductDAO.prototype.list = function(callback){
	Product.find(callback,function(err, data){
		if(err){
			console.log('Erro: ', err);
		}
		console.log('Listou:', data);
	});
}

ProductDAO.prototype.save = function(product, callback){
	var productToSave = new Product(product);
	productToSave.save(function(callback, err, data) {
			if(err) {
				console.log('ERRO: ', err);
			}
			console.log('Dados: ', data);
	});
}

module.exports = function(){
	return ProductDAO;
}	