let League = require("../model/league");
const uploadFile = require("../utils/upload");
const { deleteFile } = require("./file.controller");

//list league
function getLeague(req, res) {
  try { 
    var sport=parseInt(req.query.id_sport)
    var resltsport
    sport ? resltsport=sport :resltsport={$exists: true}//find all if don't have params
    var aggregateQuery = League.aggregate([
      { 
        $match: { id_sport:  resltsport }
      },
      { 
        $lookup: {
          from: "sports",
          localField: "id_sport",
          foreignField: "id",
          as: "sport",
        },
      },

      {
        $lookup: {
          from: "teams",
          localField: "id",
          foreignField: "id_league",
          as: "team",
        },
      },
    ]);
    League.aggregatePaginate(
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

function getOneLeague(req, res) {
  var id = Number(req.params.id);
  League.aggregate(
    [
      {
        $match: {
          id: id,
        },
      },
      {
        $lookup: {
          from: "sports",
          localField: "id_sport",
          foreignField: "id",
          as: "sport",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "id",
          foreignField: "id_league",
          as: "team",
        },
      },
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
           {  $match:
            {id : id } 
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

async function insertLeagueWithUpload(req, res){
  try {
    console.log("insert league with upload image");
    let newFileName = `league-${ new Date().getTime() }`;
    let path = "leagues";
    let upload = uploadFile(path, newFileName);
    await upload(req, res);
    let fileExtension = req.file.originalname.split('.')[1];
    insertLeague(req, res, `${newFileName}.${fileExtension}`);
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
}

// Ajout d'un league (POST)
function insertLeague(req, res, newFileName) {
  let league = new League();
  league.id = req.body.id;
  league.id_sport = req.body.id_sport;
  league.image = newFileName;
  league.name = req.body.name;
  league.save((err) => {
    if (err) {
      res.send("cant post league ", err);
    }
    res.json({ message: `${league.name} saved!` });
  });
}


async function updateLeagueWithUpload(req, res){
  try {
    console.log("update league with upload image");
    let newFileName = `league-${ new Date().getTime() }`;
    let path = "leagues";
    let upload = uploadFile(path, newFileName);
    await upload(req, res);
    await deleteFile(req, res, path);
    let fileExtension = req.file.originalname.split('.')[1];
    updateLeague(req.body.id, req.body.id_sport, req.body.name, `${newFileName}.${fileExtension}`, res);
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${error}`,
    });
  }
}

function updateLeagueWithoutUpload(req, res){
  try {
    console.log(req.body)
    updateLeague(req.body.id, req.body.id_sport, req.body.name, req.body.image, res);
  } catch (error) {
    res.status(500).send({
      message: ` League : ${req.body.name} is not updated !  ${error}`,
    });
  }
}
// Update d'un league (PUT)
function updateLeague(id, idsport, name, image, res) {
    League.findOneAndUpdate({id: id },{ id_sport: idsport, name: name, image: image }, function (err) {
        if (err) return res.send("cant post sport ", err);
        res.status(200).send({
          message: "Updated the league " + name + " successfully!",
        });
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
      console.log(league.name + " delete");
      res.status(200).send({ message: league.name + " deleted" });
    });
  });
}

module.exports = {
 getLeague,
 insertLeagueWithUpload,
 updateLeagueWithUpload,
 updateLeagueWithoutUpload,
 deleteLeague,
 getOneLeague
};
