// Imports
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import apiController from './controllers/apiController.js'

// Inits
const app = express()
const PORT = process.env.PORT

// Configs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cors())

// Controllers
app.use('/api', apiController)
app.all('*', (req, res) => res.status(404).json('route not defined'))

// Running server
app.listen(PORT, () => {
    console.clear()
    console.log(`Servidor rodando na url http://localhost:${PORT}`)
})