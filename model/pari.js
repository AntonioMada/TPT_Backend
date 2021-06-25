
module.exports = class PariModel {
  constructor(id, datePari, totalAmount, isPayed, idUser, pariMise){
    this.id = id
    this.datePari = datePari
    this.totalAmount = totalAmount
    this.isPayed = isPayed
    this.idUser = idUser
    this.parisMise = []
    this.parisMise.push(pariMise)
  }
}