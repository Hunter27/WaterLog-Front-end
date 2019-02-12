import 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import AlertComponent from './../Pages/Alert';
import AlertTableComponent, { getStatusIcon }  from './../Components/AlertTable';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './../Components/AlertBox';

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

describe('return correct icon regrdless of case', () => {
    test('return low status, ignoring case', () => {
        expect(getStatusIcon("low")).toEqual(LowStatusIcon());
        expect(getStatusIcon("Low")).toEqual(LowStatusIcon());
        expect(getStatusIcon("LoW")).toEqual(LowStatusIcon());
    })

    test('return normal status, ignoring case', () => {
        expect(getStatusIcon("normal")).toEqual(MediumStatusIcon());
        expect(getStatusIcon("NorMal")).toEqual(MediumStatusIcon());
        expect(getStatusIcon("norMAL")).toEqual(MediumStatusIcon());
    })
    
    test('return high status, ignoring case', () => {
        expect(getStatusIcon("high")).toEqual(HighStatusIcon());
        expect(getStatusIcon("High")).toEqual(HighStatusIcon());
        expect(getStatusIcon("HIGH")).toEqual(HighStatusIcon());
    })
});
