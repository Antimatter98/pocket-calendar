var express = require("express");
require("dotenv").config();

var forceHTTPS = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect("https://" + req.headers.host + req.url);
    } else return next();
  } else return next();
};

module.exports = {
  forceHTTPS,
};
