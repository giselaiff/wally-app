const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

require('dotenv').config();

//
const dbPath = process.env.MONGODB_URI;

mongoose
	.connect(dbPath, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`conected to Wally DB`);
	})
	.catch(error => {
		console.error(error);
	});

const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');
const profileRouter = require('./routes/profile');

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60, // 1 day
		}),
		secret: 'wally',
		resave: true,
		saveUninitialized: true,
		name: 'wally',
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);
app.use(flash());

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/profile', profileRouter);

//

//

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
