
let Team = require("../model/team");

const getTeamById = async(id) => {
    console.log("idteam", id);
    try{
        let team = Team.aggregate(
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
          );
          return team;
    }catch (error) {
        console.error(error);
      }
};
module.exports = {
    getTeamById
  }