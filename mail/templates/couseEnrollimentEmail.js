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

exports.courseEnrollmentEmail = (name, courseName, instructorName, startDate, courseUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${courseName} - SkillHouse</title>
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
        
        .course-info {
          background-color: #f3f4f6;
          border-radius: 12px;
          padding: 25px;
          margin: 30px 0;
          text-align: left;
        }
        
        .info-row {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
        }
        
        .info-label {
          font-weight: 600;
          color: #6b7280;
          width: 130px;
          flex-shrink: 0;
        }
        
        .info-value {
          color: #111827;
        }
        
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: white;
          text-decoration: none;
          padding: 14px 40px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 16px;
          margin: 20px 0;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: #4338ca;
        }
        
        .tips-section {
          background-color: #eff6ff;
          border-left: 4px solid #3b82f6;
          padding: 20px;
          margin: 30px 0;
          text-align: left;
        }
        
        .tips-heading {
          color: #1e40af;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 15px;
        }
        
        ul {
          padding-left: 20px;
          margin: 0;
        }
        
        li {
          margin-bottom: 10px;
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
          <h1>Welcome to Your New Course!</h1>
          <p>Hello <span class="highlight">${name}</span>,</p>
          <p>Congratulations on enrolling in <span class="highlight">${courseName}</span>! We're excited to have you join us on this learning journey.</p>
          
          <div class="course-info">
            <div class="info-row">
              <div class="info-label">Course:</div>
              <div class="info-value">${courseName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Instructor:</div>
              <div class="info-value">${instructorName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Start Date:</div>
              <div class="info-value">${startDate}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Access:</div>
              <div class="info-value">Immediate & Lifetime</div>
            </div>
          </div>
          
          <p>You can start learning right away by clicking the button below:</p>
          
          <a href="${courseUrl}" class="button">Start Learning Now</a>
          
          <div class="tips-section">
            <h3 class="tips-heading">Tips for Success:</h3>
            <ul>
              <li>Set aside regular time for learning - consistency is key!</li>
              <li>Complete all practice exercises to reinforce concepts</li>
              <li>Join the course discussion forums to connect with peers</li>
              <li>Reach out to your instructor when you need help</li>
            </ul>
          </div>
          
          <p>We're committed to helping you succeed in your learning journey. If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Happy learning!</p>
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