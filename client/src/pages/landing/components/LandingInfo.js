import React from "react";
import { Link, withRouter } from "react-router-dom";

const LandingInfo = () => {
  return (
    <React.Fragment>
      <div className="home-alt text">
        <div className="content-data">
          <h3 className="text">What is Pocket Calendar all about?</h3>
          <p>
            Pocket calendar is built to help those people who often bookmark
            items to their pocket account and may forget to checkout these items
            again.
          </p>
          <p>
            This WebApp schedules unread items from the users' pocket account to
            his/her Google Calendar so that they can check them out their own
            convenience!
          </p>
          <p>
            A small bunch of articles are scheduled everyday for you, based on
            your preferred daily reading time.
          </p>
        </div>
      </div>
      <div className="home text">
        <div className="content-data">
          <h3 className="text">Signing up is just 4 steps away...</h3>
          <p>1. Sign up with your Google account</p>
          <p>2. Grant restricted access to your Google calendar</p>
          <p>3. Grant restricted access to your Pocket account</p>
          <p>
            4. Save your preferences: daily reading time, time to Schedule
            articles and your Time Zone
          </p>
        </div>
        <br />
        <p>
          For more clarity on what data is collected and how it is used, read
          the{" "}
          <Link to="/privacy-policy" className="text">
            <u>Privacy policy</u>
          </Link>
        </p>
        <br />
        <p>So what are you waiting for? Sign up for Pocket Calendar now!</p>
        <br />
        {/* <a href="#top" className="text"> ^ Scroll to top</a> */}
      </div>
    </React.Fragment>
  );
};

export default withRouter(LandingInfo);
