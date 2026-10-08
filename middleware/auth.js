require('dotenv').config()
const { UnauthError } = require('../errors')
const jwt = require('jsonwebtoken')


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthError('no token')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new UnauthError('not authorized to acess route')
    }
}

module.exports = authMiddleware