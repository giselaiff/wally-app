const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	hour: Number,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
