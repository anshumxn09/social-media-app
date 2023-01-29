const node_mailer = require('nodemailer')

exports.sendEmail = async (options) => {
    var transport = node_mailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "17baeba650b208",
          pass: "9a345d6e6db701"
        }
      });
    const mailOptions = {
        from : process.env.MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    }

    await transport.sendMail(mailOptions);
}