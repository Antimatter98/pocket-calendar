var express = require("express");
var router = express.Router();
var atob = require("atob");
const db = require("../extras/firebaseForNode");

var googleController = require("../controllers/googleController");
var passport = require("../controllers/pocketController");
const cons = require("consolidate");

require("dotenv").config();

CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOMEPAGE_URL;

router.get("/google", googleController.googleAuth);

router.get("/google/callback", googleController.googleAuthCallback);

router.get("/login/success", async (req, res) => {
  if (req.user && req.session) {
    try {
      await db
        .collection(process.env.DATABASE_NAME)
        .doc(req.session.email)
        .update({
          pocketAccess: req.user.accessToken,
        });
      res.redirect(CLIENT_HOME_PAGE_URL);
    } catch (err) {
      console.log(err);
      res.redirect(CLIENT_HOME_PAGE_URL + "/help");
    }
  } else {
    //error
    res.redirect(CLIENT_HOME_PAGE_URL + "/help");
  }
  console.log(req.session);
});

router.get("/login/failed", (req, res) => {
  //error
  res.redirect(CLIENT_HOME_PAGE_URL + "/help");
});

router.get("/getpocket", async function (req, res) {
  var doc = await db
    .collection(process.env.DATABASE_NAME)
    .doc(atob(req.query.key))
    .get();
  if (doc.exists) {
    if (req.session.user) {
      console.log("Before: ", req.session);
      req.session.destroy();
      req.logout();
      console.log("Destroying...");
    }
    req.session.email = atob(req.query.key);
    console.log(req.session);
    res.redirect(process.env.POCKET_AUTH_URL + `?key=${req.query.key}`);
  } else {
    res.redirect(CLIENT_HOME_PAGE_URL);
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// Passport routes for express
router.get(
  "/pocket",
  (req, res, next) => {
    console.log("after pocket: ", atob(req.query.key));
    next();
  },
  passport.authenticate("pocket"),
  (req, res) => {
    res.redirect("/auth/login/success");
  }
);

router.get(
  "/pocket/callback",
  passport.authenticate("pocket", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

const authCheck = (req, res, next) => {
  if (!req.user) {
    // res.status(401).json({
    //   authenticated: false,
    //   message: "user has not been authenticated",
    // });
    res.redirect(CLIENT_HOME_PAGE_URL + "/help");
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
