// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('index', {layout: "main"});
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('signup', {layout: "main"});
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('login', {layout: "main"});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render('members', {layout: "main"});
  });

  app.get("/bucketlist", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/bucketlist.html"));
  });

  app.get("/card", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/card.html"));
  });

  app.get("/peaks", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/peaks.html"));
  });

  app.get("/regions", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/regions.html"));
  });

  app.get("/trails", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/trails.html"));
  });

  app.get("/adirondackPeaks", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/adirondackPeaks.html"));
  });
};
