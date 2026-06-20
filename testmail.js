const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "glibinff@gmail.com",
    pass: "wovs vjzh ttqo axmr"
  }
});

transporter.sendMail({
  from: "glibinff@gmail.com",
  to: "glibinff@gmail.com",
  subject: "Test",
  text: "Hello"
})
.then(() => console.log("SUCCESS"))
.catch(err => console.log(err));