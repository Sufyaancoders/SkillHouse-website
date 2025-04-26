// const { text } = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, 
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        console.log("Attempting to send email to:", email);

        // // Format the HTML content more safely
        // const safeHtml = html.trim();

        const mailOptions = {
            from: `SkillHouse || code - help by sufyaan <${process.env.MAIL_USER}>`,
            to: email,
            subject: subject,
            html: html, // Use the safe HTML content
            text: " This is a plain text version of the email content.",
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Transfer:', info); 
        console.log('Sending email to:', mailOptions); 

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}

module.exports = sendEmail;
