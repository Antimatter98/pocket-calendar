import React from "react";
import ReactLoading from "react-loading";

//Base component for Loading screen [used by landing page]
const LoadingScreen = ({ title = "Loading..." }) => {
  return (
    <div className="loading-screen" align="center">
      {" "}
      <div className="load-cont">
        {" "}
        <h3 className="text">{title}</h3>
        <ReactLoading
          type={"bars"}
          color={"#fff"}
          height={100}
          width={100}
        />{" "}
      </div>{" "}
    </div>
  );
};

export default LoadingScreen;
