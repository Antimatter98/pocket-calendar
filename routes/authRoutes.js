var express = require("express");
var router = express.Router();

var googleController = require("../controllers/googleController");
var passport = require("../controllers/pocketController");

require("dotenv").config();

CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOMEPAGE_URL;

router.get("/google", googleController.googleAuth);

router.get("/google/callback", googleController.googleAuthCallback);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

router.get("/getpocket", function (req, res) {
  req.session.destroy();
  req.logout();
  res.redirect(process.env.POCKET_AUTH_URL);
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// Passport routes for express
router.get("/pocket", passport.authenticate("pocket"), (req, res) => {
  console.log(req);
});

router.get(
  "/pocket/callback",
  passport.authenticate("pocket", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

router.get("/", authCheck, function (req, res) {
  console.log("Req to /auth");
  if (req.user) {
    res.redirect(CLIENT_HOME_PAGE_URL);
  } else {
    setTimeout(() => {
      res.redirect(CLIENT_HOME_PAGE_URL);
    }, 3000);
  }
});

module.exports = router;
