require("dotenv").config();

const { getAllUsers } = require("./dbAccessHelpers");
const {
  calcFreeTime,
  retrievePocketArticles,
  createGCalEvent,
} = require("./helperFunctions");

const scheduleArticles = async () => {
  console.log("scheduling all articles now...");
  try {
    //get all users
    let allUsers = await getAllUsers();

    //loop through all the users
    for (let k in allUsers) {
      try {
        console.log(`scheduling started for user ${k}`);

        //destructure all user data
        let {
          googleAccess,
          googleRefresh,
          pocketAccess,
          timeDailyRead,
          timeZone,
          offset,
          email,
          totalUnread,
        } = allUsers[k];
        let [hours, minutes] = allUsers[k].timeToSchedule.split(":");

        console.log(googleAccess, googleRefresh, hours, minutes, pocketAccess);

        //call rest of the functions here
        let { freeList, calendar } = await calcFreeTime(
          googleAccess,
          googleRefresh,
          timeDailyRead,
          timeZone,
          hours,
          minutes
        );

        let {
          pocketArticles,
          pocketArticlesDesc,
          pocketModify,
          newOffset,
          temp,
        } = await retrievePocketArticles(pocketAccess, timeDailyRead, offset);

        await createGCalEvent(
          pocketAccess,
          timeDailyRead,
          timeZone,
          email,
          freeList,
          calendar,
          pocketArticles,
          pocketArticlesDesc,
          pocketModify,
          newOffset,
          temp
        );
      } catch (err) {
        //log thrown errors and go to the next user
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = scheduleArticles;
