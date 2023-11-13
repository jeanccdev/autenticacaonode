// Imports
import express from 'express'
import sendToken from '../services/sendToken.js'
import validateToken from '../services/validateToken.js'
import authenticateToken from '../services/authenticateToken.js'
import generateToken from '../services/generateToken.js'

// Inits
const router = express.Router()
const jsonServer = process.env.JSONURL

// Routes
router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body
    const fetchUsuario = await fetch(`${jsonServer}/usuarios?usuario=${usuario}&senha=${senha}`).then(data => data.json())
    if (fetchUsuario.length > 0) {
        const token = generateToken({ id: usuario.id, usuario: usuario.usuario }, process.env.SECRET, 60 * 60)
        res.send({ token: `Bearer ${token}`, usuario: fetchUsuario })
    } else {
        res.send({ error: true })
    }
})

router.post('/register', async (req, res) => {
    const { usuario, senha, email } = req.body
    const fetchUsuarios = await fetch(`${jsonServer}/usuarios?usuario=${usuario}`).then(data => data.json())
    if (fetchUsuarios.length < 1) {
        const usuarioCriado = await fetch(`${jsonServer}/usuarios`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ usuario: usuario, senha: senha, email: email, verificado: false })
        }).then(response => response.json())
        const token = generateToken({ id: usuario.id, usuario: usuario.usuario }, process.env.SECRET, 60 * 60)
        sendToken(email, token, usuarioCriado.id)
        res.send({ token: `Bearer ${token}`, usuario: usuarioCriado })
    } else {
        res.send({ error: true })
    }
})

router.get('/clientes', authenticateToken, async (req, res) => {
    const fetchClientes = await fetch(`${jsonServer}/clientes`).then(data => data.json())
    res.send(fetchClientes)
})

router.get('/authenticate/:token/:idUsuario', (req, res) => {
    const { token, idUsuario } = req.params
    const tokenValidado = validateToken(token, process.env.SECRET, idUsuario)
    tokenValidado ? res.send(true) : res.send(false)
})

export default router