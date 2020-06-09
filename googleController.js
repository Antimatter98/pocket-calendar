const {google} = require('googleapis');
const axios = require('axios');
var client = require('./clientSecret');

const db = require('./firebaseForNode');

require("dotenv").config();

let userDetails = {};
let oAuth2Client;

const SCOPES = ['openid', 'email', 'https://www.googleapis.com/auth/calendar.events'];
const TOKEN_PATH = 'token.json';

const getEmail = async (auth, id_token) => {
  try{
    //setTimeout
    return await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+id_token);
  }
  catch(err){return "err";};
}

exports.googleAuth = (req, res, next) => {
    // Load client secrets from a local file.
    // fs.readFile('credentials.json', (err, content) => {
    //     if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        
        //let credentials = JSON.parse(content);
        const {client_secret, client_id, redirect_uris} = client.client.web;
        oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[1]);
        
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
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
    if(code){
        //credentials = getCreds.
        //oAuth2Client = 
        // fs.readFile('credentials.json', (err, content) => {
        //     if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Calendar API.
            
            //let credentials = JSON.parse(content);
            const {client_secret, client_id, redirect_uris} = client.client.web;
            oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[1]);
            
            console.log("Code: ");    
            console.log(code);
            
            //let [refresh, access] = gcal.authed(oAuth2Client, code);
                    //if (err) return console.error('Error retrieving access token', err);
                    //oAuth2Client.setCredentials(token);
                oAuth2Client.getToken(code, async (err, token) => {
                    if (err) return console.error('Error retrieving access token', err);
                    oAuth2Client.setCredentials(token);
                    // Store the token to disk for later program executions
                    /*fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH);
                    });*/
                    //callback(oAuth2Client);
                    // console.log("Token generated successfully!");
                    // //console.log(token.refresh_token);
                    // //return [token.refresh_token, token.access_token];
                    let mail = '';
                    let access = '';
                    let refresh = '';
                    const email = await getEmail(oAuth2Client, token.id_token)
                        .then(res => {
                            mail = res.data.email;
                            console.log('Data: ', res.data.email);
                        })
                        .catch(err => {
                            console.log('Err email');
                        });
                    setTimeout(()=> {}, 2);
                    console.log("Email data: ", email);

                    try{
                        console.log(token);
                        oAuth2Client.credentials = {
                            refresh_token: token.refresh_token,
                            access_token: token.access_token
                        };
                        console.log(token.SCOPES);
                        //gcal.listEvents(oAuth2Client);
                        //console.log("Email: ", await(gcal.getEmail(oAuth2Client, token.id_token)));
                        //console.log(oAuth2Client.getAuthInstance());
                        access = token.access_token;
                        refresh = token.refresh_token;
                    }
                        //console.log('Auth client: ', oAuth2Client);
                        
                        // Store the token to disk for later program executions
                        /*fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                            if (err) return console.error(err);
                            console.log('Token stored to', TOKEN_PATH);
                            gcal.listEvents(oAuth2Client);
                        });*/
                        //callback(oAuth2Client);
                        //console.log('Token: ', token);
                    catch(err){
                        console.error('Error retrieving access token', err);
                        res.redirect('https://pocket-calendar.herokuapp.com/help');
                    };

                    console.log(access, refresh);
                        console.log("Adding to db...");
                        const doc = await db.collection(process.env.DATABASE_NAME).doc(mail).get();
                        if(doc.exists && access && refresh){
                            console.log("Exists!");
                            console.log(access, refresh);
                            const newDoc = await db.collection(process.env.DATABASE_NAME).doc(mail).update({
                                googleAccess: access,
                                googleRefresh: refresh
                            });
                            res.redirect('https://pocket-calendar.herokuapp.com/home');
                        }
                        else{
                            console.log("Error saving the tokens :(");
                            res.redirect('https://pocket-calendar.herokuapp.com/help');
                        }
                    
    //                 User.findOne({email: mail})
    //                 .then(user => {
    //                 if(!user){
    //                     //return res.redirect('/login');
    //                     console.log("New User!");
    //                     const user = new User({
    //                         email: mail,
    //                         google_access_token: access,
    //                         google_refresh_token: refresh,
    //                         time_of_day: "16:00",
    //                         daily_time: "20"
    //                     });
                        
    //                     req.session.isLoggedIn = true;
    //                     req.session.user = user;
    //                     user.save();
    //                     return req.session.save(err => {
    //                         console.log(err);
    //                         //res.redirect('https://www.getpocket.com');
    //                         res.redirect('http://localhost:5000/getpocket');
    //                     });
    //                 }
    //                 else{
    //                     console.log("Existing User!");
    //                     user.google_access_token = access;
    //                     //user.google_refresh_token = refresh;
                        
    //                     req.session.isLoggedIn = true;
    //                     req.session.user = user;
                        
    //                     user.save();
    //                     console.log(req.session);
    //                 return req.session.save(err => {
    //                     console.log("Error at this point: ", err);
    //                     //res.redirect('https://www.getpocket.com');
    //                     res.redirect('http://localhost:5000/getpocket');
    //                 });
    //             }
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
        //console.log(req);
            });
            //console.log('Redirecting to pocket auth...');
            //res.redirect('http://localhost:5000/getpocket');
            //res.redirect('https://www.google.com');
        }
        else{
            console.log("No code ");
            res.redirect('https://pocket-calendar.herokuapp.com/help');
        }
    
};