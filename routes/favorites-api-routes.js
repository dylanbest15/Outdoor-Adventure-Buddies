const db = require('../models');
const { Op } = require('sequelize');


module.exports = function (app) {
    // This function will hopefully generate a list of buddies when selecting one trail.
    app.get("/api/buddyList/:id", async (req, res) => {
        try{
            const currentUser = req.user.id.toString();
            
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

            
            // This uses the array to return all of the User information.
            if(buddyList.length > 0) {
                const matchingBuddies = await db.User.findAll({
                    where: {
                        id: {
                            [Op.or]: buddyList
                        }
                    }
                })
                res.json(matchingBuddies)
            }
            
            
            // This sends all of the "buddies" to the front-end. Woohoo!
        } catch(err) {
            res.send(err);
        }
    });

    // add new favorite
    app.post("/api/favorites", async (req, res) => {
        const trailId = req.body.trailId;
        const currentUser = req.user.id;
        const currentFavorites = await db.Favorite.findAll();
        const listedFavorites = [];
        currentFavorites.forEach(({UserId, HikingTrailId}) => {
            if((trailId === HikingTrailId) && (currentUser === UserId)) {
                listedFavorites.push({
                    UserId: UserId,
                    HikingTrailId: HikingTrailId
                });
            }
        });
        if(listedFavorites.length === 0) {
            db.Favorite.create({
               UserId: currentUser,
               HikingTrailId: trailId
            }).then((newFavorite) => {
                res.json(newFavorite);
            }).catch((err) => res.json(err));
        }
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