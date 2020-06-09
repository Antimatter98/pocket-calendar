var express = require('express');
//	cons    = require('consolidate'),
//	swig    = require('swig');
var cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var	passport = require('passport');
//	util = require('util'),
var	PocketStrategy = require('passport-pocket');
var path = require('path');

var cors = require("cors");

const {google} = require('googleapis');
var cron = require("node-cron");

const db = require('./firebaseForNode');

var client = require('./clientSecret');

var googleController = require('./googleController');

const scheduleArticles = require('./cronScheduler');

//var POCKET_CONSUMER_KEY = require('./pocketConfig');

require("dotenv").config();

//CLIENT_HOME_PAGE_URL = "https://pocket-passport-oauth.herokuapp.com/";
CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOMEPAGE_URL;

// if(POCKET_CONSUMER_KEY.POCKET_CONSUMER_KEY === "Pocket consumer key"){
// 	console.log('WARNING!!! Need a pocket costumer key');
// }

// Passport Set serializers
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Passport Set up
var pocketStrategy = new PocketStrategy({
		consumerKey    : process.env.POCKET_CONSUMER_KEY,
		callbackURL    : process.env.POCKET_CALLBACK_URL
	}, async function(username, accessToken, done) {
		console.log('here...');
		process.nextTick(function () {
			return done(null, {
				username    : username,
				accessToken : accessToken
			});
		});
	}
);

passport.use(pocketStrategy);

// Express set up
var server = express();

server.use(express.static(path.join(__dirname, 'client/build')));
// server.use(
// 	cookieSession({
// 	  name: "session",
// 	  keys: "thisappisawesome",
// 	  maxAge: 24 * 60 * 60 * 100
// 	})
//   );
  
  // parse cookies
server.use(cookieParser());

server.use(
	cors({
	  origin: "http://localhost:3000", // allow to server to accept request from different origin
	  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	  credentials: true // allow session cookie from browser to pass through
	})
  );

server.configure(function() {
  server.use(express.logger());
  server.use(express.cookieParser());
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(express.session({ secret: process.env.SESSION_SECRET }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(server.router);
});

server.get('/auth/google', googleController.googleAuth);

server.get('/auth/google/callback', googleController.googleAuthCallback);


server.get("/auth/login/success", (req, res) => {
	if (req.user) {
	  res.json({
		success: true,
		message: "user has successfully authenticated",
		user: req.user,
		cookies: req.cookies
	  });
	}
  });

  server.get("/auth/login/failed", (req, res) => {
	res.status(401).json({
	  success: false,
	  message: "user failed to authenticate."
	});
  });

// server.get("/auth/redirect", (req, res) => {
// 	setTimeout(res.redirect('/auth'), 1000);
// });

server.get('/auth/getpocket', function(req, res){
	req.session.destroy();
	req.logout();
	res.redirect(process.env.POCKET_AUTH_URL);
});

server.get('/auth/logout', function(req, res){
	req.session.destroy();
	req.logout();
	res.redirect(CLIENT_HOME_PAGE_URL);
});

// Passport routes for express
server.get('/auth/pocket',passport.authenticate('pocket'), (req, res) => {console.log(req)});

server.get('/auth/pocket/callback', 
	passport.authenticate("pocket", {
		successRedirect: CLIENT_HOME_PAGE_URL,
		failureRedirect: "/auth/login/failed"
  })
);

  const authCheck = (req, res, next) => {
	if (!req.user) {
	  res.status(401).json({
		authenticated: false,
		message: "user has not been authenticated"
	  });
	} else {
	  next();
	}
  };
  
  server.get('/auth', authCheck, function(req, res){
	console.log('Req to /auth');
	if(req.user){
		// pocketStrategy.getUnreadItems(req.user.accessToken, function (err, items) {
		// 	if(err){
		// 		res.send('Something went wrong');
		// 		return;
		// 	}

		// 	res.render('index', {
		// 		user  : req.user,
		// 		items : items
		// 	});
		// });
		//console.log(req.user);
		//res.send({'req': req});
		// res.status(200).json({
		// 	authenticated: true,
		// 	message: "user successfully authenticated",
		// 	user: req.user,
		// 	cookies: req.cookies
		//   });
		res.redirect(CLIENT_HOME_PAGE_URL);
	}else{
		setTimeout(() => {res.redirect(CLIENT_HOME_PAGE_URL)}, 3000);
	}
});

// server.get('*', (req, res) => {
// 	res.redirect(CLIENT_HOME_PAGE_URL);
//   });

server.get('*', (req, res) => {
	res.sendfile(path.join(__dirname+'/client/build/index.html'));
});

//cron scheduler
cron.schedule('0 30 04 * * *', () => {
    console.log(`Time is ${new Date().getHours()} : ${new Date().getMinutes()}`);
	scheduleArticles();
});

const port = process.env.PORT || 4000;

server.listen(port);
console.log(`server running at : ${port}`);
//console.log(client.client.web);
