const axios = require("axios");
const postmsg = async () => {
  var json = {
    notification: {
      title: "Hi admin",
      body: "Un utilisateur a effectue un pari",
    },
    to: "d2En0TTRurekk1cx1igz0D:APA91bHwJCKC3SCl0aHYdDKpwFNg13XoJxE6PnYmf71FS9NR312XAMSuDCbqp3X35-KLO6RkpNdpzXzbi8TUPm1pwr3jZVENUahkDJ-ydzwSuTDkwdVlbQlMkMT1KJCYRqIzlubWJke2",
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "key=AAAA-UOHAMM:APA91bE7xDdzuktya8O4p2YMMxwz8oDWs-iJwdnx8FSDxfQX_oaLBGV2R3R8wfzqktdbOymOTKZ9YISYsNziEqnO6NG4FbXH7CjhYh_kfh_z17BYQAMmImRtmeS5_KWD8R3MPuPOAkkD",
  };
  let options = { headers: headers };
  try {
    return await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      json,
      options
    );
  } catch (error) {
    console.error(error);
  }
};

const notifyMobile = async (team1, team2, score_1, score_2) => {
  var admin = require("firebase-admin");

  var serviceAccount = require("../wannabet-1aaf4-firebase.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wannabet-1aaf4.firebaseio.com",
  });
  var topic = "general";

  let winner = "";
  if(score_1 > score_2)  winner = team1;
  else winner = team2;

  var message = {
    notification: {
      title: winner + " a gagné !",
      body: team1 + " " + score_1 + " - " + score_2 + " " + team2,
    },
    topic: topic,
  };

  // Send a message to devices subscribed to the provided topic.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

module.exports = {
  postmsg,
  notifyMobile,
};
