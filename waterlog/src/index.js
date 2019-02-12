import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss'
import App from './App';
import * as serviceWorker from './ServiceWorker';
import TankComponent from './Components/TankComponent';
import TankLevel from './Components/TankLevel';


ReactDOM.render(<div>
    <TankComponent tankName="Tank1" pumpStatus="Turn pump off"  levelDescription="sufficient level"/>
    
    

</div>, document.getElementById('root'));
serviceWorker.register();
