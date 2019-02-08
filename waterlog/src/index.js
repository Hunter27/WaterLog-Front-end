import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss'
import './Stylesheets/_index.scss';
import './Stylesheets/_header.scss';
import App from './App';
import * as serviceWorker from './ServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
