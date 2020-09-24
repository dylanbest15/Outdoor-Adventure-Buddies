const db = require('../models');



module.exports = function (app) {
    // This function will hopefully generate a list of buddies when selecting one trail.
    app.get("/api/buddyList/:id", async (req, res) => {
        try{
            const buddyUserIds = await db.Favorite.findAll({
                where: {
                    hiking_trail_id: req.params.id
                }
            }).then(({ user_id }) => {
                return user_id;
            });
    
            console.log(buddyUserIds);
            res.json(buddyUserIds);
        } catch(err) {
            res.send(err);
        }
    });
}