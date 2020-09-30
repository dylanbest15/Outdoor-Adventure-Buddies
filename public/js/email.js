$(document).ready(() => {
    const emailForm = $("form.email-form"); // match selector to html
    const textInput = $("textarea.email-message"); // match selector to html

    emailForm.on("submit", event => {
        event.preventDefault();

        const emailInfo = {
            message: textInput.val().trim(),
            receiver: "br3ndan.l8n@gmail.com",
            sender: getSenderUserEmail()
        }

        const emailData = {
            html: emailInfo.message,
            to: emailInfo.receiver,
            from: emailInfo.sender,
            emailInfo
        };

        if (!emailData.html) {
            return;
        }
        console.log(emailData)
        // If we have an email message then run sendEmail
        sendEmail(emailData);
        textInput.val("");
    });

    // Does a post to the email route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function sendEmail(emailData) {
        $.post("/email/send-email", emailData)
            .then(() => {
                window.location.replace("/bucketlist.html");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getSenderUserEmail() {
        $.get("/api/user_data", function(userData) {
            return userData.email;
        })
    }
});