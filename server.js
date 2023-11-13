import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import cors from 'cors'
import sendToken from './sendToken.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./'))
app.use(cors())
const jwt = jsonwebtoken
const PORT = process.env.PORT
const jsonServer = process.env.JSONURL

app.get('/test', (req, res) => {
    sendToken('jeancc1532@gmail.com', 'hahahahahahha')
    res.send('Token enviado')
})

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body
    const fetchUsuario = await fetch(`${jsonServer}/usuarios?usuario=${usuario}&senha=${senha}`).then(data => data.json())
    if (fetchUsuario.length > 0) {
        const token = jwt.sign({ id: usuario.id, usuario: usuario.usuario }, process.env.SECRET, {
            expiresIn: 60 * 60
        })
        res.send({ token: `Bearer ${token}` })
    } else {
        res.send({ invalid: true })
    }
})

app.get('/clientes', authenticateToken, async (req, res) => {
    const fetchClientes = await fetch(`${jsonServer}/clientes`).then(data => data.json())
    res.send(fetchClientes)
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' })
})

app.listen(PORT, () => {
    console.clear()
    console.log(`Servidor rodando na url http://localhost:${PORT}`)
})

function authenticateToken(req, res, next) {
    const { token } = req.body

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Error' })

        req.user = user
        next()
    })
}