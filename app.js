'use strict'
const express = require('express');
const app = express();

// app.use('/static', express.static('public'));
// app.set('view engine', 'pug');
// app.use(jsonParser());

app.use('/', function(req,res){
	res.send('Hello, We are routed');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error Handler
app.use(function(err,req,res,next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

const port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('Server running on port:', port);
});