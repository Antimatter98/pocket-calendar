import React from "react";
import Footer from "../footer";
import SimpleNav from "../simpleNav";

//base component for misc pages [used by privacy, help and about pages]
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
