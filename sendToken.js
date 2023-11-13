import { createTransport } from 'nodemailer'
import 'dotenv/config'

const sendToken = (destMail, token) => {
    const transporter = createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: 'jeanccdev@gmail.com',
            pass: process.env.API_SMTP
        }
    })

    const mailOptions = {
        from: 'jeanccdev@gmail.com',
        to: destMail,
        subject: 'Verificação de cadastro!',
        text: `<a href='http://localhost:5000/authenticate/${token}'>Verificar conta!</a>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}

export default sendToken