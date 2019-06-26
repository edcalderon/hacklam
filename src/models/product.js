const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	type: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	photo: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	description: {
		type: String,
		required: true,
		lowercase: true,
	},
	count: {
		type: Number,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
		trim: true,
	},
});

// create mongoose model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
