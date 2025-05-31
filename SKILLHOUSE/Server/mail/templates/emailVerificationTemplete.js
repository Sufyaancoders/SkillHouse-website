const fs = require('fs');
const path = require('path');

// Improved template with additional professional elements
exports.otpVerificationEmail = (otp, name ) => {
  const currentYear = new Date().getFullYear();
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
    <!-- HEADER WITH LOGO -->
    <tr>
      <td style="padding: 25px 0; text-align: center; background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);">
        <img src="https://via.placeholder.com/120x40/ffffff/4f46e5?text=SkillHouse" alt="SkillHouse" style="height: 40px; margin-bottom: 10px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">SkillHouse</h1>
      </td>
    </tr>
    
    <!-- MAIN CONTENT -->
    <tr>
      <td style="padding: 40px 30px; background-color: #ffffff;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
          <!-- TITLE -->
          <tr>
            <td style="text-align: center; padding-bottom: 25px;">
              <h2 style="margin: 0; color: #333333; font-weight: 600;">Verify Your Email Address</h2>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 15px;">Complete your registration to access our courses</p>
            </td>
          </tr>
          
          <!-- GREETING -->
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="margin: 0; color: #555555; font-size: 16px;">Hello <strong style="color: #4f46e5;">${name}</strong>,</p>
              <p style="margin: 15px 0 0 0; color: #555555; line-height: 1.5;">Thank you for registering with SkillHouse! Please use the following verification code to complete your registration and start your learning journey with us:</p>
            </td>
          </tr>
          
          <!-- OTP CODE -->
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto; background-color: #f7f7f7; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #777777; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your verification code</p>
                    <div style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; color: #4f46e5; letter-spacing: 5px; padding: 10px 15px; background-color: #ffffff; border-radius: 6px; border: 1px solid #e0e0e0;">${otp}</div>
                    <p style="margin: 15px 0 0 0; color: #dc2626; font-size: 13px; font-weight: 500;">Expires in 10 minutes</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- SECURITY NOTE -->
          <tr>
            <td style="padding: 25px 0 15px 0; text-align: center; border-top: 1px solid #f0f0f0; margin-top: 20px;">
              <p style="margin: 0; color: #555555; font-size: 15px;">If you did not request this verification code, please ignore this email or contact our support team.</p>
              <a href="mailto:support@skillhouse.com" style="color: #4f46e5; text-decoration: none; font-weight: 500; margin-top: 10px; display: inline-block;">Need help?</a>
            </td>
          </tr>
          
          <!-- BENEFITS -->
          <tr>
            <td style="padding: 30px 0 10px 0;">
              <h3 style="color: #333333; margin: 0 0 15px 0; font-weight: 600; text-align: center; font-size: 18px;">Why Join SkillHouse?</h3>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td style="width: 33%; padding: 10px; text-align: center; vertical-align: top;">
                    <div style="font-size: 20px; margin-bottom: 10px;">📚</div>
                    <p style="font-weight: 600; margin: 0 0 5px 0; color: #4f46e5;">Expert Instructors</p>
                    <p style="margin: 0; color: #666666; font-size: 13px;">Learn from industry professionals</p>
                  </td>
                  <td style="width: 33%; padding: 10px; text-align: center; vertical-align: top;">
                    <div style="font-size: 20px; margin-bottom: 10px;">🏆</div>
                    <p style="font-weight: 600; margin: 0 0 5px 0; color: #4f46e5;">Certificates</p>
                    <p style="margin: 0; color: #666666; font-size: 13px;">Earn recognized credentials</p>
                  </td>
                  <td style="width: 33%; padding: 10px; text-align: center; vertical-align: top;">
                    <div style="font-size: 20px; margin-bottom: 10px;">💻</div>
                    <p style="font-weight: 600; margin: 0 0 5px 0; color: #4f46e5;">Hands-on Projects</p>
                    <p style="margin: 0; color: #666666; font-size: 13px;">Build your portfolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- FOOTER -->
    <tr>
      <td style="padding: 25px; text-align: center; background-color: #f7f7f7; border-top: 1px solid #e5e7eb;">
        <!-- SOCIAL LINKS -->
        <div style="margin-bottom: 20px;">
          <a href="#" style="text-decoration: none; margin: 0 8px;"><img src="https://via.placeholder.com/30x30/4f46e5/ffffff?text=fb" style="width: 30px; height: 30px; border-radius: 15px;" alt="Facebook"></a>
          <a href="#" style="text-decoration: none; margin: 0 8px;"><img src="https://via.placeholder.com/30x30/4f46e5/ffffff?text=in" style="width: 30px; height: 30px; border-radius: 15px;" alt="LinkedIn"></a>
          <a href="#" style="text-decoration: none; margin: 0 8px;"><img src="https://via.placeholder.com/30x30/4f46e5/ffffff?text=tw" style="width: 30px; height: 30px; border-radius: 15px;" alt="Twitter"></a>
          <a href="#" style="text-decoration: none; margin: 0 8px;"><img src="https://via.placeholder.com/30x30/4f46e5/ffffff?text=ig" style="width: 30px; height: 30px; border-radius: 15px;" alt="Instagram"></a>
        </div>
        
        <!-- COPYRIGHT AND ADDRESS -->
        <p style="margin: 0; color: #777777; font-size: 14px;">&copy; ${currentYear} SkillHouse. All rights reserved.</p>
        <p style="margin: 10px 0 0 0; color: #777777; font-size: 14px;">123 Education Street, Knowledge City</p>
        
        <!-- APP DOWNLOAD LINKS -->
        <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px;">Get our mobile app:</p>
        <div style="margin-top: 10px;">
          <a href="#" style="display: inline-block; margin: 0 5px;"><img src="https://via.placeholder.com/120x40/000000/ffffff?text=App+Store" style="height: 35px; border-radius: 5px;" alt="App Store"></a>
          <a href="#" style="display: inline-block; margin: 0 5px;"><img src="https://via.placeholder.com/120x40/000000/ffffff?text=Google+Play" style="height: 35px; border-radius: 5px;" alt="Google Play"></a>
        </div>
        
        <!-- UNSUBSCRIBE -->
        <p style="margin-top: 20px; color: #999999; font-size: 12px;">
          This email was sent to you because you registered for an account with SkillHouse.<br>
          If you prefer not to receive these emails, you can <a href="#" style="color: #777777; text-decoration: underline;">unsubscribe</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
};