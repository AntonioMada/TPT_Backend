let League = require("../model/league");

//list league
function getLeague(req, res) { 
  
  League.aggregate(
    [
      { $lookup: {from: "sports", localField: "id_sport", foreignField: "id", as: "sport"} },
 
      { $lookup: {from: "teams", localField: "id", foreignField: "id_league", as: "team"} },
    ],
    (err, league) => {
      if (err) {
        res.send(err);
      }
      res.send(league); 
    }
  );
}

function getOneLeague(req, res) {
  var id = Number(req.params.id);
      League.aggregate(
        [
          { 
            $match:
            {
              id : id
            } 
          },
          { $lookup: {from: "sports", localField: "id_sport", foreignField: "id", as: "sport"} },
     
          { $lookup: {from: "teams", localField: "id", foreignField: "id_league", as: "team"} },
        ],
        (err, league) => {
          if (err) {
            res.send(err);
          }
          res.send(league); 
        }
      );
  }

// Ajout d'un league (POST)
function insertLeague(req, res) {
  let league = new League();
  league.id = req.body.id;
  league.id_sport = req.body.id_sport;
  league.image = req.body.image;
  league.name = req.body.name;

  console.log("POST reçu :");
  console.log(league);
  league.save((err) => {
    if (err) {
      res.send("cant post league ", err);
    }
    res.json({ message: `${league.nom} saved!` });
  });
}

// Update d'un league (PUT)
function updateLeague(req, res) {
  console.log("UPDATE recu league : ");
  console.log(req.body);

    League.findOneAndUpdate({id:req.body.id },{ id_sport:req.body.id_sport,name: req.body.name ,image: req.body.image }, function (err) {
        if (err) return res.send("cant post sport ", err);
        console.log(req.body.name+ ' updated');
      });

}

// suppression d'un league (DELETE)
function deleteLeague(req, res) {
   League.findOne({ id: req.params.id }, (err, league) => {
        if (err) {
          res.send(err);
        }
        League.deleteOne({ id: league.id }, function (err) {
            if (err) return handleError(err);
            console.log(league.name+ ' delete'); 
			res.status(200).send({message:"ok"});
          });
      });
}

module.exports = {
 getLeague,
 insertLeague,
 updateLeague,
 deleteLeague,
 getOneLeague
};
