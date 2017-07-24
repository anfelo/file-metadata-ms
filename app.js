'use strict'
const express = require('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const del = require('del');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// GET 
// Route for displaying the api user instructions
app.get('/', function(req, res, next){
	// Render home view
	res.render('index');
});

// POST 
app.post('/', upload.single('fpath'), function(req, res, next) {
	if(!req.file) {
		const err = new Error('Not Found');
		err.status = 404;
		return next(err);
	}
	res.cookie( 'fileSize', req.file.size );
	del(['uploads/**', '!uploads/']).then(paths => {
		res.redirect( '/file-size' );
	});
});

// GET /file-size
app.get('/file-size', function(req, res) {
	res.json({ size: req.cookies.fileSize });
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
	console.log("Express server is listening on port", port);
});