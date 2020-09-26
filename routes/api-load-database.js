const db = require('../models');
const hikingLocale = require('../src/hikingLocales/hikingLocales');
require('dotenv').config();
const axios = require('axios');

const hikingTrailPromise = (lat, lon, apiKey) => {
    return axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${apiKey}`);
};


module.exports = function (app) {

    // Function to load peak in 1 region


    app.get("/api/generateTrails/washington", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[0].lat, hikingLocale[0].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "washington";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            
        } catch (err) {
            res.json(err);
        }
    });



};