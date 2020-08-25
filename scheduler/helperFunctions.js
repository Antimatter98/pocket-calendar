const { google } = require("googleapis");
require("dotenv").config();

var client = require("../extras/clientSecret");
const { fetchArticles, tagArticles } = require("./callPocketAPI");
const { updateOffset } = require("./dbAccessHelpers");

exports.createGCalEvent = async (
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
) => {
  try {
    if (pocketArticles.length > 0) {
      let startTime;
      let endTime;
      console.log("Time Zone: ", timeZone);

      startTime = "" + freeList[freeList.length - 1].split("Z")[0] + timeZone;
      endTime =
        "" +
        new Date(
          new Date(freeList[freeList.length - 1]).getTime() +
            60000 * timeDailyRead
        )
          .toISOString()
          .split("Z")[0] +
        timeZone;

      var summary = `Here are ${pocketArticles.length} items scheduled for you by Pocket Calendar`;
      if (pocketArticles.length === 1) {
        summary = `Here is ${pocketArticles.length} item scheduled for you by Pocket Calendar`;
      }

      var event = {
        summary: summary,
        location: "Pocket-Calendar",
        description: pocketArticlesDesc,
        start: {
          dateTime: startTime,
        },
        end: {
          dateTime: endTime,
        },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 10 }],
        },
      };
      const evnt = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      console.log("Event created: %s", evnt);
      event = {};

      pocketArticlesDesc = "";
      pocketArticles = [];
      try {
        let pocketModifyResult = await tagArticles(pocketAccess, pocketModify);
        if (pocketModifyResult.data) {
          console.log("added tags successfully");
          await updateOffset(
            email,
            newOffset,
            Object.keys(temp).length - newOffset
          );
        } else {
          console.log("\nError with modifying pocket tag");
        }
      } catch (error) {
        throw "\nPocket API modify tag error: " + error;
      }
    } else {
      console.log("Empty pocket");
      await updateOffset(
        email,
        newOffset,
        Object.keys(temp).length - newOffset
      );
    }
  } catch (err) {
    throw "\nSome error in creating event: " + error;
  }
};

exports.retrievePocketArticles = async (
  pocketAccess,
  timeDailyRead,
  offset
) => {
  let pocketArticles = [];
  try {
    let pockets = await fetchArticles(pocketAccess, offset);
    if (pockets) {
      let timeScheduling = 0;
      let counter = 0;
      let newOffset = 0;
      let temp = pockets.data.list;
      let pocketArticlesDesc = "";
      let pocketModify = [];

      for (let key in temp) {
        if (timeScheduling >= timeDailyRead) {
          //continue;
          break;
        } else {
          if (temp[key].tags) {
            let skip = 0;
            for (item in temp[key].tags) {
              if (item.localeCompare("served by pocketcalendar") === 0) {
                skip = 1;
                break;
                //continue;
              }
            }
            if (skip === 1) {
              newOffset += 1;
              continue; //this skips the article tagged by pocketcalendar
            }
          }
          pocketArticles.push({
            id: key,
            url: temp[key].resolved_url,
            resolved_title: temp[key].resolved_title,
            word_count: temp[key].word_count,
            time_read: temp[key].word_count / 180,
          });
          pocketModify.push({
            action: "tags_add",
            item_id: key,
            tags: ["served by pocketcalendar"],
          });
          pocketArticlesDesc += `\n ${counter + 1}. ${
            temp[key].resolved_title
          }\n URL: ${
            temp[key].resolved_url
          }\n (OR) Read it directly inside the pocket WebApp: ${
            "https://app.getpocket.com/read/" + key
          }\n`;
        }
        timeScheduling += temp[key].word_count / 180;
        counter += 1;
        newOffset += 1;
      }
      pocketArticlesDesc +=
        "\nPro Tip: Reading these articles using the pocket WebApp link provided gives you more manual control over what you want to do after reading an article (eg. Archiving it manually just after finishing reading!)\nTo access these articles, make sure you are logged in using the same pocket account you use with Pocket-Calendar.\n";
      return {
        pocketArticles,
        pocketArticlesDesc,
        pocketModify,
        newOffset,
        temp,
      };
    } else {
      console.log("Pocket API error");
    }
  } catch (err) {
    throw "Pocket API error: " + err;
  }
};

