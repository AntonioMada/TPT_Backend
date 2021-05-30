let Sport = require("../model/sport");
;
//list sport
function getSport(req, res) { 
  
  Sport.aggregate(
    [
      { $lookup: {from: "leagues", localField: "id", foreignField: "id_sport", as: "league"} },
 
    ],
    (err, sport) => {
      if (err) {
        res.send(err);
      }
      res.send(sport); 
    }
  );
}

function getOneSport(req, res) {
  var id = Number(req.params.id);
  
  Sport.aggregate(
    [
      { $match:
        {
          id : id
        } 
      },{ $lookup: {from: "leagues", localField: "id", foreignField: "id_sport", as: "league"} },
      {$limit :1}
    ],
    (err, assignment) => {
      if (err) {
        res.send(err);
      }
      res.send(assignment[0]);
    }
  );
  }

// Ajout d'un sport (POST)
function insertSport(req, res) {
  let sport = new Sport();
  sport.id = req.body.id;
  sport.image = req.body.image;
  sport.name = req.body.name;

  console.log("POST reçu :");
  console.log(sport);
  sport.save((err) => {
    if (err) {
      res.send("cant post sport ", err);
    }
    res.json({ message: `${sport.nom} saved!` });
  });
}

// Update d'un sport (PUT)
function updateSport(req, res) {
  console.log("UPDATE recu sport : ");
  console.log(req.body);

    Sport.findOneAndUpdate({id:req.body.id },{ name: req.body.name ,image: req.body.image }, function (err) {
        if (err) return handleError(err);
        console.log(req.body.name+ ' updated');
      });

}

// suppression d'un sport (DELETE)
function deleteSport(req, res) {
	Sport.findByIdAndRemove(req.params.id, (err, sport) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${sport.name} deleted` });
	});
}

module.exports = {
 getSport,
 insertSport,
 updateSport,
 deleteSport,
 getOneSport
};
