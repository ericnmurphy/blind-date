const nodemailer = require("nodemailer");

module.exports = {
  siteUrl: "http://localhost:3000/",
  transporter: nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "qsvltc3twy64tgsm@ethereal.email",
      pass: "fcMt6MSyH4qdYNEn2w"
    }
  })
};
