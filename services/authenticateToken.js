import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken

const authenticateToken = (req, res, next) => {
    const { token } = req.body

    if (token == null) { return res.sendStatus(401) }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Error' })

        req.user = user
        next()
    })
}

export default authenticateToken