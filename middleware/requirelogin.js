const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/db')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: "U must be logged in" })
    }
    const token = authorization.replace("BEARER ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "U must be logged in" })
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
        })
        next()
    })
}

//jwt token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIzNDQ0ZWNmZjJiYTAzZjAxZTQxZjciLCJpYXQiOjE1ODg4MDg0NzB9.BPxVftAu90ljXMGHUE8kgi2guhOaQcQKBwwM_zI1ObU