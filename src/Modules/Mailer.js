const nodemailer = require('nodemailer')

const {host, port, user, pass} = require('../Config/mail.json')

var transport = nodemailer.createTransport({
    
    host,
    port,
    auth: { user, pass}
  });

  module.exports = transport;