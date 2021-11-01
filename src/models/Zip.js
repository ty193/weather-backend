const mongoose = require('mongoose');

const zipSchema = new mongoose.Schema({
	zip: {
		type: Number,
		unique: true,
		required: true
	},
	city: {
		type: String
	}
});

mongoose.model('Zip', zipSchema);
