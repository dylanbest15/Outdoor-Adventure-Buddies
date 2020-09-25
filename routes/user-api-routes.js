const db = require("../models");

module.exports = function (app) {
  // This retrieves the Information of the current user.
  app.get("/api/user/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then((UserId) => {
        res.json(UserId);
      }).catch((err) => console.log(err));
  });
  //   This generates the bucket list of favorites for the unique user
  app.get("api/favorites/:id", (req, res) => {
    db.Favorite.findAll({
      where: {
        userID: req.params.id
      }
    }).then((userFavorites) => {
      res.json(userFavorites);
    }).catch((err) => console.log(err));
  });
};
