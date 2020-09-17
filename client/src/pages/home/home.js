import React from "react";

import HomeBase from "../../component/core/HomeBase";
import ConnectGoogle from "./components/ConnectGoogle";
import ConnectPocket from "./components/ConnectPocket";
import UserPreferences from "./components/UserPreferences";

const home = (props) => {
  //render the page body conditionally based on props [google connect, pocket connect or the main user homepage]
  const conditionalRenderBody = () =>
    props.currentState.googleExists ? (
      props.currentState.pocketExists ? (
        <UserPreferences
          onButtonClick={props.onButtonClick}
          loggedUser={props.loggedUser}
          db={props.db}
          currentState={props.currentState}
          stateFn={props.stateFn}
          resetPrefModal={props.resetPrefModal}
        />
      ) : (
        <ConnectPocket onPocketButtonClick={props.onPocketButtonClick} />
      )
    ) : (
      <ConnectGoogle onGoogleCalClick={props.onGoogleCalClick} />
    );

  return (
    <HomeBase
      handleSignout={props.handleSignout}
      handleUnsubscribe={props.handleUnsubscribe}
      loggedUser={props.loggedUser}
    >
      {conditionalRenderBody()}
    </HomeBase>
  );
};

export default home;
