import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken
const jsonServer = process.env.JSONURL

const validateToken = (token, secret, idUsuario) => {
    jwt.verify(token, secret, async (err, user) => {
        if (err) return err

        await fetch(`${jsonServer}/usuarios/${idUsuario}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ verificado: true })
        })
    })

    return true
}

export default validateToken