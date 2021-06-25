let PaiementModel = function PaiementModel() {
  this.id = 0;
  this.idPari = 0;
  this.amount = 0;
  this.dateCreated = Date;
  this.reference = "";
  this.iduser = 0;
  this.cartebancaire = "";
  this.type = "";
};

module.exports = {
  PaiementModel,
};
