import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss'
import App from './App';
import * as serviceWorker from './ServiceWorker';
import TankComponent from './Components/TankComponent';
import TankLevel from './Components/TankLevel';


ReactDOM.render(<div>
    <TankComponent tankName={1} pumpStatus={true}  levelDescription="sufficient level"/>

    

</div>, document.getElementById('root'));
serviceWorker.register();
