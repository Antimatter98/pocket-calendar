var axios = require("axios");
require("dotenv").config();

exports.fetchArticles = async (pocketAccess, offset) => {
  let articlesFetched = await axios.get("https://getpocket.com/v3/get", {
    params: {
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      access_token: pocketAccess,
      state: "unread",
      //offset: offset,
      //count: 15,
      //tag: '_untagged_',
      sort: "oldest",
      contentType: "article",
      detailType: "complete",
    },
  });
  return articlesFetched;
};

exports.tagArticles = async (pocketAccess, articleList) => {
  let articleTaggedResponse = await axios.post(
    "https://getpocket.com/v3/send?actions=" +
      encodeURIComponent(JSON.stringify(articleList)) +
      "&access_token=" +
      pocketAccess +
      "&consumer_key=" +
      process.env.POCKET_CONSUMER_KEY
  );

  return articleTaggedResponse;
};
