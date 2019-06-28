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
		type: Buffer,
	},
	description: {
		type: String,
		required: true,
		lowercase: true,
	},
	count: {
		type: Number,
		required: false,
	},
	price: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: false,
		trim: true,
	},
});

// create mongoose model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
