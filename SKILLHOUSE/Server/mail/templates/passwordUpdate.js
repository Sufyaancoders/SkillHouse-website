const fs = require('fs');
const path = require('path');
// Use path.join to create proper path relative to this file
const imagePath = path.join(__dirname, '../../images/skillHouse.png');

let base64 = '';
try {
  base64 = fs.readFileSync(imagePath).toString('base64');
} catch (error) {
  console.warn("Warning: Could not load logo image:", error.message);
  // Provide a fallback or empty string
}
exports.passwordUpdate = (name, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Updated - SkillHouse</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
          color: #374151;
        }
        
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .header {
          background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%);
          padding: 30px;
          text-align: center;
        }
        
        .logo {
          margin: 0 auto 15px;
        }
        
        .logo img {
          width: 120px;
          height: auto;
        }
        
        .logo-text {
          color: white;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0;
        }
        
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        
        h1 {
          color: #111827;
          font-size: 22px;
          margin-bottom: 20px;
        }
        
        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .highlight {
          font-weight: 600;
          color: #4f46e5;
        }
        
        .divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 30px 0;
        }
        
        .security-tips {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
          text-align: left;
        }
        
        .security-tips h2 {
          font-size: 18px;
          color: #111827;
          margin-top: 0;
        }
        
        .security-tips ul {
          padding-left: 20px;
        }
        
        .security-tips li {
          margin-bottom: 8px;
        }
        
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        
        .social-links {
          margin: 15px 0;
        }
        
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: white;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: 500;
          margin: 20px 0;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: #4338ca;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
<div class="logo">
  <img src="data:image/png;base64,${base64}" alt="SkillHouse Logo">
  <h1 class="logo-text">SkillHouse</h1>
</div>
        </div>
        
        <div class="content">
          <h1>Password Successfully Updated</h1>
          <p>Hello <span class="highlight">${name}</span>,</p>
          <p>Your password for <span class="highlight">${email}</span> has been successfully updated. This email confirms that your password change was completed.</p>
          
          <p>If you didn't make this change, please contact us immediately by clicking the button below:</p>
          
          <a href="https://skillhouse.com/account/security" class="button">Review Account Activity</a>
          
          <div class="security-tips">
            <h2>Security Tips:</h2>
            <ul>
              <li>Never share your password with anyone</li>
              <li>Use different passwords for different websites</li>
              <li>Enable two-factor authentication for enhanced security</li>
              <li>Regularly update your password every 3-6 months</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} SkillHouse. All rights reserved.</p>
          <div class="social-links">
            <a href="https://facebook.com/skillhouse">Facebook</a> • 
            <a href="https://twitter.com/skillhouse">Twitter</a> • 
            <a href="https://instagram.com/skillhouse">Instagram</a>
          </div>
          <p>
            SkillHouse Learning Platform<br>
            123 Education Street, Knowledge City
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Create an HTML email template for better user experience
const resetEmailTemplate = (resetUrl, userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 20px; color: white; text-align: center; border-radius: 5px 5px 0 0; }
      .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; }
      .button { display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>SkillHouse Password Reset</h1>
      </div>
      <div class="content">
        <p>Hello ${userName || 'there'},</p>
        <p>We received a request to reset your password for your SkillHouse account. Click the button below to reset it:</p>
        <p style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>Best regards,<br>The SkillHouse Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Then use it in your mailSender call:
await mailSender(
    email,
    "Password Reset - SkillHouse",
    resetEmailTemplate(resetUrl, userInstance.firstName || 'there')
);
