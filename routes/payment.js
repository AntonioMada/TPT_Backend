const { response } = require("express");
let PaymentService = require("../service/payment.service");
const { getOneMatchSpec } = require("./match");

const PaymentController = {
  getPayments: async function (req, res) {
    try {
      await PaymentService.getPayments().then((response) => {
        res.json(response.data);
      });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },
  insertPayment: async (req, res) => {
    try {
      const payment = req.body;
      await PaymentService.insertPayment(payment).then((response) => {
        res.json(response.data);
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  // updatePayment: async (req, res) => {
  //   try {
  //     const payment = req.body;
  //     await PaymentService.updatePayment(payment).then((response) => {
  //       res.json(response.data);
  //     });
  //   } catch (e) {
  //     res.status(500).json({ message: e.message });
  //   }
  // },
  // updatePatchPayment: async function (req, res) {
  //   try {
  //     const idpayment = req.params.id;
  //     await PaymentService.updatePatchPayment(idpayment).then((response) => {
  //       res.json(response.data);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     res.status(500);
  //     res.json({ message: e.message });
  //   }
  // },
  paymentsHistoricByUserByType: async function (req, res) {
    try {
      const usertypejson = req.body;
      let matchhistoric = []
      let response = await PaymentService.paymentsHistoricByUserByType(usertypejson)
      console.log("usertypejson ", usertypejson);
      let data = response.data
      for await (var i of data){
        let gain = 0
        let perte = 0
        const resultatmatch = await getOneMatchSpec(i.idMatch)
        if(resultatmatch[0] !== undefined){
          if(resultatmatch[0].id_win != null){
            if(i.idTeamParie == resultatmatch[0].id_win) gain = i.amountWithQuote
            else perte = i.amount
          }
        }
        matchhistoric.push({match: resultatmatch, pari: i, gain: gain, perte: perte})
      }

      res.json(matchhistoric);
    } catch (e) {
      // console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },
  topUserWithMiseMax: async function (req, res) {
    try {
      const limit = req.body;
      await PaymentService.topUserWithMiseMax(limit).then((response) => {
        res.json(response.data);
      });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  createMvntAfterMatch: async function (req, res) {
    try {
      const mvntjson = req.body;
      await PaymentService.mvntAfterMatch(mvntjson).then((response) => {
        res.json(response.data);
      });
    } catch (e) {
      // console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },

  getSolde: async function (req, res) {
    try {
      const mvntjson = req.body;
      await PaymentService.soldeSite().then((response) => {
        res.json(response.data);
      });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: e.message });
    }
  },
};
module.exports = PaymentController;
