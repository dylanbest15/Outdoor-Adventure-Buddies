const db = require('../models');


module.exports = function (app) {
    app.get("/api/hikingTrails/:peakId", (req, res) => {
        db.HikingTrail.findAll({
            where: {
                peakId: req.params.peakId
            }
        }).then((trails) => {
            res.json(trails)
        }).catch((err) => console.log(err));
    });
};