var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var _ = require('underscore');
var moment = require('moment');
var http = require('http');

var pages = {
	eng : 5,
	growth: 4,
	sales: 3,
	pd: 2,
	all : 1
};

var cachedPastMentors = {
	eng: [],
	growth: [],
	sales: [],
	pd: [],
	all: []
};

var sortOptions = {
	orderby: "datetime"
};


//the google sheet we're using
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var my_sheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

my_sheet.setAuth(process.env.EMAIL, process.env.GOOGLE_PASSWORD, function() {});	

/* GET pages. */
router.get('/eng', ensureAuthenticated, function(req, res, next) {
		
		//obtain array of mentors ordered by datetime
		my_sheet.getRows(pages.eng, sortOptions, function(err, allMentors){
			getMentorSlotObject('eng', allMentors, res);
		});
});

router.get('/growth', ensureAuthenticated, function(req, res, next) {
		
		//obtain array of mentors ordered by datetime
		my_sheet.getRows(pages.growth, sortOptions, function(err, allMentors){
			getMentorSlotObject('growth', allMentors, res);
		});
});

router.get('/sales', ensureAuthenticated, function(req, res, next) {
		
		//obtain array of mentors ordered by datetime
		my_sheet.getRows(pages.sales, sortOptions, function(err, allMentors){
			getMentorSlotObject('sales', allMentors, res);
		});
});

router.get('/pd', ensureAuthenticated, function(req, res, next) {
		
		//obtain array of mentors ordered by datetime
		my_sheet.getRows(pages.pd, sortOptions, function(err, allMentors){
			getMentorSlotObject('pd', allMentors, res);
		});
});

router.get('/', ensureAuthenticated, function(req, res, next) {

		//obtain array of mentors ordered by datetime
		my_sheet.getRows(pages.all, sortOptions, function(err, allMentors){
			getMentorSlotObject('all', allMentors, res);
		});
});


///////authentication routes////////////

//login fail route
router.get('/login_fail', function(req, res){
  res.render('bad_login');
});


//logout
router.get('/logout', function(req, res){
	console.log("LOGGED OUT");
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {  
    if (req.isAuthenticated() && req.user._json.domain == "tradecrafted.com") { return next(); }
    res.redirect('/auth/google');
}

//////////////////////////////////////////////////////////////

//generate track slots for the next 1-2 months
function getTrackSlots() {
	
	var slots = [];

	var monday = moment().day(1).hour(13).minute(00); //next monday 1pm
	var tuesday = moment().day(2).hour(17).minute(30); //next tuesday 5:30pm
	var friday = moment().day(5).hour(9).minute(30); //next friday 9:30am	

	for (var i = 0; i < 5; i++){
		slots.push(moment(monday).add(i*7, 'days').format('llll'));
		slots.push(moment(tuesday).add(i*7, 'days').format('llll'));
		slots.push(moment(friday).add(i*7, 'days').format('llll'));
	}

	return slots;
}

//generate all-track slots for the next 1-2 months
function getAllTrackSlots() {
	
	var slots = [];

	var wednesday = moment().day(3).hour(17).minute(30); //next wednesday 5:30pm
	var friday = moment().day(5).hour(13).minute(30); //next friday 1:30pm	

	for (var i = 0; i < 5; i++){
		slots.push(moment(wednesday).add(i*7, 'days').format('llll'));
		slots.push(moment(friday).add(i*7, 'days').format('llll'));
	}

	return slots;
}

function getMentorSlotObject(track, allMentors, res){

		//ordered list of mentors
		var pastMentors = cachedPastMentors[track];
		var upcoming = [];

		var trackTimeSlots = (track === 'all') ? getAllTrackSlots() : getTrackSlots();

		//start where the cache left off, upcoming list shouldn't be too expensive
		//upcoming is checked against 'now'
		for(var i = pastMentors.length; i < allMentors.length; i++){
			var mentorTime = new Date(allMentors[i].datetime);
			
			//reformat date to be prettier
			allMentors[i].datetime = moment(mentorTime).format("llll"); 

			var start = moment(mentorTime);
			allMentors[i].datetimeCalendar = start.format("YYYYMMDDTHHmmss") + "/" + start.add(1, 'hours').format("YYYYMMDDTHHmmss");
			
			var slotIndex = trackTimeSlots.indexOf(allMentors[i].datetime);

			//separate mentors by past and upcoming, all mentors for the current day will be upcoming
			if (mentorTime.getTime() > new Date(new Date().toLocaleDateString())) {
				upcoming.push(allMentors[i]);
			}

			else {
				pastMentors.push(allMentors[i]);
			}

			//remove taken slots from list of slots
			if (slotIndex > -1){
			 	trackTimeSlots.splice(slotIndex, 1);
			}
		}

		res.render('index', { title: 'Tradecraft Mentors', upcoming: upcoming, slots: trackTimeSlots, past: pastMentors.reverse()});
}

module.exports = router;