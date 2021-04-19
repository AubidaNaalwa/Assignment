const express = require('express')
const Users = require('../Models/Users')
var validator = require('validator');
const router = express.Router()

function validateLogInInformation(req, res, flag = 0) {

    if (!req.body.username || !req.body.password || (flag && !req.body.name)) {
        res.status(200).send(
            { msg: "missing info" }
        )
        return false
    }

    if (!validator.isEmail(req.body.username)) {
        res.status(200).send(
            { msg: "invalid Mail Address" }
        )
        return false
    }
    return true
}

router.get('/test', (req, res) => {
    res.status(200).send("you are connected")
})

router.post('/login', async (req, res) => {
    if (!validateLogInInformation(req, res))
        return
    try {
        const user = await Users.findOne({ username: req.body.username })
        if (user.logInAttepmts >= 5) {
            res.status(200).send(
                { err: 2, msg: "your userName Is Banned due many logIn Attempts" }
            )
            return
        }
        if (user.password !== req.body.password) {
            user.logInAttepmts = user.logInAttepmts + 1 || 1
            res.status(200).send(
                { err: 2, msg: "UserName or password not currect" }
            )
        } else {
            user.logInAttepmts = 0
            res.status(200).send(
                { err: 0, msg: "LogIn succesful" }
            )
        }
        user.save()
    } catch (error) {
        res.status(200).send(
            { msg: error }
        )
    }

})

router.post('/signUp', async (req, res) => {
    if (!validateLogInInformation(req, res, 1))
        return
    try {
        const checkExistingUser = await Users.find({ username: req.body.username })
        if (checkExistingUser.length) {
            res.status(200).send({ msg: "User Exist, this Mail Is Already have an Account.", error: 1 })
            return
        }

        const user = new Users({ username: req.body.username, password: req.body.password, name: req.body.name })
        user.save()
        res.status(200).send({ err: 0, msg: "" })

    } catch (error) {
        res.status(200).send(
            { msg: error }
        )
    }

})


module.exports = router