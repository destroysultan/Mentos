var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require('google-spreadsheet');
var _ = require('underscore');




/* GET home page. */

router.get('/', function(req, res, next) {

	var my_sheet = new GoogleSpreadsheet('1HJetdqReHZq9rjK9HKhIZXdM6xs9mS7rgk4eod9cXfw');

	// Without auth -- read only 
	// IMPORTANT: See note below on how to make a sheet public-readable! 
	// # is worksheet id - IDs start at 1 
	my_sheet.getRows( 3, function(err, row_data){
	    console.log(row_data);
	    console.log(row_data[8]['datetime']);
	})

  res.render('index', { title: 'Welcome to Mentor Hub' });
});

module.exports = router;
