import 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { mount,configure } from 'enzyme'
import { MemoryRouter } from 'react-router';
import HomeComponent from './Pages/Home';
import AlertComponent from './Pages/Alert';
import UsageComponent from './Pages/Usage';
import MapComponent from './Pages/Map';
configure({adapter: new Adapter()});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('invalid path should redirect to home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(HomeComponent)).toHaveLength(1);
  expect(wrapper.find(AlertComponent)).toHaveLength(0);
  expect(wrapper.find(UsageComponent)).toHaveLength(0);
  expect(wrapper.find(MapComponent)).toHaveLength(0);
});
