import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../save-icon.svg";

const LandingMain = ({ onButtonClick }) => {
  const handleLogoLoad = (e) => {
    document.getElementsByClassName("logo-main")[0].style = "display: block;";
  };

  return (
    <div className="home">
      <h1 className="title-top" id="top">
        Pocket
      </h1>
      <img
        className="logo-main"
        src={logo}
        alt="pocket-calendar-logo"
        style={{ display: "block" }}
        onLoad={handleLogoLoad}
      />
      <h1 className="title-down">Calendar</h1>
      <h6 className="text">
        Your pocket bookmarks delivered straight to your google calendar
      </h6>
      <div className="google-btn" onClick={(e) => onButtonClick(e, {})}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google-icon"
          />
        </div>
        <p className="btn-text">
          <b>Sign in with Google</b>
        </p>
      </div>
      <p className="link">
        By Signing up, you agree to the{" "}
        <Link to="/privacy-policy" className="link">
          <u>Privacy Policy</u>
        </Link>
      </p>
      <p className="cookie-text">
        Issues with signin or signup? Make sure 3rd party cookies are enabled in
        your browser.
      </p>
      <p className="cookie-text">
        <Link to="/help" className="link">
          <u>For more help, click here</u>
        </Link>
      </p>
    </div>
  );
};

export default withRouter(LandingMain);
