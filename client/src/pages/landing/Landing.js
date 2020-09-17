import React, { lazy } from "react";

//lazy loading all landing page components
const LandingBase = lazy(() => import("../../component/core/LandingBase"));
const LoadingScreen = lazy(() => import("../../component/core/LoadingScreen"));
const LandingInfo = lazy(() => import("./components/LandingInfo"));
const LandingMain = lazy(() => import("./components/LandingMain"));

const Landing = ({ googleAuth, onButtonClick }) => {
  return googleAuth === undefined ? (
    <LoadingScreen />
  ) : (
    <LandingBase>
      <LandingMain onButtonClick={onButtonClick} />
      <LandingInfo />
    </LandingBase>
  );
};

export default Landing;
