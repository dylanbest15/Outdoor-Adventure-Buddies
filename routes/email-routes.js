const sendEmail = require("../config/email-orm");

module.exports = function (app) {
    app.post("/email/send-email", (req, res) => {
        console.log("setting up email template");

        sendEmail.userToUser(req.body.userTo, req.body);

        console.log(`\n\nreq.body === ${req.body}\n\n`);

        sendEmail.adminToUser(req.body.userFrom, req.body);
    });

    app.get("/test", function (req, res) {
        res.send("works")
    });
};
