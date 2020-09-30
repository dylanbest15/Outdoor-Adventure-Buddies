const sendEmail = require("../config/email-orm");

module.exports = function (app) {
    app.post("/email/send-email", (req, res) => {
        console.log("setting up email template");

        //(to, from, subject, text, html) 
        sendEmail.userToUser(req.body.to, req.body.html);
        // .then(function(data){
        //     console.log("success and done")
        // })
            // .then(() => {
            //     //res.redirect(307, "/members");
            //     console.log("success and done")
            // })
            // .catch(err => {
            //     res.status(401).json(err);
            // });
    });

    app.get("/test", function (req, res) {
        res.send("works")
    });
};
