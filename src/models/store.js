const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new Schema({
	producto: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
	nombre: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
	},
	sede: {
		type: String,
		required: true,
	},
	cantidad: {
		type: Number,
		required: true,
	},
});

storeSchema.index({ product: 1, sede: 1 }, { unique: true });

// create mongoose model
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

