const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendOTP(toEmail, otp) {
  await transporter.sendMail({
    from: `"MindCheck" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Your MindCheck verification code',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#1d4ed8;margin-bottom:8px;">MindCheck</h2>
        <p style="color:#374151;">Your one-time verification code is:</p>
        <div style="font-size:36px;font-weight:700;letter-spacing:10px;color:#1d4ed8;padding:16px 0;">
          ${otp}
        </div>
        <p style="color:#6b7280;font-size:14px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="color:#9ca3af;font-size:12px;">If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}

async function sendApprovalEmail(toEmail, name) {
  await transporter.sendMail({
    from: `"MindCheck" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Your MindCheck account has been approved',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#1d4ed8;">MindCheck</h2>
        <p style="color:#374151;">Hi <strong>${name}</strong>,</p>
        <p style="color:#374151;">Your account has been <strong style="color:#16a34a;">approved</strong> by our administrator. You can now log in and begin your assessment.</p>
        <p style="color:#6b7280;font-size:14px;">Thank you for your patience.</p>
      </div>
    `,
  });
}

async function sendDeclineEmail(toEmail, name, reason) {
  await transporter.sendMail({
    from: `"MindCheck" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Update on your MindCheck registration',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#1d4ed8;">MindCheck</h2>
        <p style="color:#374151;">Hi <strong>${name}</strong>,</p>
        <p style="color:#374151;">Unfortunately your registration could not be approved at this time.</p>
        ${reason ? `<p style="color:#374151;"><strong>Reason:</strong> ${reason}</p>` : ''}
        <p style="color:#6b7280;font-size:14px;">Please contact our support team if you have questions.</p>
      </div>
    `,
  });
}

async function sendResultEmail(toEmail, name, level, adminNotes) {
  await transporter.sendMail({
    from: `"MindCheck" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Your MindCheck assessment results are ready',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#1d4ed8;">MindCheck</h2>
        <p style="color:#374151;">Hi <strong>${name}</strong>,</p>
        <p style="color:#374151;">Your assessment results have been reviewed and are now available in your dashboard.</p>
        <p style="color:#374151;"><strong>Result level:</strong> ${level}</p>
        ${adminNotes ? `<p style="color:#374151;"><strong>Note from our team:</strong> ${adminNotes}</p>` : ''}
        <p style="color:#6b7280;font-size:14px;">Please log in to view your full results.</p>
      </div>
    `,
  });
}

module.exports = { sendOTP, sendApprovalEmail, sendDeclineEmail, sendResultEmail };
