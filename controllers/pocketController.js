var passport = require("passport");

var PocketStrategy = require("passport-pocket");

require("dotenv").config();

// Passport Set serializers
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Passport Set up
var pocketStrategy = new PocketStrategy(
  {
    consumerKey: process.env.POCKET_CONSUMER_KEY,
    callbackURL: process.env.POCKET_CALLBACK_URL,
  },
  async function (username, accessToken, done) {
    console.log("here...");
    process.nextTick(function () {
      return done(null, {
        username: username,
        accessToken: accessToken,
      });
    });
  }
);

passport.use(pocketStrategy);

module.exports = passport;
