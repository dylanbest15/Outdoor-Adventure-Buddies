const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SendGridAPI);


//ES6
sendEmail = (to, from, subject, text, html) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  // sgMail
  //   .send(msg)
  //   .then(() => { }, error => {
  //     console.error(error);

  //     if (error.response) {
  //       console.error(error.response.body)
  //     }
  //   });
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}

module.exports = sendEmail;