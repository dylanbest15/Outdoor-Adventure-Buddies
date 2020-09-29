const db = require('../models');
const hikingLocale = require('../src/hikingLocales/hikingLocales');
require('dotenv').config();
const axios = require('axios');

const hikingTrailPromise = (lat, lon, apiKey) => {
    return axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${apiKey}`);
};


module.exports = function (app) {

   

    // This loads 10 trails into Database for hiking Mt Washington, in the Presidentials Region.
    app.get("/api/generateTrails/washington", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[0].lat, hikingLocale[0].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "washington";
                const regionId = "presidentials";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId, regionId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            res.json("Loading success!");
        } catch (err) {
            res.json(err);
        }
    });
    //  This loads 10 trail into Database for hiking Mt Madison, in the Presidentials Region
    app.get("/api/generateTrails/madison", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[1].lat, hikingLocale[1].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "madison";
                const regionId = "presidentials";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId, regionId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            res.json("Loading success!");
        } catch (err) {
            res.json(err);
        }
    });
    // Generates Katahdin in Northern Maine Region
    app.get("/api/generateTrails/katahdin", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[2].lat, hikingLocale[2].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "katahdin";
                const regionId = "northernMaine";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId, regionId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            res.json("Loading success!");
        } catch (err) {
            res.json(err);
        }
    });
    // Generates Trout Book in Northern Maine Region
    app.get("/api/generateTrails/troutBrook", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[3].lat, hikingLocale[3].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "troutBrook";
                const regionId = "northernMaine";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId, regionId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            res.json("Loading success!");
        } catch (err) {
            res.json(err);
        }
    });
    //  Generates Mt Marcy in the Adirondacks Region
    app.get("/api/generateTrails/marcy", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[4].lat, hikingLocale[4].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "marcy";
                const regionId = "adirondacks";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId, regionId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            res.json("Loading success!");
        } catch (err) {
            res.json(err);
        }
    });
    // Generates Giant Mtn in the Adirondacks Region
    app.get("/api/generateTrails/giant", async (req, res) => {
        try {
            const trailInfo = await hikingTrailPromise(hikingLocale[5].lat, hikingLocale[5].lon, process.env.hikingTrailAPI);
            newTrailsMerge = [];
            trailInfo.data.trails.forEach((trail) => {
                const {name: trail_name, length: mileage, ascent: elevation_gain, summary: description, imgMedium: trail_photo} = trail;
                const peakId = "giant";
                const regionId = "adirondacks";
                newTrailsMerge.push({trail_name, mileage, elevation_gain, description, trail_photo, peakId, regionId});
            });
            db.HikingTrail.bulkCreate(newTrailsMerge, {validate: true});
            res.json("Loading success!");
        } catch (err) {
            res.json(err);
        }
    });


};