const nodemailer = require('nodemailer')
const Path = require('path');
const handlebars = require('nodemailer-express-handlebars');

const {host, port, user, pass} = require('../Config/mail.json');

var transport = nodemailer.createTransport({

    host,
    port,
    auth: { user, pass}
  });

  transport.use('conpile', hbs({
      viewEngine: 'handllebars',
      viewPath: pathToFileURL.resolve('./src/Resources/Mail/'),
      extName: '.html'
  }));

  module.exports = transport;