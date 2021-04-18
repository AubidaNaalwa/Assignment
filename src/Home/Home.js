import { observer, inject } from 'mobx-react'

function Home(props) {

    return (
        <div className="Home">
            <h1>{props.userStore.username } You are Signed In</h1>
            <button onClick={props.userStore.setLoggedOut}>LogOut</button>
        </div >
    );
}

export default inject("userStore")(observer(Home))
