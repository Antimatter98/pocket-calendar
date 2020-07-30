const { google } = require("googleapis");
const axios = require("axios");
var client = require("../extras/clientSecret");

const db = require("../extras/firebaseForNode");

require("dotenv").config();

let userDetails = {};
let oAuth2Client;

const SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/calendar.events",
];
const TOKEN_PATH = "token.json";

const getEmail = async (auth, id_token) => {
  try {
    //setTimeout
    return await axios.get(
      "https://oauth2.googleapis.com/tokeninfo?id_token=" + id_token
    );
  } catch (err) {
    return "err";
  }
};

exports.googleAuth = (req, res, next) => {
  // Load client secrets from a local file.
  // Authorize a client with credentials, then call the Google Calendar API.

  //let credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = client.client.web;
  oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[1]
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);

  //let tmp = gcal.authorize(JSON.parse(content)/*, gcal.listEvents*/);
  //console.log(tmp);
  //res.redirect(tmp);
};

exports.googleAuthCallback = async (req, res, next) => {
  const code = req.query.code;
  //console.log(oAuth2Client);
  if (code) {
    // Authorize a client with credentials, then call the Google Calendar API.
    //let credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = client.client.web;
    oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[1]
    );

    console.log("Code: ");
    console.log(code);

    //let [refresh, access] = gcal.authed(oAuth2Client, code);
    //if (err) return console.error('Error retrieving access token', err);
    //oAuth2Client.setCredentials(token);
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);

      let mail = "";
      let access = "";
      let refresh = "";
      const email = await getEmail(oAuth2Client, token.id_token)
        .then((res) => {
          mail = res.data.email;
          console.log("Data: ", res.data.email);
        })
        .catch((err) => {
          console.log("Err email");
        });
      setTimeout(() => {}, 2);
      console.log("Email data: ", email);

      try {
        console.log(token);
        oAuth2Client.credentials = {
          refresh_token: token.refresh_token,
          access_token: token.access_token,
        };
        console.log(token.SCOPES);
        //gcal.listEvents(oAuth2Client);
        //console.log("Email: ", await(gcal.getEmail(oAuth2Client, token.id_token)));
        //console.log(oAuth2Client.getAuthInstance());
        access = token.access_token;
        refresh = token.refresh_token;
      } catch (err) {
        console.error("Error retrieving access token", err);
        res.redirect(process.env.CLIENT_HOMEPAGE_URL + "/help");
      }

      console.log(access, refresh);
      console.log("Adding to db...");
      const doc = await db
        .collection(process.env.DATABASE_NAME)
        .doc(mail)
        .get();
      if (doc.exists && access && refresh) {
        console.log("Exists!");
        console.log(access, refresh);
        const newDoc = await db
          .collection(process.env.DATABASE_NAME)
          .doc(mail)
          .update({
            googleAccess: access,
            googleRefresh: refresh,
          });
        res.redirect(process.env.CLIENT_HOMEPAGE_URL + "/home");
      } else {
        console.log("Error saving the tokens :(");
        res.redirect(process.env.CLIENT_HOMEPAGE_URL + "/help");
      }
    });
  } else {
    console.log("No code ");
    res.redirect(process.env.CLIENT_HOMEPAGE_URL + "/help");
  }
};
