import React from "react";

import Footer from "../footer";
import NavComp from "../NavComp";

//base component for user home page [used by /src/pages/home/home.js]
const HomeBase = ({
  handleSignout,
  handleUnsubscribe,
  loggedUser,
  db,
  children
}) => {
  return (
    <div>
      <NavComp
        onSignOutClick={handleSignout}
        onUnsubscribeClick={handleUnsubscribe}
        loggedUser={loggedUser}
        db={db}
      />
      {children}
      <Footer />
    </div>
  );
};

export default HomeBase;
