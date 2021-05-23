let Match = require("../model/match");
;
//list match
function getMatch(req, res) { 
  
  Match.aggregate(
         [
           { $lookup: {from: "teams", localField: "team_1", foreignField: "id", as: "team_1"} },
    
           { $lookup: {from: "teams", localField: "team_2", foreignField: "id", as: "team_2"} },
     ],
    (err, match) => {
      if (err) {
        res.send(err);
      }
      res.send(match); 
    }
  );
}

function getOneMatch(req, res) {
  var id = Number(req.params.id);
      Match.aggregate(
        [
          { 
            $match:
            {
              id : id
            } 
          },
          { $lookup: {from: "teams", localField: "team_1", foreignField: "id", as: "team_1"} },
     
          { $lookup: {from: "teams", localField: "team_2", foreignField: "id", as: "team_2"} },
        ],
        (err, match) => {
          if (err) {
            res.send(err);
          }
          res.send(match); 
        }
      );
  }

// Ajout d'un match (POST)
function insertMatch(req, res) {
  let match = new Match();
  match.id = req.body.id;
  match.team_1 =req.body.team_1;
  match.team_2=req.body.team_2;
  match.score_1=req.body.score_1;
  match.score_2=req.body.score_2;
  match.date_time=req.body.date;
  match.date=req.body.date;
  match.time=req.body.time;

  console.log("POST reçu :");
  console.log(match);
  match.save((err) => {
    if (err) {
      res.send("cant post match ", err);
    }
    res.json({ message: `${match.nom} saved!` });
  });
}

// Update d'un match (PUT)
function updateMatch(req, res) {
  console.log("UPDATE recu match : ");
  console.log(req.body);

    Match.findOneAndUpdate({id:req.body.id },{
        team_1:req.body.team_1,
        team_2: req.body.team_2 ,
        score_1: req.body.score_1, 
        score_2: req.body.score_2,
        date_time: req.body.date_time,
        date: req.body.date,
        time: req.body.time,
    }, function (err) {
        if (err) return res.send("cant post sport ", err);
        console.log(req.body.name+ ' updated');
      });

}

// suppression d'un match (DELETE)
function deleteMatch(req, res) {
    Match.findOne({ id: req.params.id }, (err, match) => {
        if (err) {
          res.send(err);
        }
        Match.deleteOne({ id: match.id }, function (err) {
            if (err) return handleError(err);
            console.log(match.name+ ' delete');
          });
      });
}

module.exports = {
 getMatch,
 insertMatch,
 updateMatch,
 deleteMatch,
 getOneMatch
};
