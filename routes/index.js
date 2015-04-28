var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {

	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1j2dq5q4eKt8uQ5tIxpaBTjZFxNpyO1VTrMGBdP98m10');

		// # is worksheet id - IDs start at 1 
	my_sheet.getRows(1, function(err, allSlots){
	    console.log( 'pulled in '+allSlots.length + ' rows ');



	    //datetime, date doesn't work because theres no year, also reads as
	    //a string

	    //mess with oauth somehow

	    res.render('index', { title: 'Mentos' , slots: allSlots});
	   	});	

});

module.exports = router;
