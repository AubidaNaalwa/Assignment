import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react'

function SignUp(props) {

    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState('')

    let history = useHistory()

    const signUp = (event) => {
        event.preventDefault();
        props.userStore.signUp(name, userName, password)
        history.push('/')
    }

    return (
        <form className="login-form">
            
            <input type="text" placeholder="name" value={name} onChange={({ target }) => setName(target.value)} />
            <input type="text" placeholder="email address" vlaue={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="password" placeholder="password" vlaue={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signUp}>create</button>
            <p className="message">Already registered? <span className="createAccount" onClick={props.changeFlag}>Sign In</span></p>
        </form>
    );
}

export default inject("userStore")(observer(SignUp))
