// resend.js
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHTML = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

async function sendEmail({ firstName, lastName, email, message }) {
  const safeMessage = escapeHTML(message).replace(/\n/g, "<br>");

  await resend.emails.send({
    from: `Manan Patel <${process.env.FROM_EMAIL}>`,
    to: process.env.TO_EMAIL,
    subject: `New message from ${firstName} ${lastName}`,
    reply_to: email,
    html: `
        <div style="background-color: #f6f8fa; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      
      <h2 style="margin-top: 0; margin-bottom: 24px; font-size: 20px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
        ✉️ New Contact Form Submission
      </h2>

      <div style="margin-bottom: 16px;">
        <p style="margin: 0; font-weight: 500; color: #374151;">Name</p>
        <p style="margin: 4px 0 0;">${firstName} ${lastName}</p>
      </div>

      <div style="margin-bottom: 16px;">
        <p style="margin: 0; font-weight: 500; color: #374151;">Email</p>
        <p style="margin: 4px 0 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
      </div>

      <div>
        <p style="margin: 0; font-weight: 500; color: #374151;">Message</p>
        <div style="margin-top: 4px; padding: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; line-height: 1.6;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      </div>

    </div>
    <p style="text-align: center; margin-top: 32px; font-size: 12px; color: #9ca3af;">This message was sent from your website contact form</p>
  </div>
    `,
  });

  await resend.emails.send({
    from: `Manan Patel <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Thanks for getting in touch!",
    html: `
      <div style="background-color: #f9fafb; padding: 32px; font-family: 'Segoe UI', sans-serif; color: #111827;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; padding: 32px 24px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06); text-align: left;">
   
    <div style="font-size: 36px; margin-bottom: 16px;">📬</div>

    <h2 style="margin: 0 0 12px; font-size: 24px; line-height: 1.3;">Hi ${firstName},</h2>
    
    <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
      Thanks for reaching out via my website — your message just landed in my inbox.
    </p>
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6;">
      I’ll get back to you shortly. Meanwhile, feel free to browse more of my work or connect with me on social.
    </p>
    
    <p style="margin: 0; font-size: 16px;">Best regards,<br/>Manan Patel</p>
  </div>
  
  <p style="text-align: center; margin-top: 32px; font-size: 12px; color: #9ca3af;">
    This is an automated email from <a href="https://manpatel.com" style="color: #3b82f6; text-decoration: none;">manpatel.com</a>
  </p>
</div>
    `,
  });
}

module.exports = { sendEmail };
