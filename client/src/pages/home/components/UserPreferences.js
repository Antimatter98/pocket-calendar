import React, { useState } from "react";
import Pulse from "react-reveal/Pulse";

import FormComponent from "./FormComponent";
import { SavedModal, SavingModal } from "./SavingStatusModals";

const UserPreferences = ({
  onButtonClick,
  loggedUser,
  db,
  currentState,
  stateFn
}) => {
  //saving modal state
  const [open, setModalState] = useState(false);

  //for switching from saving modal to saved modal
  const resetModal = () => {
    setModalState(false);
    let tempParentState = currentState;
    tempParentState = {
      ...tempParentState,
      prefSaved: false
    };
    stateFn(tempParentState);
    //resetPrefModal();
  };

  //to display user stats
  const userStats = () => {
    if (currentState.pocketOffset > 0) {
      if (currentState.totalUnread === 0) {
        return (
          <div align="center">
            <h6 className="text-user">Your Pocket stats: </h6>
            <p className="text-user">{`Delivered items: ${currentState.pocketOffset}  ||  Unread items: ${currentState.totalUnread}`}</p>
            <h6 className="text-warning">
              There are no new articles to deliver! Do add new articles to your
              Pocket Account!
            </h6>
          </div>
        );
      }
      return (
        <div align="center">
          <h6 className="text-user">Your Pocket stats: </h6>
          <p className="text-user">{`Delivered items: ${currentState.pocketOffset}  ||  Unread items: ${currentState.totalUnread}`}</p>
        </div>
      );
    } else {
      return (
        <div align="center">
          <h6 className="text-user">
            New users! Make sure you click on "Save Preferences", otherwise
            articles cannot be delivered to you! <br /> Old user? Maybe there
            are no unread items for you!
          </h6>
        </div>
      );
    }
  };

  return (
    <div className="home-user">
      <SavingModal open={open} toggle={setModalState} />
      <SavedModal prefSaved={currentState.prefSaved} resetModal={resetModal} />
      <div align="center">
        <br />
        <Pulse big>
          <h5 className="text-user">Edit your preferences: </h5>
        </Pulse>
        <FormComponent
          onButtonClick={onButtonClick}
          loggedUser={loggedUser}
          db={db}
          currentState={currentState}
          stateFn={stateFn}
          toggle={setModalState}
        />
      </div>
      <br />
      {userStats()}
      <br />
    </div>
  );
};

export default UserPreferences;
