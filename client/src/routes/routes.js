import React, { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

//importing database functions
import dbFuncs from "../main/dbAccess";
import LoadingScreen from "../component/core/LoadingScreen";

//lazy loading all the components
const LandingPage = lazy(() => import("../pages/landing/Landing"));
const UserHomePage = lazy(() => import("../pages/home/home"));
const PrivacyPolicy = lazy(() => import("../pages/privacy/Privacy"));
const AboutPage = lazy(() => import("../pages/about/about"));
const HelpPage = lazy(() => import("../pages/help/help"));

const routes = ({
  user,
  db,
  state,
  handleStateChange,
  signInWithGoogle,
  handleGoogleAuth,
  handlePocketOAuth,
  handleUnsubscribe,
  handleSignout
}) => {
  const conditionalLandingPageContent = () =>
    dbFuncs.checkUser(user, db, state, handleStateChange) ? (
      <Redirect to="/home" />
    ) : (
      <LandingPage googleAuth={user} onButtonClick={signInWithGoogle} />
    );

  const conditionalHomePageContent = () =>
    user ? (
      state.dataLoaded ? (
        <UserHomePage
          resetPrefModal={dbFuncs.resetPrefModal}
          loggedUser={user}
          onButtonClick={dbFuncs.clicked}
          onPocketButtonClick={handlePocketOAuth}
          onGoogleCalClick={handleGoogleAuth}
          db={db}
          currentState={state}
          stateFn={handleStateChange}
          handleSignout={handleSignout}
          handleUnsubscribe={handleUnsubscribe}
        />
      ) : (
        <LoadingScreen title="Almost Ready..." />
      )
    ) : (
      <Redirect to="/" />
    );

  return (
    <Router>
      <Switch>
        <Suspense fallback={<LoadingScreen title="Just a moment..." />}>
          <Route
            path="/"
            exact
            render={() => conditionalLandingPageContent()}
          />
          <Route
            path="/home"
            exact
            render={() => conditionalHomePageContent()}
          />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          <Route path="/help" exact component={HelpPage} />
          <Route path="/about" exact component={AboutPage} />
          <Redirect to="/" />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default routes;
