import 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import BtnResolve from '../Components/BtnResolve';

it('Alert table renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BtnResolve /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
