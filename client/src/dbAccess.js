const addUsertoDb = async (user, db, currState, stateFn) => {
    const doc = await db.collection(process.env.REACT_APP_DATABASE_NAME).doc(user.email).get();
    //Check if user exists
    if(doc.exists){
    //   this.setState({
    //     timeDailyRead: doc.data().timeDailyRead,
    //     timeToSchedule: doc.data().timeToSchedule,
    //     timeZone: doc.data().timeZone,
    //     pocketOffset: doc.data().offset,
    //     totalUnread: doc.data().totalUnread
    //   });
        currState = {
            ...currState,
            timeDailyRead: doc.data().timeDailyRead,
            timeToSchedule: doc.data().timeToSchedule,
            timeZone: doc.data().timeZone,
            pocketOffset: doc.data().offset,
            totalUnread: doc.data().totalUnread
        }
      //check if pocket access is granted
      if(doc.data().pocketAccess){         
        // this.setState({
        //   pocketExists: true
        // });
        currState = {
            ...currState,
            pocketExists: true
        }
      }
      else{
        if((Object.keys(currState.userPocket).length !== 0)){
          //console.log("Adding pocket...");
          const newDoc = await db.collection(process.env.REACT_APP_DATABASE_NAME).doc(user.email).update({
            pocketAccess: currState.userPocket.accessToken
          });
        //   this.setState({
        //     pocketExists: true
        //   });
            currState = {
                ...currState,
                pocketExists: true
            }
        }
        else{
        //   this.setState({
        //     pocketExists: false
        //   });
            currState = {
                ...currState,
                pocketExists: false
            }
        }
      }

      //check if calendar access is granted
      if(doc.data().googleAccess && doc.data().googleRefresh){  
        // this.setState({
        //   googleExists: true
        // });
        currState = {
            ...currState,
            googleExists: true
        }
      }
      else{
        // this.setState({
        //   googleExists: false
        // });
        currState = {
            ...currState,
            googleExists: false
        }
      }
      
      //update user profile name and photo url
      const newDoc = await db.collection(process.env.REACT_APP_DATABASE_NAME).doc(user.email).update({
        displayName: user.displayName,
        displayPhoto: user.photoURL,   
      });
      
    //   this.setState({
    //     dataLoaded: true
    //   });
        currState = {
            ...currState,
            dataLoaded: true
        }
      
    }
    else{        
      const newDoc = await db.collection(process.env.REACT_APP_DATABASE_NAME).doc(user.email).set({
        email: user.email,
        displayName: user.displayName,
        displayPhoto: user.photoURL,         
        timeDailyRead: 20,
        timeToSchedule: "16:00",
        timeZone: "+05:30",
        offset: 0,
        totalUnread: 0
      });
    //   this.setState({
    //     dataLoaded: true
    //   });
        currState = {
            ...currState,
            dataLoaded: true
        }
    }

    stateFn(currState);

  }

  //checkUser here, save data accordingly
  const checkUser = (user, db, currState, stateFn) => {
    if(user){
      //adding user to db
      //console.log("checking user...");
      addUsertoDb(user, db, currState, stateFn);       
      return true;
    }
    else{        
      return false;
    }
  }

  //save preferences clicked, save data accordingly
  const clicked = async(e, a, user, db, currState, stateFn) => {
    
    let modTime = (a.Hours).toString() + ':' + (a.Mins).toString();
    const doc = await db.collection(process.env.REACT_APP_DATABASE_NAME).doc(user.email).get();
    if(doc.exists){
        const newDoc = await db.collection(process.env.REACT_APP_DATABASE_NAME).doc(user.email).update({
          timeDailyRead: a.timeRead,
          timeToSchedule: modTime,
          timeZone: a.timeZone,
          allDataSet: true
        });
        
        // this.setState({
        //   prefSaved: true
        // });
        currState = {
            ...currState,
            prefSaved: true
        }
    }
    else{
      //console.log("error saving pocket to db");
    }
    stateFn(currState);
  }

  const resetPrefModal = (e) => {
    window.location.reload();
    // this.setState({
    //   prefSaved: false
    // });
    // currState = {
    //     ...currState,
    //     prefSaved: true
    // }
    // stateFn(currState);
  }

export default {addUsertoDb, clicked, checkUser, resetPrefModal};