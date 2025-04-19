const fs = require('fs');
const path = require('path');
try {
  const imagePath = path.join(__dirname, '../../images/skillHouse.png');
  var base64 = fs.readFileSync(imagePath).toString('base64');
} catch (error) {
  // Fallback if image isn't found
  var base64 = "";
  console.log("Logo image not found, using default styling");
}

// Export the OTP verification template
exports.otpVerificationEmail = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - SkillHouse</title>
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
          font-size: 24px;
          margin-bottom: 20px;
        }
        
        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
          color: #4b5563;
        }
        
        .highlight {
          font-weight: 600;
          color: #4f46e5;
        }
        
        .otp-container {
          margin: 30px auto;
          background-color: #f3f4f6;
          border-radius: 12px;
          padding: 20px;
          max-width: 320px;
        }
        
        .otp-heading {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #6b7280;
          margin-bottom: 10px;
        }
        
        .otp-code {
          font-family: 'Courier New', monospace;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 8px;
          padding: 10px 15px;
          background-color: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          color: #111827;
          margin: 0;
          display: inline-block;
        }
        
        .divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 30px 0;
        }
        
        .note {
          font-size: 14px;
          color: #6b7280;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
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
        
        .expiry {
          font-weight: 600;
          color: #dc2626;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="logo">
            ${base64 ? `<img src="data:image/png;base64,${base64}" alt="SkillHouse Logo">` : ''}
            <h1 class="logo-text">SkillHouse</h1>
          </div>
        </div>
        
        <div class="content">
          <h1>Verify Your Email Address</h1>
          <p>Hello <span class="highlight">${name}</span>,</p>
          <p>Thank you for registering with SkillHouse! To complete your registration, please enter the verification code below:</p>
          
          <div class="otp-container">
            <div class="otp-heading">Verification Code</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <p>Enter this code on the verification page to activate your account and start exploring our courses.</p>
          
          <div class="note">
            <p>This code will expire in <span class="expiry">10 minutes</span>.</p>
            <p>If you did not create an account with SkillHouse, please ignore this email.</p>
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