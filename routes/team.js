const sport = require("../model/sport");
let Team = require("../model/team");
let Sport = require("../model/sport");
const uploadFile = require("../utils/upload");
const { deleteFile } = require("./file.controller");

//list team
function getTeam(req, res) {
  try {
    var league=parseInt(req.query.id_league)
    var resltleague
    league ? resltleague=league :resltleague={$exists: true} //find all if don't have params
    var aggregateQuery = Team.aggregate([
      { 
        $match: { id_league:  resltleague }
      },
      {
        $lookup: {
          from: "leagues",
          localField: "id_league",
          foreignField: "id",
          as: "league",
        },
      },
      { $unwind: "$league" },
      {
        $lookup: {
          from: "sports",
          localField: "league.id_sport",
          foreignField: "id",
          as: "sport",
        },
      },
    ]);
    Team.aggregatePaginate(
      aggregateQuery,
      {
      
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, sport) => {
        if (err) {
          res.send(err);
        }
        res.send(sport);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message });
  }
}

function getOneTeam(req, res) {
  var id = Number(req.params.id);
  Team.aggregate(
    [
      { $match: { id: id } },
      {
        $lookup: {
          from: "leagues",
          localField: "id_league",
          foreignField: "id",
          as: "league",
        },
      },
      { $unwind: "$league" },
      {
        $lookup: {
          from: "sports",
          localField: "league.id_sport",
          foreignField: "id",
          as: "sport",
        },
      },
    ],
    (err, team) => {
      if (err) {
        res.send(err);
      }
      res.send(team);
    }
  );
}

  async function insertTeamWithUpload(req, res){
    try {
      console.log("insert team with upload image");
      let newFileName = `team-${ new Date().getTime() }`;
      let path = "teams";
      let upload = uploadFile(path, newFileName);
      await upload(req, res);
      let fileExtension = req.file.originalname.split('.')[1];
      insertTeam(req, res, `${newFileName}.${fileExtension}`);
    } catch (error) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${error}`,
      });
    }
  }

// Ajout d'un team (POST)
function insertTeam(req, res, newFileName) {
  let team = new Team();
  team.id = req.body.id;
  team.logo = newFileName;
  team.name = req.body.name;
  team.stade = req.body.stade;

  team.id_league = req.body.id_league;
  console.log(team);
  team.save((err) => {
    if (err) {
      res.send("cant post team ", err);
    }
    res.json({ message: `${team.name} saved!` });
  });
}


async function updateTeamWithUpload(req, res){
  try {
    console.log("update team with upload image");
    let newFileName = `team-${ new Date().getTime() }`;
    let path = "teams";
    let upload = uploadFile(path, newFileName);
    await upload(req, res);
    await deleteFile(req, res, path);
    let fileExtension = req.file.originalname.split('.')[1];
    console.log( req.body.stade);
    updateTeam(req.body.id, req.body.id_league, req.body.name, `${newFileName}.${fileExtension}`, req.body.stade,res);
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${error}`,
    });
  }
}

function updateTeamWithoutUpload(req, res){
  try {
    updateTeam(req.body.id, req.body.id_league, req.body.name, req.body.logo, res);
  } catch (error) {
    res.status(500).send({
      message: ` Team : ${req.body.name} is not updated !  ${error}`,
    });
  }
}

// Update d'un team (PUT)
function updateTeam(id, idleague, name, image,stad,  res) {
    Team.findOneAndUpdate({id: id },{ id_league: idleague, name: name ,logo: image,stade:stad }, function (err) {
      console.log(idleague)
        if (err) return handleError(err);
        res.status(200).send({
          message: "Updated the team successfully!",
        });
    });
  }

// suppression d'un team (DELETE)
function deleteTeam(req, res) {
  Team.findOne({ id: req.params.id }, (err, team) => {
    if (err) {
      res.send(err);
    }
    Team.deleteOne({ id: team.id }, function (err) {
      if (err) return handleError(err);
      console.log(team.name + " delete");
      res.status(200).send({ message: team.name + " deleted" });
    });
  });
}

module.exports = {
 getTeam,
 insertTeamWithUpload,
 updateTeamWithUpload,
 updateTeamWithoutUpload,
 deleteTeam,
 getOneTeam
};
