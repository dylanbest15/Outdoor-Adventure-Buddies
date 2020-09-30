const db = require('../models');
const { Op } = require('sequelize');


module.exports = function (app) {
    // This function will hopefully generate a list of buddies when selecting one trail.
    app.get("/api/buddyList/:id", async (req, res) => {
        try{
            console.log(req.user.id);
            const currentUser = req.user.id.toString();
            console.log(currentUser);
            // This finds all of the matching favorites with the trail id.
            const matchingFavorites = await db.Favorite.findAll({
                where: {
                    HikingTrailId: req.params.id
                }
            });
            const buddyList = [];
            // This breaks the information down into UserId array
            matchingFavorites.forEach(({UserId}) => {
                if(UserId !== currentUser) {
                    buddyList.push(UserId);
                }
                });

            // res.json(matchingFavorites);
            // This uses the array to return all of the User information.
            const matchingBuddies = await db.User.findAll({
                where: {
                    id: {
                        [Op.or]: buddyList
                    }
                }
            });
            
            // This sends all of the "buddies" to the front-end. Woohoo!
            res.json(matchingBuddies);
        } catch(err) {
            res.send(err);
        }
    });

    // add new favorite
    app.post("/api/favorites", (req, res) => {
        db.Favorite.create(req.body).then((newFavorite) => {
            res.json(newFavorite);
        }).catch((err) => res.json(err));
    });

    // Delete a favorite
    app.delete("/api/favorites/:id", (req, res) => {
        db.Favorite.destroy({
            where: {
                id: req.params.id
            }
        }).then((deletedItem) => {
            res.json(deletedItem);
        }).catch((err) => res.json(err));
    });
};