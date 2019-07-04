import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app/js/components/Logic/App'
//import Appf from './app/js/components/Logic/Appf'
import * as serviceWorker from './serviceWorker';
import './app/css/1fonts.css';
import './app/css/2bootstrap.css';
import './app/css/3bootstrap-theme.css';
import './app/css/dapp.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

//console.log('Appf', Appf)

ReactDOM.render((
  <BrowserRouter>
    <App data-testid='app'/>
  </BrowserRouter>
), document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
