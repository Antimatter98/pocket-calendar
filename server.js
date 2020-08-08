var express = require("express");
var cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var path = require("path");
var cors = require("cors");
var cron = require("node-cron");
const compression = require("compression");
var session = require("express-session");
var MemoryStore = require("memorystore")(session);
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require("morgan");

const scheduleArticles = require("./scheduler/cronScheduler");
const authRoutes = require("./routes/authRoutes");
const passport = require("./controllers/pocketController");

require("dotenv").config();

CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOMEPAGE_URL;

// Express set up
var server = express();

server.use(express.static(path.join(__dirname, "client/build")));

// parse cookies
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
server.use(compression());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("combined"));

server.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
server.use(passport.initialize());
server.use(passport.session());
//server.use(server.router);

server.use("/auth", authRoutes);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//cron scheduler
cron.schedule("0 30 04 * * *", () => {
  console.log(`Time is ${new Date().getHours()} : ${new Date().getMinutes()}`);
  scheduleArticles();
});

const port = process.env.PORT || 4000;

server.listen(port);
console.log(`server running at : ${port}`);
