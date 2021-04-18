const express = require('express')
const Users = require('../Models/Users')
var validator = require('validator');
const router = express.Router()


router.get('/test', (req, res) => {
    res.status(200).send("you are connected")
})

router.post('/login', (req, res) => {

    if (!req.body.username || !req.body.password) {
        res.status(303).send(
            { msg: "missing info" }
        )
    }
    const check = validator.isEmail(req.body.username)
    if (!check) {
        res.status(500).send(
            { msg: "invalid Mail Address" }
        )
        return
    }

    Users.findOne({ username: req.body.username, password: req.body.password }, function (err, obj) {
        if (err) {
            res.status(404).send(
                { msg: "missing info", err: 1 }
            )
        } else {
            if (obj)
                res.status(200).send(
                    { err: 0, msg: "LogIn succesful" }
                )
            else
                res.status(200).send(
                    { err: 2, msg: "UserName or password not currect" }
                )
        }
    })

})

router.post('/signUp', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name) {
            res.status(303).send(
                { msg: "missing info", error: 2 }
            )
        }

        const check = validator.isEmail(req.body.username)
        if (!check) {
            res.status(500).send(
                { msg: "invalid Mail Address" }
            )
            return
        }

        const checkExistingUser = await Users.find({ username: req.body.username })
        if (checkExistingUser.length) {
            res.status(303).send({ msg: "User Exist", error: 1 })
            return
        }

        const user = new Users({ username: req.body.username, password: req.body.password, name: req.body.name })
        user.save()
        res.status(200).send({ err: 0, msg: "" })

    } catch (error) {
        res.status(404).send(
            { msg: error }
        )
    }

})


module.exports = router