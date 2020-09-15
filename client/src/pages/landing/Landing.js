import React, { lazy } from "react";

const LandingBase = lazy(() => import("../../component/core/LandingBase"));
const LoadingScreen = lazy(() => import("../../component/core/LoadingScreen"));
const LandingInfo = lazy(() => import("./components/LandingInfo"));
const LandingMain = lazy(() => import("./components/LandingMain"));

// import LandingBase from "../../component/core/LandingBase";
// import LoadingScreen from "../../component/core/LoadingScreen";
// import LandingInfo from "./components/LandingInfo";
// import LandingMain from "./components/LandingMain";

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
