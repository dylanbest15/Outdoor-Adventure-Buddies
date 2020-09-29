$(document).ready(() => {
    const emailForm = $("form.email-form"); // match selector to html
    const textInput = $("textarea.email-message"); // match selector to html

    emailForm.on("submit", event => {
        event.preventDefault();
        const emailData = {
            html: textInput.val().trim(),
            text: "this is text",
            subject:"this is the subject",
            to: $("#sender-message").val().trim(),
            from:"outdoor.adventure.buddies@gmail.com"
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