var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uid2 = require('uid2');
var router = express.Router();

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


passport.use(new GoogleStrategy({  
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(profile)
      console.log("GoogleStrategy done callback");
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  saveUninitialized: true,
  genid: function(req) {
    return uid2(32); // use UUIDs for session IDs
  },
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

//authenticate
app.use('/auth/google', passport.authenticate('google',  
    { scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/calendar'] }),
    function(req, res){} // this never gets called
);

//redirect after authenticate
app.use('/oauth2callback',
  passport.authenticate('google', { failureRedirect: '/login_fail'}),
  function(req, res) {
    if (req.user._json.domain == "tradecrafted.com")
      res.redirect('/');
    else {
      res.redirect('/login_fail');
    }
  }
);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

passport.serializeUser(function(user, done) {  
    console.log("serlializing user");
    done(null, user);
});

passport.deserializeUser(function(user, callback){
       console.log('deserialize user.');
       callback(null, user);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;