const db = require("../models");
const { Op } = require('sequelize');
module.exports = function (app) {
  // This retrieves the Information of the current user.
  app.get("/api/user/:id", (req, res) => {
    console.log('REQ.USER \n================\n', req.user);
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then((UserId) => {
      // save stuff localStorage
        res.json(UserId);
      }).catch((err) => console.log(err));
  });
  // creates new user
  app.post("/api/user", (req,res) => {
    console.log(req.body);
    db.User.create(req.body).then((newUser) => {
      res.json(newUser);
    }).catch((err) => res.json(err));
  });
  //   This generates the bucket list of favorites for the unique user
  app.get("/api/favorites/:id", async (req, res) => {
    try {
      const findFavorites = await db.Favorite.findAll({
        where: {
          userID: req.params.id
        }
      });
      
      const newTrailIDs = [];
      findFavorites.forEach(({HikingTrailId})=> {
        newTrailIDs.push(HikingTrailId);
      });
      const favoriteTrailNames = await db.HikingTrail.findAll({
        where: {
          id: {
            [Op.or]: newTrailIDs
          }
        }
      });
      
      const data = {userFavorites: findFavorites, favoritesTrailNames: favoriteTrailNames};
      res.json(data);
    } catch(err) {
      console.log(err);
      
    }
    
  });


};
