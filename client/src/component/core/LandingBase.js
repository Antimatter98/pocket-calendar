import React from "react";

import Footer from "../footer";

const LandingBase = ({ children }) => {
  return (
    <div align="center">
      {children}
      <Footer />
    </div>
  );
};

export default LandingBase;
