const axios = require("axios");
const dotenv = require("dotenv");
// const { response } = require("express");

// chargement de la viarable d'environnement
dotenv.config();
const url = process.env.API_URL;

const getParis = async () => {
  try {
    return await axios.get(url + "api/paris");
  } catch (error) {
    console.error(error);
  }
};

// encore à faire
const deletePari = async () => {
  try {
    return await axios.delete(url + "api/paris");
  } catch (error) {
    console.error(error);
  }
};

const updatePari = async (pari) => {
  try {
    return await axios.patch(url + "api/pari", pari);
  } catch (error) {
    console.error(error);
  }
};

const insertPari = async (pari) => {
  try {
    console.log(pari);
    return await axios.post(url + "api/paris", pari);
  } catch (error) {
    console.error(error);
  }
};
const getPariCustom = async (iduser) => {
  try {
    console.log(iduser);
    return await axios.get(url + "api/pari/custom", {params: {id: iduser}});
  } catch (error) {
    console.error(error);
  }
};

const getPariInProgress = async (iduser) => {
  try {
    return await axios.get(url + "api/pari/details", {params: {iduser: iduser}});
  } catch (error) {
    console.error(error);
  }
};

const insertPariDetail = async (pari) => {
  try {
    console.log(pari);
    return await axios.post(url + "api/pari/details", pari);
  } catch (error) {
    console.error(error);
  }
};

const getPariStatistic = async() => {
  try {
    return await axios.get(url + "api/pari/statistic")
  } catch (error) {
    console.error(error)
  }
};

const updateDetailPariFinishedAndInsertMvnt = async(jsonObject) => {
  try {
    return await axios.put(url+ "api/pari/movement", jsonObject)
  } catch (error) {
    console.error(error)
  }
}
const getParisParMois = async (year) => {
  try {
    return await axios.get(url + "api/pari/match/count", {params: {year: year}});
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getParis,
  insertPari,
  updatePari,
  deletePari,
  getPariCustom,
  getPariInProgress,
  insertPariDetail,
  getPariStatistic,
  updateDetailPariFinishedAndInsertMvnt,
  getParisParMois
};
