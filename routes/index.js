var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {

	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1ik7jX0x0e1IuDzKT9YVKIVlLIVen7QtIHp11QakJmA8');
	var password = "hpuykaprnehswzwr";

	var token = my_sheet.setAuth("wenli936@gmail.com", password, function() {
	});	

	my_sheet.getRows(7, function(err, allSlots){
		var timeSlots = [];

		//grab all the date/time slots from the original spreadsheet
		for ( var i = 0; i < allSlots.length; i++){
			var time = new Date(allSlots[i]['datetime']);
			if (new Date() < time)
				timeSlots.push(time.toString());
		}

		var options = {
			orderby: "datetime"
		}

		//ordered list of mentors
		my_sheet.getRows( 1, options, function(err, allMentors){

			var pastMentors = [];
			var upcoming = [];

			for(var i = 0; i < allMentors.length; i++){
				var mentorTime = new Date(allMentors[i]['datetime']);
				var slotIndex = timeSlots.indexOf(mentorTime.toString());

				//separate mentors by past and upcoming
				if (mentorTime > new Date()) {
					upcoming.push(allMentors[i]);
				}
				else {
					pastMentors.push(allMentors[i]);
				}

				//remove taken slots from list of slots
				if (slotIndex > -1){
				 	timeSlots.splice(slotIndex, 1);
				}
			}
			
			//mentors is ordered list of mentors
	    res.render('index', { title: 'Welcome to Mentor Hub' , upcoming: upcoming, slots: timeSlots, past: pastMentors.reverse()});

		});
	});
	
});


//GET ENG
router.get('/eng', function(req, res, next) {

	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1ik7jX0x0e1IuDzKT9YVKIVlLIVen7QtIHp11QakJmA8');
	var password = "hpuykaprnehswzwr";

	var token = my_sheet.setAuth("wenli936@gmail.com", password, function() {
	});	

	my_sheet.getRows(6, function(err, allSlots){
		var timeSlots = [];

		//grab all the date/time slots from the original spreadsheet
		for ( var i = 0; i < allSlots.length; i++){
			var time = new Date(allSlots[i]['datetime']);
			if (new Date() < time)
				timeSlots.push(time.toString());
		}

		var options = {
			orderby: "datetime"
		}

		//ordered list of mentors
		my_sheet.getRows( 5, options, function(err, allMentors){

			var pastMentors = [];
			var upcoming = [];

			for(var i = 0; i < allMentors.length; i++){
				var mentorTime = new Date(allMentors[i]['datetime']);
				var slotIndex = timeSlots.indexOf(mentorTime.toString());

				//separate mentors by past and upcoming
				if (mentorTime > new Date()) {
					upcoming.push(allMentors[i]);
				}
				else {
					pastMentors.push(allMentors[i]);
				}

				//remove taken slots from list of slots
				if (slotIndex > -1){
				 	timeSlots.splice(slotIndex, 1);
				}
			}
			
			//mentors is ordered list of mentors
	    res.render('eng', { title: 'Welcome to Mentor Hub' , upcoming: upcoming, slots: timeSlots, past: pastMentors.reverse()});

		});
	});
	
});


//GET PD
router.get('/pd', function(req, res, next) {

	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1ik7jX0x0e1IuDzKT9YVKIVlLIVen7QtIHp11QakJmA8');
	var password = "hpuykaprnehswzwr";

	var token = my_sheet.setAuth("wenli936@gmail.com", password, function() {
	});	

	my_sheet.getRows(6, function(err, allSlots){
		var timeSlots = [];

		//grab all the date/time slots from the original spreadsheet
		for ( var i = 0; i < allSlots.length; i++){
			var time = new Date(allSlots[i]['datetime']);
			if (new Date() < time)
				timeSlots.push(time.toString());
		}

		var options = {
			orderby: "datetime"
		}

		//ordered list of mentors
		my_sheet.getRows( 2, options, function(err, allMentors){

			var pastMentors = [];
			var upcoming = [];

			for(var i = 0; i < allMentors.length; i++){
				var mentorTime = new Date(allMentors[i]['datetime']);
				var slotIndex = timeSlots.indexOf(mentorTime.toString());

				//separate mentors by past and upcoming
				if (mentorTime > new Date()) {
					upcoming.push(allMentors[i]);
				}
				else {
					pastMentors.push(allMentors[i]);
				}

				//remove taken slots from list of slots
				if (slotIndex > -1){
				 	timeSlots.splice(slotIndex, 1);
				}
			}
			
			//mentors is ordered list of mentors
	    res.render('pd', { title: 'Welcome to Mentor Hub' , upcoming: upcoming, slots: timeSlots, past: pastMentors.reverse()});

		});
	});
	
});


