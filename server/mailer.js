import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: '"My Auth App" <no-reply@authapp.com>',
            to: email,
            subject: "Welcome to the App!",
            text: "You have successfully signed up.",
            html: "<b>Welcome!</b><p>You have successfully signed up to our mandatory assignment app.</p>"
        });

        console.log("Email sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email:", error);
    }
};