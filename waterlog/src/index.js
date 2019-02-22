import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./ServiceWorker";
import { Provider } from 'react-redux';
import configureStore from './ConfigRedux/store/configureStore';

const store = configureStore()

const renderApp = () =>
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App.js', renderApp)
}
renderApp()
serviceWorker.register(); 