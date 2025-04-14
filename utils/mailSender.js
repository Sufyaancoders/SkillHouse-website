const nodeMailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodeMailer.createTransport({
         host : 'smtp.gmail.com',
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
           // Option 1 - Using template literals (recommended)
                  from: `SkillHouse || code - help by sufyaan <${process.env.GMAIL_USER}>`,

            to:`${email}`,
            subject:`${subject}`,
            text:`${text}`,
        }; 
        const info = await transporter.sendMail(mailOptions);
          console.log('Transfer:', info); // Debugging line
        console.log('Sending email to:', mailOptions); // Debugging line
              return info;
        // await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
module.exports = sendEmail;