import { sendEmail } from "./emailService.js";

const sendEmailFun = async ({ to, subject, text, html }) => {
  try {
    const result = await sendEmail(to, subject, text, html);
    return result.success;
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    return false;
  }
};

export default sendEmailFun;
