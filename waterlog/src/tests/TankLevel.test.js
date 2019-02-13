import 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import TankComponent from './../Pages/Home';

it('Tank page renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><TankComponent /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
});
