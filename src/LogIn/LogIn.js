import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import './LogIn.css'
function LogIn(props) {
    const [flag, setflag] = useState(0)
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState('')
    let history = useHistory()
    const logIn = (event) => {
        event.preventDefault();
        props.userStore.logIn(userName, password)
        history.push('/')
    }

    const signUp = (event) => {
        event.preventDefault();
        props.userStore.signUp(name, userName, password)
        history.push('/')
    }

    return (
        <div className="login-page">
            <div className="form">
                {flag ?
                    <form className="login-form">
                        <input type="text" placeholder="name" value={name} onChange={({ target }) => setName(target.value)} />
                        <input type="text" placeholder="email address" vlaue={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="password" placeholder="password" vlaue={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={signUp}>create</button>
                        <p className="message">Already registered? <span onClick={() => setflag(!flag)}>Sign In</span></p>
                    </form>
                    :
                    <form className="login-form">
                        <input type="text" placeholder="username" vlaue={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="password" placeholder="password" vlaue={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={logIn}>login</button>
                        <p className="message">Not registered? <span onClick={() => setflag(!flag)} >Create an account</span></p>
                    </form>
                }
            </div>
        </div>

    );
}

export default inject("userStore")(observer(LogIn))