exports.calcFreeTime = async (
  googleAccess,
  googleRefresh,
  timeDailyRead,
  timeZone,
  hours,
  minutes
) => {
  const { client_secret, client_id, redirect_uris } = client.client.web;
  oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.credentials = {
    refresh_token: googleRefresh,
    access_token: googleAccess,
  };

  let calEvents = [];
  let freeList = [];
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    {
      /* TIMEZONE OF SERVER MIGHT BE CONSIDERED WHEN SETTING DT AND TMRW
        //important!!
        //timezone issue might persist here (for dt and tmrw)
        //since the timezone value is taken directly from the times obtained from the user's google calendar 
        */
    }
    let dtCal = new Date();
    //dt = new Date(dt.toISOString().split('Z')[0] + timeZone);
    let dt = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      parseInt(hours),
      parseInt(minutes)
    );

    if (timeZone[0].localeCompare("+") === 0) {
      dtCal.setHours(
        parseInt(hours - parseInt(timeZone.split("+")[1].split(":")[0]))
      );
      dtCal.setMinutes(
        parseInt(minutes - parseInt(timeZone.split("+")[1].split(":")[1]))
      );
      console.log("+ tz set");
    } else {
      dtCal.setHours(
        parseInt(hours + parseInt(timeZone.split("-")[1].split(":")[0]))
      );
      dtCal.setMinutes(
        parseInt(minutes + parseInt(timeZone.split("-")[1].split(":")[1]))
      );
      console.log("- tz set");
    }

    let tmrw = new Date(dt);
    tmrw.setDate(tmrw.getDate() + 1);
    let tmrwCal = new Date(dtCal);
    tmrwCal.setDate(tmrwCal.getDate() + 1);

    console.log(dt);
    console.log(tmrw);
    console.log(dtCal);
    console.log(dtCal);
    //console.log(dtCal.toISOString());

    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: dtCal.toISOString(),
      timeMax: tmrwCal.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    console.log("=> ", timeZone);

    const events = res.data.items;
    if (events.length) {
      console.log("Upcoming 10 events:");
      events.map((event, i) => {
        let start = event.start.dateTime;
        let end = event.end.dateTime;
        let diff = new Date(end.split("+")[0]) - new Date(start.split("+")[0]);
        let e = {
          start: start.split("+")[0] + "Z",
          end: end.split("+")[0] + "Z",
          diff: diff,
        };
        calEvents.push(e);
        console.log(e);
      });
    } else {
      console.log("No upcoming events found.");
    }
    console.log("Check the busy events list");

    let ctr = 0; //used for freelist
    //calculate free time
    console.log("free time list");
    let i;
    let t = 0;
    let tmp = dt;
    //TMP USED AS A TEMP DATE OBJECT (USED LATER FOR CALC FREE TIME)
    tmp = tmp.toISOString();
    console.log(tmp);

    //IF 1 OR NONE CAL EVENTS
    //  IF 1
    //      IF CAL FREE AT USER'S TIME
    //          SCHEDULE AT USER'S TIME
    //      ELSE
    //          SCHEDULE AFTER EVENT OVER
    //  ELSE
    //      SCHEDULE AT USER'S TIME
    //ELSE
    //  ITERATE THROUGH CAL EVENTS LIST
    //      CHECK FOR FREE TIME BETWEEN EVENTS (BY CALC TIME DIFF)

    if (calEvents.length <= 1) {
      console.log("less");
      if (calEvents.length) {
        console.log("less than");
        if (
          new Date(calEvents[0].end) > new Date(tmp) &&
          new Date(calEvents[0].start) > new Date(tmp) &&
          new Date(calEvents[0].start) - new Date(tmp) >= 60000 * timeDailyRead
        ) {
          freeList.push(tmp);
        } else {
          freeList.push(calEvents[0].end);
        }
      } else {
        freeList.push(tmp);
      }
      ctr = ctr + 1;
      console.log("incremented, added");
    } else {
      while (new Date(tmp) < new Date(tmrw) && freeList.length < 1) {
        for (i = t; i < calEvents.length - 1; i++) {
          if (i === 0) {
            if (
              new Date(calEvents[0].end) > new Date(tmp) &&
              new Date(calEvents[0].start) > new Date(tmp) &&
              new Date(calEvents[0].start) - new Date(tmp) >=
                60000 * timeDailyRead
            ) {
              freeList[ctr] = tmp;
              ctr = ctr + 1;
              console.log(`pushed ${tmp}`);
              break;
            }
          }
          if (
            new Date(calEvents[i].end) < new Date(tmp) &&
            new Date(calEvents[i + 1].start) > new Date(tmp)
          ) {
            console.log(
              "Comparing: " +
                calEvents[i + 1].start +
                " and " +
                calEvents[i].end
            );
            if (
              new Date(calEvents[i + 1].start) - new Date(calEvents[i].end) >=
              60000 * timeDailyRead
            ) {
              freeList[ctr] = calEvents[i].end;
              ctr = ctr + 1;
              t = i + 1;
              console.log("pushed time: " + calEvents[i].end);
              break;
            }
          }
        }
        tmp = new Date(tmp);
        tmp.setTime(tmp.getTime() + parseInt(900000));
        tmp = tmp.toISOString();
        tmp = tmp.split("+")[0];
      }
      console.log("Last element: " + calEvents[i].end);
      freeList[ctr] = calEvents[i].end;
    }
    if (freeList.length) {
      console.log("printing the free list...");
      freeList.forEach((e) => console.log(e));
    }
    console.log("Done");
    console.log(freeList);
    console.log("Time Zone: ", timeZone);

    return { freeList, calendar };
  } catch (err) {
    throw "The API returned an error: " + err;
  }
};
