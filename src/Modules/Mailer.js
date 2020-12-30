const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f3422359acea23",
      pass: "4454a15ffe4c40"
    }
  });

  module.exports = transport;