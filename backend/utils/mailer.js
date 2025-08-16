const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('SMTP not configured. Emails will be logged instead of sent.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

async function sendResetEmail(toEmail, token) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const link = `${baseUrl}/auth/reset-password?token=${token}`;

  const tx = getTransporter();
  if (!tx) {
    console.log(`[MAIL:RESET] To: ${toEmail} Link: ${link}`);
    return;
  }

  await tx.sendMail({
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: 'Reset your password',
    text: `Reset your password using this link: ${link}`,
    html: `<p>Reset your password using this link: <a href="${link}">${link}</a></p>`,
  });
}

module.exports = {
  sendResetEmail,
};


