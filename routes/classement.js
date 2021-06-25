let Match = require("../model/match");
//list match
function getClassementDomicile(req, res) {
  try {
    var promise = Match.aggregate([     
      {
        $lookup: {
          from: "teams",
          localField: "id_win",
          foreignField: "id",
          as: "team_win",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "team_2",
          foreignField: "id",
          as: "team_deuxieme",
        },
      },
      {
        $group:{
          _id:{ team: "$team_win.name" },
          nombrematch:{$sum:1},
          victoire: {
            "$sum": { 
                "$cond": [
                    { "$gt": [ "$score_1", "$score_2" ] }, 
                    1, 0
                ]
            } 
          },
        },
      },
      {
          $sort: { 
          victoire:"$victoire"
         } 
        },
      
    ]).exec((error,result) => {
      // process results here
         if (error)
         return res.send(error);
        res.json(result);
      });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message });
  }
}

function getClassementExterieur(req, res) {
  try {
    var promise = Match.aggregate([     
      {
        $lookup: {
          from: "teams",
          localField: "team_1",
          foreignField: "id",
          as: "team_premier",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "team_2",
          foreignField: "id",
          as: "team_deuxieme",
        },
      },
      {
        $group:{
          _id:"$team_deuxieme.name",
          _id:"$team_2",
          nombrematch:{$sum:1},
          victoire: {
            "$sum": { 
                "$cond": [
                    { "$gt": [ "$score_2", "$score_1" ] }, 
                    1, 0
                ]
            } 
          },
        }
      }
    ]).exec((error,result) => {
      // process results here
         if (error)
         return res.send(error);
        res.json(result);
      });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message });
  }
}


module.exports = {
  getClassementDomicile,
  getClassementExterieur
};
