const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SendGridAPI);


sendEmail = (to, subject, html) => {
  console.log("sendEmail function has started")
  const msg = {
    to,
    from: process.env.SendGridAdminEmail,
    // template_id: ,
    subject,
    html,
  };

  (async () => {
    try {
      await sgMail.send(msg);
      console.log("sendEmail function is done");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}





module.exports = sendEmail;