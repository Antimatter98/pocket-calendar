import React from "react";
import Pulse from "react-reveal/Pulse";

import "../../../buttons.scss";

const ConnectGoogle = ({ onGoogleCalClick }) => {
  return (
    <Pulse cascade>
      <div align="center" className="home-user">
        <Pulse big>
          <br />
          <h1 className="text-user">Give access to your google calendar</h1>
        </Pulse>
        {/* <button onClick={e => this.props.onGoogleCalClick()}>Google calendar</button> */}
        <Pulse big>
          <div className="google-btn" onClick={(e) => onGoogleCalClick()}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Google_Calendar_icon.svg"
                alt="calendar-logo"
              />
            </div>
            <p className="btn-text">
              <b>Google Calendar</b>
            </p>
          </div>
          <br />
          <h6 className="text-user">
            *Alert: Make sure you select the same google account you used to
            signup for this service!*
          </h6>
          <p className="text-user">
            For more clarity on what data is collected and how it is used, read
            the <a href="/privacy-policy">Privacy policy</a>
          </p>
          {/* <h6 className="text-user">*If any problem persists, click on the profile icon to unsubscribe and signup again for the service*</h6> */}
        </Pulse>
      </div>
    </Pulse>
  );
};

export default ConnectGoogle;
