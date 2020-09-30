$(document).ready(() => {
    const emailForm = $("form.email-form"); // match selector to html
    const textInput = $("textarea.email-message"); // match selector to html
    let userEmail;

    emailForm.on("submit", event => {
        event.preventDefault();
        
        async function getSenderUserEmail() {
            await $.get("/api/user_data", function ({email}) {
                console.log(email);
                return emailData = {
                    message: textInput.val().trim(),
                    to: "br3ndan.l8n@gmail.com",
                    from: email,
                    emailInfo: {
                        userTo: "br3ndan.l8n@gmail.com",
                        userFrom: email,
                        userMessage: textInput.val().trim(),
                    }
                };
            }).then(() => {
                if (!emailData.message) {
                    return;
                }
                console.log(emailData)
                // If we have an email message then run sendEmail
                sendEmail(emailData);
                textInput.val("");
            });
        };

        // Does a post to the email route. 
        function sendEmail(emailData) {
            $.post("/email/send-email", emailData)
                .catch((err) => {
                    console.log(err);
                });
        }

        getSenderUserEmail();

    });
});