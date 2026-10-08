require('dotenv').config()
const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequest('provide username and password')
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({msg:'token created', token})

}


const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `hello ${req.user.username}`, secret: `your secret number is ${luckyNumber}` })
}


module.exports = {
    login,
    dashboard
}