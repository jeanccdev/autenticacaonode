import { createTransport } from 'nodemailer'
import 'dotenv/config'

const sendToken = (destMail, token, idUsuario) => {
    const transporter = createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.MAILTRAP_EMAIL,
        to: destMail,
        subject: 'Verificação de cadastro!',
        text: `<h1>Verificação de Conta</h1><br>
        Clique no link abaixo para realizar a verificação da sua conta: <br>
        <a href='http://localhost:5000/api/authenticate/${token}/${idUsuario}'>Verificar conta!</a>
        `
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