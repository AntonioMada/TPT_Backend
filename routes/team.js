const sport = require("../model/sport");
let Team = require("../model/team");
let Sport = require("../model/sport");
;
//list team
function getTeam(req, res) { 

  Team.aggregate(
    [
      { $lookup: {from: "leagues", localField: "id_league", foreignField: "id", as: "league"} },
      {$unwind: "$league"},   
      { $lookup: {from: "sports", localField: "league.id_sport", foreignField: "id", as: "sport"} },
     
    ],
    (err, team) => {
      if (err) {
        res.send(err);
      }
      res.send(team); 
    }
  );
}

function getOneTeam(req, res) {
  var id = Number(req.params.id);
  Team.aggregate(
    [{ $match: {id : id} },
      { $lookup: {from: "leagues", localField: "id_league", foreignField: "id", as: "league"} },
      {$unwind: "$league"},   
      { $lookup: {from: "sports", localField: "league.id_sport", foreignField: "id", as: "sport"} }, 
    ],
    (err, team) => {
      if (err) {
        res.send(err);
      }
      res.send(team); 
    }
  );
  }

// Ajout d'un team (POST)
function insertTeam(req, res) {
  let team = new Team();
  team.id = req.body.id;
  team.logo = req.body.logo;
  team.name = req.body.name;
 
  team.id_league = req.body.id_league; 
  console.log("POST reçu :");
  console.log(team);
  team.save((err) => {
    if (err) {
      res.send("cant post team ", err);
    }
    res.json({ message: `${team.nom} saved!` });
  });
}

// Update d'un team (PUT)
function updateTeam(req, res) {
  console.log("UPDATE recu team : ");
  console.log(req.body);

    Team.findOneAndUpdate({id:req.body.id },{ id_league: req.body.id_league,name: req.body.name ,logo: req.body.logo }, function (err) {
        if (err) return handleError(err);
        console.log(req.body.name+ ' updated');
      });

}

// suppression d'un team (DELETE)
function deleteTeam(req, res) {
	Team.findByIdAndRemove(req.params.id, (err, team) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${team.name} deleted` });
	});
}

module.exports = {
 getTeam,
 insertTeam,
 updateTeam,
 deleteTeam,
 getOneTeam
};
