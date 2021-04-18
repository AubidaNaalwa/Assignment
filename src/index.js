import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './Store/UserStore'
import { Provider } from 'mobx-react'


let userStore = new UserStore()
const store = { userStore }

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();