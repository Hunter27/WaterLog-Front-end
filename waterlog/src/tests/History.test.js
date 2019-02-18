import 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import HistoryComponent from './../Pages/Alert';
import HistoryTableComponent, { getStatusIcon }  from './../Components/AlertTable';

it('History page renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<HistoryComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('History table renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><HistoryTableComponent /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
