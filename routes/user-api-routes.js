const db = require("../models");

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
  app.get("/api/favorites/:id", (req, res) => {
    db.Favorite.findAll({
      where: {
        userID: req.params.id
      }
    }).then((userFavorites) => {
      res.json(userFavorites);
    }).catch((err) => console.log(err));
  });


};
