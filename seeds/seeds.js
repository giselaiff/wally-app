const mongoose = require('mongoose');
require('dotenv').config();

const dbPath = 'mongodb://localhost:27017/wally';

mongoose
	.connect(dbPath, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`conected to Wally local`);
	})
	.catch(error => {
		console.error(error);
	});
