import 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';

import AlertComponent from './../Pages/Alert'
import AlertTableComponent  from './../Components/AlertTable_'

it('Alert page renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<AlertComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('Alert table renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><AlertTableComponent /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});


  