const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
		unique: true,
		lowercase: true,
	},
	firstname: {
		type: String,
		required: 'name is Required',
		trim: true,
		lowercase: true,
	},
	lastname: {
		type: String,
		required: 'lastname is Required',
		trim: true,
		lowercase: true,
	},
	cc: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	score: {
		type: Number,
		required: true,
	},
});

// create mongoose model
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
