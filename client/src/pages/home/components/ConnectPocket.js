import React from "react";
import Pulse from "react-reveal/Pulse";
import { Link, withRouter } from "react-router-dom";

const ConnectPocket = ({ onPocketButtonClick }) => {
  return (
    <Pulse cascade>
      <div align="center" className="home-user">
        <Pulse big>
          <h1 className="text-user">Please connect your Pocket account</h1>
        </Pulse>
        {/* <button onClick={e => this.props.onPocketButtonClick()}>Connect to Pocket</button> */}
        <div className="pocket-btn" onClick={(e) => onPocketButtonClick()}>
          <div className="pocket-icon-wrapper">
            <img
              className="pocket-icon"
              src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_getpocket-512.png"
              alt="pocket-logo"
            />
          </div>
          <p className="btn-text">
            <b>Pocket</b>
          </p>
        </div>
        <p className="text-user">
          For more clarity on what data is collected and how it is used, read
          the <Link to="/privacy-policy">Privacy policy</Link>
        </p>
      </div>
    </Pulse>
  );
};

export default withRouter(ConnectPocket);
