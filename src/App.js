import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from './LogIn/LogIn'
import Home from './Home/Home'

import './App.css';

function App(props) {
  props.userStore.checkIfLoggedIn()
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          {props.userStore.isLogged ? <Home /> : <LogIn />}
        </Route>
      </Switch>
    </Router>
  );
}

export default inject("userStore")(observer(App))
