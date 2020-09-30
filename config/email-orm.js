const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SendGridAPI);

sendEmail = (msg) => {
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

createDynamicTemplateData = (userData) => {
  let templateData = {
    userTo: userData.to,
    userFrom: userData.from,
    userMessage: userData.message,
  }

  return JSON.stringify(templateData);
}

userToUser = (to, userData) => {

  console.log("Send an email: user-to-user function has started");
  
  // const templateData = createDynamicTemplateData(userData);
  // console.log(`\n\n***\n\nthis is the templateData JSON, `, templateData);

  const msg = {
    to,
    from: process.env.SendGridAdminEmail,
    dynamic_template_data: userData,
    template_id: "d-f9b1f80152414cbf8f9f9fec32f6398f"
  };

  console.log(`\n\n***\n\nthis is dynamic_template_data, `, msg.dynamic_template_data);

  sendEmail(msg);
}

adminToUser = (to, userData) => {
  console.log("Send an email: admin-to-user function has started");

  const msg = {
    to,
    from: process.env.SendGridAdminEmail,
    dynamic_template_data: userData,
    template_id: "d-d6c995a75180408e9d39e14eb74c6b96"
  };

  sendEmail(msg);
}

module.exports = {
  userToUser,
  adminToUser
};