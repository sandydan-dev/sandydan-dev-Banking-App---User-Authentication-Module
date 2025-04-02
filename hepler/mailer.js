import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async (to, subject, text) => {
  const mailOption = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    text,
  };

  try {
    const mailTransport = await transporter.sendMail(mailOption);
    console.log("Email sent: ", mailTransport.response);
    return { success: true, message: mailTransport.response };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export { sendMail };
