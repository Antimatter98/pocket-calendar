import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import "./index.css";

import NavComp from "./component/NavComp";
import Footer from "./component/footer";

import ReactLoading from "react-loading";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import firestore from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

import LandingPage from "./pages/index/indx";
import UserHomePage from "./pages/home/home";
import PrivacyPolicy from "./pages/privacy/Privacy";
import AboutPage from "./pages/about/about";
import HelpPage from "./pages/help/help";

import dbFuncs from "./dbAccess";

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const firebaseAppAuth = firebaseApp.auth();
const db = firebase.firestore();

//let provider = new firebase.auth.GoogleAuthProvider();
//provider.addScope('https://www.googleapis.com/auth/calendar.events');

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

//adding scopes
providers.googleProvider.addScope("openid");
providers.googleProvider.addScope("profile");
providers.googleProvider.addScope("email");
//providers.googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    response: "",
    post: "",
    responseToPost: "",
    userPocket: {},
    error: null,
    authenticated: false,
    timeDailyRead: 20,
    timeToSchedule: "16:00",
    timeZone: "+05:30",
    pocketExists: false,
    dataLoaded: false,
    googleExists: false,
    pocketOffset: 0,
    totalUnread: 0,
    prefSaved: false,
  };

  componentDidMount() {
    //this.testDb();
    if (!this.state.pocketExists) {
      this.callPocketAuth()
        .then((res) => {
          this.setState({
            authenticated: true,
            userPocket: res.user,
          });
        })
        .catch((error) => {
          this.setState({
            authenticated: false,
            error: "Failed to authenticate user",
          });
        });
    }
  }

  callPocketAuth = async () => {
    const response = await fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body);
    return body;
  };

  handleGoogleAuth() {
    window.open("/auth/google", "_self");
  }

  handlePocketOAuth() {
    window.open("/auth/getpocket", "_self");
  }

  handleStateChange = (st) => {
    this.setState(st);
    console.log(st);
  };

  render() {
    let {
      user,
      signOut,
      signInWithGoogle,
      //clicked
    } = this.props;

    let handleSignout = async () => {
      await signOut();
      window.open("/auth/logout", "_self");
    };

    let handleUnsubscribe = async () => {
      const newDoc = await db
        .collection(process.env.REACT_APP_DATABASE_NAME)
        .doc(user.email)
        .delete();
      await signOut();
      window.open("/auth/logout", "_self");
    };

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            dbFuncs.checkUser(user, db, this.state, this.handleStateChange) ? (
              <Redirect to="/home" />
            ) : (
              <LandingPage
                {...props}
                googleAuth={user}
                onButtonClick={signInWithGoogle}
              />
            )
          }
        />

        <Route
          path="/home"
          exact
          render={(props) =>
            user ? (
              this.state.dataLoaded ? (
                <div>
                  <NavComp
                    onSignOutClick={handleSignout}
                    onUnsubscribeClick={handleUnsubscribe}
                    loggedUser={user}
                    db={db}
                  />
                  <UserHomePage
                    {...props}
                    prefSaved={this.state.prefSaved}
                    resetPrefModal={dbFuncs.resetPrefModal}
                    loggedUser={user}
                    loggedPocket={this.state.userPocket}
                    onButtonClick={dbFuncs.clicked}
                    timeDailyRead={this.state.timeDailyRead} //change here
                    timeToSchedule={this.state.timeToSchedule} //change here
                    timeZone={this.state.timeZone}
                    pocketExists={this.state.pocketExists}
                    onPocketButtonClick={this.handlePocketOAuth}
                    googleExists={this.state.googleExists}
                    onGoogleCalClick={this.handleGoogleAuth}
                    onSignOutClick={handleSignout}
                    pocketOffset={this.state.pocketOffset}
                    totalUnread={this.state.totalUnread}
                    db={db}
                    currentState={this.state}
                    stateFn={this.handleStateChange}
                  />
                  <Footer />
                </div>
              ) : (
                <div className="loading-screen" align="center">
                  {" "}
                  <div className="load-cont">
                    {" "}
                    <h3 className="text">Almost Ready...</h3>
                    <ReactLoading
                      type={"bars"}
                      color={"#fff"}
                      height={100}
                      width={100}
                    />{" "}
                  </div>{" "}
                </div>
              )
            ) : (
              <Redirect to="/" />
            )
          }
        />

        <Route
          path="/privacy-policy"
          exact
          render={(props) => <PrivacyPolicy />}
        />

        <Route path="/help" exact render={(props) => <HelpPage />} />

        <Route path="/about" exact render={(props) => <AboutPage />} />
      </Switch>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
  db,
  firebase,
})(App);
