$(document).ready(() => {
    const emailForm = $("form.email-form"); // match selector to html
    const textInput = $("textarea.email-message"); // match selector to html

    emailForm.on("submit", event => {
        event.preventDefault();
        const emailData = {
            html: textInput.val().trim(),
            subject: "this is the subject",
            to: $("#sender-message").val().trim(),
            from: getSenderUserEmail()
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
            .catch(err, function() {
                console.log(err);
            });
    }

    function getSenderUserEmail() {
        $.get("/api/user_data", function(userData) {
            return userData.email;
        })
    }
});