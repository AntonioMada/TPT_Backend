const { response, json } = require("express");
let PariService = require("../service/pari.service");
let MatchService = require("../service/match.service");
const { getOneMatchSpec } = require("./match");
const { getOneTeamSpec } = require("./team");

let FirebaseService = require("../service/firebase.service");
const PariController = {

  getParis: async function (req, res) {
    try {
      await PariService.getParis()
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  postPariWithOneDetail: async (req, res) => {
    try {
      const pari = req.body;
      await PariService.insertPari(pari)
        .then((response) => {
          FirebaseService.postmsg().then((response) => {
            console.log("reussi");
          });
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  patchPari: async function (req, res) {
    try {
      const idpari = req.params.id;
      await PariService.insertPari(idpari)
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  getPariCustom: async function (req, res) {
    try {
      const iduser = req.body.iduser
      console.log("iduser = " +req.body.iduser)
      await PariService.getPariCustom(iduser)
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  getPariInProgress: async function (req,res) {
    try {
      const iduser = req.body.iduser
      await PariService.getPariInProgress(iduser)
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  insertPariDetail: async function (req, res) {
    try {
      const pariDetail = req.body;
      await PariService.insertPariDetail(pariDetail)
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  getPariStatistic: async function(req,res){
    try {
      let pari = []
      let response = await PariService.getPariStatistic()
      for await (var i of response.data){
        const team = await getOneTeamSpec(i.team)
        pari.push({count: i.count, team:i.team, team_detail: team})
      }
      console.log(pari)
      res.json(pari);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  getMatchMostBet : async function(req, res){
    try {
      let matchmostbet = []
      let response = await MatchService.getMatchMostBet()
      let data = response.data
      console.log(response.data)
      for await (var i of data){
        const match = await getOneMatchSpec(i.idmatch)
        matchmostbet.push({count: i.count, idmatch:i.idmatch, match: match})
      }
      console.log(matchmostbet)
      res.json(matchmostbet);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  actionMatchFinished: async function(req, res){
    try {
      let jsonObject = req.body
      await PariService.updateDetailPariFinishedAndInsertMvnt(jsonObject)
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.body})
        })
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },
  parisParMois: async function(req, res){
    try {
      let year =req.params.year;
      console.log(year)
      await PariService.getParisParMois(year)
        .then((response) => {
          res.json(response.data);
        })
        .catch(error => {
          res.status(500).json({message: error.body})
        })
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

};

module.exports = PariController;
