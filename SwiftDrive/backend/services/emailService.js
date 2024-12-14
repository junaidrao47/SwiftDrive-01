const nodemailer = require('nodemailer');

exports.sendEmail = async (to, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text: message });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};