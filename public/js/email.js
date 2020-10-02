$(document).ready(() => {

    const emailModal = document.getElementById("contact-modal");
    const contactButton = $("a.contact-button");

    // // close modal click event
    // $("button.close").on("click", function (event) {
    //     emailModal.style.display = "none";
    // })

    // // window click event for modal
    // window.onclick = function (event) {
    //     if ($(".contact-modal").css('display') == 'block' && event.target === emailModal) {
    //         emailModal.style.display = "none";
    //     }
    // }

    // find adventure buddies click event
    $("a.contact-button").on("click", function (event) {

        console.log('contact button clicked');
        // display modal
        emailModal.style.display = "block";
    })

    // // email button click event
    // $(document).on("click", "button.email-email", function (event) {

    //     event.preventDefault();

    //     // recipients email and name for email template
    //     emailAddress = $(this).attr("id");
    //     recipientName = $(this).attr("data-recipient");

    //     // api request to grab current users email address
    //     async function getSenderUserEmail() {
    //         await $.get("/api/user_data", function ({ email }) {
    //             console.log(email);
    //             return emailData = {
    //                 userTo: emailAddress,
    //                 userFrom: email,
    //                 userFromName: recipientName
    //             };
    //         }).then(() => {
    //             if (!emailData.userTo || !emailData.userFrom) {
    //                 console.log(`***\nno userTo or no userFrom\n***`);
    //                 return;
    //             }
    //             console.log('emailData === ', emailData)
    //             // If we have an email message then run sendEmail
    //             sendEmail(emailData);
    //         });
    //     };

    //     // Sends data required for an email to be sent. 
    //     function sendEmail(emailData) {
    //         $.post("/email/send-email", emailData)
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }

    //     getSenderUserEmail();

    // })
});