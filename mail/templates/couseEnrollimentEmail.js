const fs = require('fs');
const path = require('path');

// Declare base64 variable at the top level
let base64 = '';

// Try to load the logo image
try {
  const imagePath = path.join(__dirname, '../../images/skillHouse.png');
  if (fs.existsSync(imagePath)) {
    base64 = fs.readFileSync(imagePath).toString('base64');
  } else {
    console.log("Logo image file doesn't exist at path:", imagePath);
  }
} catch (error) {
  console.warn("Warning: Could not load logo image:", error.message);
}

exports.courseEnrollmentEmail = (name, courseName, instructorName, startDate, courseUrl) => {
  const currentYear = new Date().getFullYear();
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${courseName} - SkillHouse</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; color: #374151;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- HEADER -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%); padding: 30px 15px;">
                  <div style="text-align: center;">
                    ${base64 ? 
                      `<img src="data:image/png;base64,${base64}" alt="SkillHouse Logo" style="width: 120px; margin-bottom: 15px;">` : 
                      ''}
                    <h1 style="color: white; font-size: 28px; font-weight: 700; letter-spacing: 0.05em; margin: 0;">SkillHouse</h1>
                  </div>
                </td>
              </tr>
              
              <!-- CONTENT -->
              <tr>
                <td style="padding: 40px 30px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <h1 style="color: #111827; font-size: 24px; margin-top: 0; margin-bottom: 20px;">Welcome to Your New Course!</h1>
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4b5563;">Hello <span style="font-weight: 600; color: #4f46e5;">${name}</span>,</p>
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4b5563;">Congratulations on enrolling in <span style="font-weight: 600; color: #4f46e5;">${courseName}</span>! We're excited to have you join us on this learning journey.</p>
                      </td>
                    </tr>
                    
                    <!-- COURSE INFO -->
                    <tr>
                      <td style="background-color: #f3f4f6; border-radius: 8px; padding: 25px; margin: 30px 0;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td width="130" style="padding-bottom: 15px; font-weight: 600; color: #6b7280;">Course:</td>
                            <td style="padding-bottom: 15px; color: #111827;">${courseName}</td>
                          </tr>
                          <tr>
                            <td width="130" style="padding-bottom: 15px; font-weight: 600; color: #6b7280;">Instructor:</td>
                            <td style="padding-bottom: 15px; color: #111827;">${instructorName}</td>
                          </tr>
                          <tr>
                            <td width="130" style="padding-bottom: 15px; font-weight: 600; color: #6b7280;">Start Date:</td>
                            <td style="padding-bottom: 15px; color: #111827;">${startDate}</td>
                          </tr>
                          <tr>
                            <td width="130" style="padding-bottom: 15px; font-weight: 600; color: #6b7280;">Access:</td>
                            <td style="padding-bottom: 15px; color: #111827;">Immediate & Lifetime</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td align="center" style="padding: 30px 0 20px 0;">
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4b5563;">You can start learning right away by clicking the button below:</p>
                        <a href="${courseUrl}" style="display: inline-block; background-color: #4f46e5; color: white; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 500; font-size: 16px; margin: 20px 0;">Start Learning Now</a>
                      </td>
                    </tr>
                    
                    <!-- TIPS SECTION -->
                    <tr>
                      <td style="padding: 20px; margin: 30px 0; background-color: #eff6ff; border-left: 4px solid #3b82f6;">
                        <h3 style="color: #1e40af; font-weight: 600; margin-top: 0; margin-bottom: 15px;">Tips for Success:</h3>
                        <ul style="padding-left: 20px; margin: 0;">
                          <li style="margin-bottom: 10px;">Set aside regular time for learning - consistency is key!</li>
                          <li style="margin-bottom: 10px;">Complete all practice exercises to reinforce concepts</li>
                          <li style="margin-bottom: 10px;">Join the course discussion forums to connect with peers</li>
                          <li style="margin-bottom: 10px;">Reach out to your instructor when you need help</li>
                        </ul>
                      </td>
                    </tr>
                    
                    <tr>
                      <td align="center" style="padding-top: 30px;">
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px; color: #4b5563;">We're committed to helping you succeed in your learning journey. If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4b5563;">Happy learning!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- FOOTER -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
                  <p style="margin: 0 0 15px 0;">© ${currentYear} SkillHouse. All rights reserved.</p>
                  <p style="margin: 15px 0;">
                    <a href="https://facebook.com/skillhouse" style="color: #6b7280; text-decoration: none; margin: 0 10px;">Facebook</a> • 
                    <a href="https://twitter.com/skillhouse" style="color: #6b7280; text-decoration: none; margin: 0 10px;">Twitter</a> • 
                    <a href="https://instagram.com/skillhouse" style="color: #6b7280; text-decoration: none; margin: 0 10px;">Instagram</a>
                  </p>
                  <p style="margin: 15px 0 0 0;">
                    SkillHouse Learning Platform<br>
                    123 Education Street, Knowledge City
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};