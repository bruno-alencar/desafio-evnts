var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
	name: String,
	description: String,
	price: {type: Number, min:0.0},
	category: String
});

module.exports = mongoose.model('Product', productSchema);