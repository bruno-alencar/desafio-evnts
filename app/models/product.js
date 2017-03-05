var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
	name: String,
	description: String,
	price: String
});

module.exports = mongoose.model('Product', productSchema);