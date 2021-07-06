const axios = require("axios");
const dotenv = require("dotenv");

// chargement de la viarable d'environnement
dotenv.config();
const url = process.env.API_URL;

const getMatchMostBet = async () => {
    try {
      return await axios.post(url + "api/match/mostbet");
    } catch (error) {
      console.error(error);
    }
};

module.exports = {
  getMatchMostBet
}
  



