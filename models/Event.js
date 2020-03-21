const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
	
		userId: { 
			type: Schema.Types.ObjectId,
			ref: 'User'
		},

    	name: {
            type: String,
            required: true,
        },
		
    	description: {
            type: String,
            required: true,
		},
		
        hour: {
            type: Number,
            required: true,
		},

    	location: {
            type: String,
            required: true,
        },
        
        joined: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
