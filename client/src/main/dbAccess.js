const addUsertoDb = async (user, db, currState, stateFn) => {
  const doc = await db
    .collection(process.env.REACT_APP_DATABASE_NAME)
    .doc(user.email)
    .get();
  //Check if user exists
  if (doc.exists) {
    currState = {
      ...currState,
      timeDailyRead: doc.data().timeDailyRead,
      timeToSchedule: doc.data().timeToSchedule,
      timeZone: doc.data().timeZone,
      pocketOffset: doc.data().offset,
      totalUnread: doc.data().totalUnread,
      email: user.email
    };
    //check if pocket access is granted
    if (doc.data().pocketAccess) {
      currState = {
        ...currState,
        pocketExists: true
      };
    }
    //check if calendar access is granted
    if (doc.data().googleAccess && doc.data().googleRefresh) {
      currState = {
        ...currState,
        googleExists: true
      };
    } else {
      currState = {
        ...currState,
        googleExists: false
      };
    }

    //update user profile name and photo url
    await db
      .collection(process.env.REACT_APP_DATABASE_NAME)
      .doc(user.email)
      .update({
        displayName: user.displayName,
        displayPhoto: user.photoURL
      });

    currState = {
      ...currState,
      dataLoaded: true
    };
  } else {
    await db
      .collection(process.env.REACT_APP_DATABASE_NAME)
      .doc(user.email)
      .set({
        email: user.email,
        displayName: user.displayName,
        displayPhoto: user.photoURL,
        timeDailyRead: 20,
        timeToSchedule: "16:00",
        timeZone: "+05:30",
        offset: 0,
        totalUnread: 0
      });
    currState = {
      ...currState,
      dataLoaded: true,
      email: user.email
    };
  }

  stateFn(currState);
};

//checkUser here, save data accordingly
const checkUser = (user, db, currState, stateFn) => {
  if (user) {
    addUsertoDb(user, db, currState, stateFn);
    return true;
  } else {
    return false;
  }
};

//save preferences clicked, save data accordingly
const clicked = async (e, a, user, db, currState, stateFn) => {
  let modTime = a.Hours.toString() + ":" + a.Mins.toString();
  const doc = await db
    .collection(process.env.REACT_APP_DATABASE_NAME)
    .doc(user.email)
    .get();
  if (doc.exists) {
    await db
      .collection(process.env.REACT_APP_DATABASE_NAME)
      .doc(user.email)
      .update({
        timeDailyRead: a.timeRead,
        timeToSchedule: modTime,
        timeZone: a.timeZone,
        allDataSet: true
      });

    currState = {
      ...currState,
      prefSaved: true
    };
  } else {
    //console.log("error saving pocket to db");
  }
  stateFn(currState);
};

const resetPrefModal = (e) => {
  window.location.reload();
};

export default { addUsertoDb, clicked, checkUser, resetPrefModal };
