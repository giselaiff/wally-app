const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
	event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
	text: String,
	author: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
