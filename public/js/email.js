const { text } = require("express");

$(document).ready(() => {
    const emailForm = $("form.email-form"); // match selector to html
    const textInput = $("textarea.email-message"); // match selector to html

    emailForm.on("submit", event => {
        event.preventDefault();
        const emailData = {
            message: textInput.val().trim()
        };

        if (!emailData.message) {
            return;
        }
        // If we have an email and password, run the sendEmail function
        sendEmail(emailData.message);
        textInput.val("");
    });

    // Does a post to the email route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function sendEmail(email, password) {
        $.post("/email/send-email", {
            message,
        })
            .then(() => {
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});