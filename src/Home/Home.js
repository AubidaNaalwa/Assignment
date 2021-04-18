import { observer, inject } from 'mobx-react'
import './Home.css'
function Home(props) {

    return (
        <div className="Home">
            <h1>{props.userStore.username } You are Signed In</h1>
            <button className ="buttonLogOut" onClick={props.userStore.setLoggedOut}>LogOut</button>
        </div >
    );
}

export default inject("userStore")(observer(Home))
