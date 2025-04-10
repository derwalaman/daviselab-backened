import nodemailer from "nodemailer";
import { google } from "googleapis";

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  ADMIN_EMAIL,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

export const sendEmails = async (name, email, internship) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const userMail = {
    from: `DAVISE Lab <${ADMIN_EMAIL}>`,
    to: email,
    subject: `Application Received: ${internship}`,
    text: `Hi ${name},\n\nThanks for applying for the ${internship} internship at DAVISE Lab. We'll get back to you soon.`,
  };

  const adminMail = {
    from: `DAVISE Lab <${ADMIN_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `New Application: ${internship}`,
    text: `New application from ${name} (${email}) for ${internship}.`,
  };

  await transport.sendMail(userMail);
  await transport.sendMail(adminMail);
};
