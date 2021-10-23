const axios = require("axios");
const dotenv = require("dotenv");
const { response } = require("express");

// chargement de la viarable d'environnement
dotenv.config();
const url = process.env.API_URL;
// const url = process.env.API_URL_LOCAL;

const getPayments = async () => {
  try {
    return await axios.get(url + "/api/payments");
  } catch (error) {
    console.error(error);
  }
};

const insertPayment = async (payment) => {
  try {
    console.log(payment);
    return await axios.post(url + "/api/payments", payment);
  } catch (error) {
    console.error(error);
  }
};
// const updatePayment = async (payment) => {
//   try {
//     return await axios.put(url + "/api/payments", payment);
//   } catch (error) {
//     console.error(error);
//   }
// };
// const updatePatchPayment = async (payment) => {
//   try {
//     return await axios.patch(url + "/api/payments", payment);
//   } catch (error) {
//     console.error(error);
//   }
// };

const paymentsHistoricByUserByType = async (usertypejson) => {
  try {
    return await axios.post(url + "/api/payments/historic", usertypejson);
  } catch (error) {
    console.error(error);
  }
};

const topUserWithMiseMax = async (limit) => {
  try {
    return await axios.post(url + "/api/top/user/investment", limit);
  } catch (error) {
    console.error(error);
  }
};

const mvntAfterMatch = async (mvntjson) => {
  try {
    return await axios.post(url + "/api/movement/after/match", mvntjson);
  } catch (error) {
    console.error(error);
  }
};

const soldeSite = async () => {
  try {
    let static = {
      "debit":135444,"credit":80689,"solde":122245751
    }
    return await static; 
    //await axios.get(url + "/api/solde/site");
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getPayments,
  insertPayment,
  // updatePayment,
  // updatePatchPayment,
  paymentsHistoricByUserByType,
  topUserWithMiseMax,
  mvntAfterMatch,
  soldeSite
};
