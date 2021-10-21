const axios = require('axios')
const postmsg = async () => {            
    var json = 
        { 
        "notification": {
        "title": "Hi admin", 
        "body": "Un utilisateur a éffectué un pari"
        },
        "to":"fW2f1yafBfq6UQoD1p-Z06:APA91bGLauHt6yZtTkxaHRnmQJ1rGNPDv5MfY4riWOeag0okmJCbTRCi9MOswVzY6biyWtRq3scKFTLgLiWgEGhrQ2LP-AOVyCV4s9EapLJgbdaOAL_SqDZBPur00HNA9LPAhoHk1aAJ"
        }
    //deCSzrWwU6vUMZOtaN0kRk:APA91bGbtpnhhAihTSoOUc-rd_M0uBJUNk7gLJ0vn0eQzsmdYGoodihnMXVFWDQk3STg_iBAeaCQePzuonXvf73AsZcuEt7Pg2G-96DVK1ekbfWupOhlnEh9yIrpdsa8JHXe1qYjM9JA
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAA-UOHAMM:APA91bE7xDdzuktya8O4p2YMMxwz8oDWs-iJwdnx8FSDxfQX_oaLBGV2R3R8wfzqktdbOymOTKZ9YISYsNziEqnO6NG4FbXH7CjhYh_kfh_z17BYQAMmImRtmeS5_KWD8R3MPuPOAkkD' }
    let options = { headers: headers };
    try {
        return await axios.post("https://fcm.googleapis.com/fcm/send",json,options);
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
