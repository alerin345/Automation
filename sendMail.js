const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function sendMail(target,title,message) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: process.env.EHOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EPASSWORD
    }
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: target,
    subject: title,
    text: message,
    html: `<b>${message}</b>`
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
