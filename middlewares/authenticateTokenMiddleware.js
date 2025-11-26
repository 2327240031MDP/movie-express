import jwt from 'jsonwebtoken'

export const authenticateTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorizartion;
    if (!authHeader) {
        return res.status(401).send({
            error: 'No token provided',
            data: null
        })
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            error: 'No token provided',
            data: null
        })
    }

    jwt.verify(token, "APP_JWT_SECRET", (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Invalid token',
                data: err.message
            })
        }
        req.user = decoded;
        next();
    })
}