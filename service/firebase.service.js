const axios = require('axios')
const postmsg = async () => {            
    var json = 
        { 
        "notification": {
        "title": "Hi admin", 
        "body": "Un utilisateur a éffectué un pari"
        },
        "to":"dpeeVS8qYxo3fHTGFAxLYB:APA91bGnv0tfx49dcLbBX2PQUwbg6ir1AbKqJxp9oWtyyEh85tYNBPiV661H6_mEwHyQ0vThsu3Ld9IDu8GcSqLSakFT2KQdR9ulTHnigx_RFTnYIxkA98rUMb8jLvG_er7DSTXXhBQu"
        }
    
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAA-UOHAMM:APA91bE7xDdzuktya8O4p2YMMxwz8oDWs-iJwdnx8FSDxfQX_oaLBGV2R3R8wfzqktdbOymOTKZ9YISYsNziEqnO6NG4FbXH7CjhYh_kfh_z17BYQAMmImRtmeS5_KWD8R3MPuPOAkkD' }
    let options = { headers: headers };
    try {
        return await axios.post("https://fcm.googleapis.com/fcm/send",json,options);
      } catch (error) {
        console.error(error);
      }

}

module.exports = {
    postmsg,
}