//GET GROWTH
router.get('/growth', function(req, res, next) {

	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1ik7jX0x0e1IuDzKT9YVKIVlLIVen7QtIHp11QakJmA8');
	var password = "hpuykaprnehswzwr";

	var token = my_sheet.setAuth("wenli936@gmail.com", password, function() {
	});	

	my_sheet.getRows(6, function(err, allSlots){
		var timeSlots = [];

		//grab all the date/time slots from the original spreadsheet
		for ( var i = 0; i < allSlots.length; i++){
			var time = new Date(allSlots[i]['datetime']);
			if (new Date() < time)
				timeSlots.push(time.toString());
		}

		var options = {
			orderby: "datetime"
		}

		//ordered list of mentors
		my_sheet.getRows( 4, options, function(err, allMentors){

			var pastMentors = [];
			var upcoming = [];

			for(var i = 0; i < allMentors.length; i++){
				var mentorTime = new Date(allMentors[i]['datetime']);
				var slotIndex = timeSlots.indexOf(mentorTime.toString());

				//separate mentors by past and upcoming
				if (mentorTime > new Date()) {
					upcoming.push(allMentors[i]);
				}
				else {
					pastMentors.push(allMentors[i]);
				}

				//remove taken slots from list of slots
				if (slotIndex > -1){
				 	timeSlots.splice(slotIndex, 1);
				}
			}
			
			//mentors is ordered list of mentors
	    res.render('growth', { title: 'Welcome to Mentor Hub' , upcoming: upcoming, slots: timeSlots, past: pastMentors.reverse()});

		});
	});
	
});


//GET SALES
router.get('/sales', function(req, res, next) {

	// spreadsheet key is the long id in the sheets URL 
	var my_sheet = new GoogleSpreadsheet('1ik7jX0x0e1IuDzKT9YVKIVlLIVen7QtIHp11QakJmA8');
	var password = "hpuykaprnehswzwr";

	var token = my_sheet.setAuth("wenli936@gmail.com", password, function() {
	});	

	my_sheet.getRows(6, function(err, allSlots){
		var timeSlots = [];

		//grab all the date/time slots from the original spreadsheet
		for ( var i = 0; i < allSlots.length; i++){
			var time = new Date(allSlots[i]['datetime']);
			if (new Date() < time)
				timeSlots.push(time.toString());
		}

		var options = {
			orderby: "datetime"
		}

		//ordered list of mentors
		my_sheet.getRows( 3, options, function(err, allMentors){

			var pastMentors = [];
			var upcoming = [];

			for(var i = 0; i < allMentors.length; i++){
				var mentorTime = new Date(allMentors[i]['datetime']);
				var slotIndex = timeSlots.indexOf(mentorTime.toString());

				//separate mentors by past and upcoming
				if (mentorTime > new Date()) {
					upcoming.push(allMentors[i]);
				}
				else {
					pastMentors.push(allMentors[i]);
				}

				//remove taken slots from list of slots
				if (slotIndex > -1){
				 	timeSlots.splice(slotIndex, 1);
				}
			}
			
			//mentors is ordered list of mentors
	    res.render('sales', { title: 'Welcome to Mentor Hub' , upcoming: upcoming, slots: timeSlots, past: pastMentors.reverse()});

		});
	});
	
});

module.exports = router;
