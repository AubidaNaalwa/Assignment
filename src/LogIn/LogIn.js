import {  useState } from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import SignUp from './SignUp'
import './LogIn.css'
function LogIn(props) {
    const [flag, setflag] = useState(0)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState('')

    let history = useHistory()
    const logIn = (event) => {
        event.preventDefault();
        props.userStore.logIn(userName, password)
        history.push('/')
    }

    const changeFlag = () => {
        setPassword('')
        setUserName('')
        setflag(!flag)
    }
    
    return (
        <div className="login-page">
            <div className="form">
                {flag ?
                    <SignUp changeFlag={changeFlag} />
                    :
                    <form className="login-form">
                        <input type="text" placeholder="username" vlaue={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="password" placeholder="password" vlaue={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={logIn}>login</button>
                        <p className="message">Not registered? <span className="createAccount" onClick={() => setflag(!flag)} >Create an account</span></p>
                    </form>
                }
            </div>
        </div>

    );
}

export default inject("userStore")(observer(LogIn))
