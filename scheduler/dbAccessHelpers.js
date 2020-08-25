const db = require("../extras/firebaseForNode");
require("dotenv").config();

exports.getAllUsers = async () => {
  try {
    let allUsers = [];
    const allUserDocs = await db.collection(process.env.DATABASE_NAME).get();
    allUserDocs.forEach((doc) => {
      if (doc.data().allDataSet) {
        console.log("Pushing: ", doc.data());
        allUsers.push(doc.data());
      }
    });
    return allUsers;
  } catch (err) {
    throw `Error getting all the users: \n{err}`;
  }
};

exports.updateOffset = async (email, offset, totalUnread) => {
  try {
    await db
      .collection(process.env.DATABASE_NAME)
      .doc(email)
      .update({ offset: offset, totalUnread: totalUnread });
  } catch (err) {
    throw "\nError saving updated data to database: " + err;
  }
};
