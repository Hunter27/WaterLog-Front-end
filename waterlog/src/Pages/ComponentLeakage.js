import React, { Component }from 'react';

import LeakageInfoComponent from './LeakageInfoComponent';
import WastageSummaryComponent from './wastageSummary';

class ComponentLeakage extends Component {

    id = this.props.sectionID;

    resolveLeak(){
        //verify if it is resolved and disable the button if it 
        console.log('Leak is resolved');
        alert('resolved')
    }

    render (){
        return (
            <div style={{textAlign:"center"}}>
                <LeakageInfoComponent section="Section 1" severity="Moderate" waterLost="20" cost="200"/>
                <WastageSummaryComponent percent="40" waterLost="250"/>
                <button id="btnResolveLeak" 
                    onClick={()=>this.resolveLeak()}
                >
                    Resolved
                </button>
            </div>
        );
    }

}
export default ComponentLeakage;
