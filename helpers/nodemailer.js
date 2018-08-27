const nodemailer = require("nodemailer");

module.exports = {
  siteUrl: "http://localhost:3000/",
  transporter: nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "d3dknprfuzhco4pu@ethereal.email",
      pass: "2dvqG9MMGNMGXFT97x"
    }
  })
};
