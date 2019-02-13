import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss'
import App from './App';
import * as serviceWorker from './ServiceWorker';

ReactDOM.render( <App />, document.getElementById('root'));
serviceWorker.register();
