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
            type: String,
            required: true,
        },
        
        date: {
            type: Date,
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
        ],

         mood: { 
            type: String, 
            required: true, 
            enum:["Chill", "Medium", "Hard"]
            },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
