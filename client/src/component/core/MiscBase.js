import React from "react";
import Footer from "../footer";
import SimpleNav from "../simpleNav";

const MiscBase = ({ children }) => {
  return (
    <div className="text-privacy">
      <SimpleNav />
      {children}
      <Footer />
    </div>
  );
};

export default MiscBase;
