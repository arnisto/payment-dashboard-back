const transporter = require("../utils/mailer");
const {
  generateCredentialsEmail,
} = require("../templates/credentials.template");

exports.sendUserCredentials = async ({ email, password, role, lang }) => {
  const { subject, html } = generateCredentialsEmail({
    email,
    password,
    role,
    lang,
  });

  const mailOptions = {
    from: `"Payment Dashboard" <${process.env.MAIL_USER}>`,
    to: email,
    subject,
    html,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};
