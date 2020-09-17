import React, { useState } from "react";
import RoutesHandler from "../routes/routes";

import { db, createComponentWithAuth } from "./FirebaseHandler";

const MainHandler = ({ user, signOut, signInWithGoogle }) => {
  const [state, setMainState] = useState({
    userPocket: {},
    timeDailyRead: 20,
    timeToSchedule: "16:00",
    timeZone: "+05:30",
    pocketExists: false,
    dataLoaded: false,
    googleExists: false,
    pocketOffset: 0,
    totalUnread: 0,
    prefSaved: false,
    email: ""
  });

  //handle google and pocket oauths
  let handleGoogleAuth = () => {
    window.open("/auth/google", "_self");
  };

  let handlePocketOAuth = () => {
    window.open(`/auth/getpocket?key=${btoa(state.email)}`, "_self");
  };

  //handle state change
  let handleStateChange = (st) => {
    setMainState(st);
    console.log(st);
  };

  //handle signout
  let handleSignout = async () => {
    await signOut();
    window.open("/auth/logout", "_self");
  };

  //handle unsubscribe
  let handleUnsubscribe = async () => {
    await db
      .collection(process.env.REACT_APP_DATABASE_NAME)
      .doc(user.email)
      .delete();
    await signOut();
    window.open("/auth/logout", "_self");
  };

  return (
    <RoutesHandler
      user={user}
      db={db}
      state={state}
      handleStateChange={handleStateChange}
      signInWithGoogle={signInWithGoogle}
      handleGoogleAuth={handleGoogleAuth}
      handlePocketOAuth={handlePocketOAuth}
      handleUnsubscribe={handleUnsubscribe}
      handleSignout={handleSignout}
    />
  );
};

export default createComponentWithAuth(MainHandler);
