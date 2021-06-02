let express = require("express");
let app = express();
let bodyParser = require("body-parser");

// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const path = require('path');

let sport = require("./routes/sport");
let league = require("./routes/league");
let team = require("./routes/team");
let file = require("./routes/file.controller");
let user = require("./routes/user");
let article = require("./routes/article");

global.__basedir = __dirname;
let match = require("./routes/match");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const uri =
  "mongodb+srv://tsotra1:tsotra1@cluster0.sf5fi.mongodb.net/Bet?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/sports que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.header("Access-Control-Allkow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

app.route(prefix + '/sports')
  .get(sport.getSport)
  .put(sport.updateSportWithoutUpload)
  .post(sport.insertSportWithUpload);
  
app.route(prefix + '/sports/file')
  .post(sport.updateSportWithUpload);

app.route(prefix + "/sports/:id")
  .get(sport.getOneSport)
  .delete(sport.deleteSport);

  
app.route(prefix + '/leagues')
  .get(league.getLeague)
  .put(league.updateLeagueWithoutUpload)
  .post(league.insertLeagueWithUpload);

app.route(prefix + '/leagues/file')
  .post(league.updateLeagueWithUpload);

app.route(prefix + "/leagues/:id")
  .get(league.getOneLeague)
  .delete(league.deleteLeague);

app.route(prefix + "/teams/:id")
  .get(team.getOneTeam)
  .delete(team.deleteTeam);

app.route(prefix + '/teams')
  .get(team.getTeam)
  .put(team.updateTeamWithoutUpload)
  .post(team.insertTeamWithUpload);

app.route(prefix + '/teams/file')
.post(team.updateTeamWithUpload);

app.route(prefix + '/articles')
  .get(article.getArticle)
  .post(article.insertArticleWithUpload)
  .put(article.updateArticleWithoutUpload);
  
app.route(prefix + '/articles/file')
  .post(article.updateArticleWithUpload)

app.route(prefix + '/articles/:id')
  .get(article.getOneArticle)
  .delete(article.deleteArticle);

app.route(prefix + "/files").get(file.getListFiles);

app.route(prefix + "/files/:name").get(file.download);

app.route(prefix + "/delete/:name").delete(file.deleteFile);

app.route(prefix + "/matchs")
  .get(match.getMatch)
  .post(match.insertMatch)
  .put(match.updateMatch);

app.route(prefix + "/matchs/:id")
  .get(match.getOneMatch)
  .delete(match.deleteMatch);

// users
app.route(prefix + "/users").post(user.inscription);
app.route(prefix + "/user/login").post(user.login);
app.route(prefix + "/user/me").post(user.getMe);

// .get(match.getOneMatch)
// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

app.use(
  "/static/image",
  express.static(__dirname + "/resources/static/assets/uploads")
);

module.exports = app;
