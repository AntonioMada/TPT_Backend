let Sport = require("../model/sport");
const uploadFile = require("../utils/upload");
const { deleteFile } = require("./file.controller");
let FirebaseService = require("../service/firebase.service");
//list sport
function getSport(req, res) {
  console.log("call getSport()");
  try {
    var aggregateQuery = Sport.aggregate([
      {
        $lookup: {
          from: "leagues",
          localField: "id",
          foreignField: "id_sport",
          as: "league",
        },
      },
    ]);
    Sport.aggregatePaginate(
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
async function postmsg(req, res) {
  try {
    FirebaseService.postmsg().then((response) => {
      res.json(response.data);
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function notifyMobile(team1, team2, score_1, score_2, req, res) {
  try {
    FirebaseService.notifyMobile(team1, team2, score_1, score_2).then((response) => {
      res.json(response);
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
function getOneSport(req, res) {
  var id = Number(req.params.id);

  Sport.aggregate(
    [
      {
        $match: {
          id: id,
        },
      },
      {
        $lookup: {
          from: "leagues",
          localField: "id",
          foreignField: "id_sport",
          as: "league",
        },
      },
      { $limit: 1 },
    ],
    (err, sport) => {
      if (err) {
        res.send(err);
      }
      res.send(sport[0]);
    }
  );
}

async function insertSportWithUpload(req, res){
  try {
    console.log("insert sport with upload image");
    let newFileName = `sport-${ new Date().getTime() }`;
    let path = "sports";
    let upload = uploadFile(path, newFileName);
    await upload(req, res);
    let fileExtension = req.file.originalname.split('.')[1];
    insertSport(req, res, `${newFileName}.${fileExtension}`);
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${error}`,
    });
  }
}

// Ajout d'un sport (POST)
function insertSport(req, res, newFileName) {
  try {
    let sport = new Sport();
    sport.id = req.body.id;
    sport.image = newFileName;
    sport.name = req.body.name;
    sport.save((err) => {
      if (err) {
        res.send("can't post sport ", err);
      }
      res.json({ message: `${sport.name}  ` });
    });
  } catch (error) {
    res.status(500).send({
      message: ` Sport : ${req.body.name} is not inserted !  ${err}`,
    });
  }
}

// Update d'un sport (PUT)
async function updateSportWithUpload(req, res) {
  try {
    console.log("update sport with upload image");
    let newFileName = `sport-${new Date().getTime()}`;
    let path = "sports";
    let upload = uploadFile(path, newFileName);
    await upload(req, res);
    await deleteFile(req, res, path);
    let fileExtension = req.file.originalname.split(".")[1];
    // console.log(req.body);
    updateSport(
      req.body.id,
      req.body.name,
      `${newFileName}.${fileExtension}`,
      res
    );
  } catch (error) {
    res.status(500).send({
      message: ` File : ${req.body.image} is not uploaded !  ${error}`,
    });
  }
}

function updateSportWithoutUpload(req, res) {
  try {
    updateSport(req.body.id, req.body.name, req.body.image, res);
  } catch (error) {
    res.status(500).send({
      message: ` Sport : ${req.body.name} is not updated !  ${error}`,
    });
  }
}

function updateSport(id, name, image, res) {
  console.log("id = " + id);
  console.log("name = " + name);
  console.log("image = " + image);
  Sport.findOneAndUpdate(
    { id: id },
    { name: name, image: image },
    function (err) {
      if (err) return handleError(err);
      res.status(200).send({
        message: "Updated the sport: " + name + " successfully!",
      });
    }
  );
}

// suppression d'un sport (DELETE)
function deleteSport(req, res) {
  Sport.findOne({ id: req.params.id }, (err, sport) => {
    if (err) {
      res.send(err);
    }
    Sport.deleteOne({ id: sport.id }, function (err) {
      if (err) return handleError(err);
      console.log(sport.name + " delete");
      res.status(200).send({ message: sport.name + " deleted" });
    });
  });
}

module.exports = {
  getSport,
  insertSportWithUpload,
  updateSportWithUpload,
  updateSportWithoutUpload,
  deleteSport,
  getOneSport,
  postmsg,
  notifyMobile,
};
