import React from "react";

import Footer from "../footer";

//base component for landing page [used by /src/pages/landing/Landing.js]
const LandingBase = ({ children }) => {
  return (
    <div align="center">
      {children}
      <Footer />
    </div>
  );
};

export default LandingBase;
