import { observable, action, makeObservable, computed } from 'mobx'
import axios from 'axios'
var validator = require('validator');

export default class UserStore {
    constructor() {
        this.username = ""
        this.isLogged = false
        makeObservable(this, {
            username: observable,
            isLogged: observable,
            checkIfLoggedIn: action,
            logIn: action,
            setLoggedIn: action,
            setLoggedOut: action,
            signUp: action
        })
    }

    checkIfLoggedIn = () => {
        this.username = localStorage.getItem('username')
        this.isLogged = localStorage.getItem('isLogged')
    }


    setLoggedIn = (username, name) => {
        localStorage.setItem("username", username)
        localStorage.setItem("isLogged", true)
        this.username = username
        this.isLogged = true
    }

    setLoggedOut = () => {
        localStorage.clear()
        this.username = ""
        this.isLogged = false
    }

    async logIn(username, password) {
        if (!this.validateInformation({ name: 1, username, password })) {
            return
        }
        try {
            const response = await axios.post('/login', { username, password })
            if (response.data.err === 0) {
                this.setLoggedIn(username)
            } else {
                alert(response.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    signUp = async (name, username, password) => {
        if (!this.validateInformation({ name,username, password })) {
            return
        }
        try {
            const response = await axios.post('/signUp', { username, password, name })
            if (response.data.err === 0) {
                alert(`Account name ${name}, and userName ${username} created successfuly.`)
                this.setLoggedIn(username)
            } else {
                alert(response.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    validateInformation({ name, username, password }) {
        if (!username || !password || !name) {
            alert("missing Fields ")
            return false
        }
        if (!validator.isEmail(username)) {
            alert("invalid Email")
            return false
        }
        return true
    }

}