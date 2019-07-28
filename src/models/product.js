const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	codigo: {
		type: Number,
		unique: true
	},
	categoria: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},
	cantidad: {
		type: Number,
		trim: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	descuento: {
		type: Number
	  },
	descripcion: {
		type: String,
		required: true,
		lowercase: true,
	},
	imagen: {
		type: Buffer,
	},
	sede: {
		type: Array,
	}
});

// create mongoose model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
