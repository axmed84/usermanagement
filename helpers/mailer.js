import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // secure: false,
    // requireTLS: true,
    service: 'gmail',
    auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
})

export const sendMail = async(email, subject, content) => {
    try {

        var mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        }

        transporter.sendMail(mailOptions, (error, info) => {

            if(error){
                console.log(error);
                return;
            }

            if (info && info.messageId) {
                console.log('Mail has been sent ', info.messageId);
            } else {
                console.log('Mail sent but no messageId returned.');
            }
            
        })
        
    } catch (error) {
        console.log(error.message);
        
    }
}
