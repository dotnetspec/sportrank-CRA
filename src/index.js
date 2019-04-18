import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import AppHTML from './AppHTML';
import App from './app/js/components/App'
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<AppHTML />, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
