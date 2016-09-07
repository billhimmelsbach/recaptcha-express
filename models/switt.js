var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SwittSchema = new Schema({
	name: String,
	super_power: String,
});

var Switt = mongoose.model('Switt', SwittSchema);

module.exports = Switt;
