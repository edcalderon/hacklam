const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true
  }
});

// create mongoose model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
