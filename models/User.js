const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	
	{
		
	username: { 
		type: String, 
		required: true, 
		unique: true,

	},

	hashedPassword: {
		 type: String, 
		 required: true 
	}, 

	age: {
		type: Number,
	},

	description: {
		type: String,
	},
	
	city: {
		type: String,
	},
	
	mood: { 
        type: String, 
        enum:["Chill", "Medium", "Hard"]
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
