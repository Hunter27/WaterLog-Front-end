import React, { Component } from 'react';	
import './../Stylesheets/_alerts.scss';
import { NavLink } from 'react-router-dom';

class AlertTableComponent extends Component {
	
	alertInfo = ["DATE","DESCRIPTION","COST","STATUS"];

    constructor(props) {
        super(props);
        this.state = {
            data: [{"id": "1", "date":"06/25/2019","desc":"SECTOR 2 LEAK","cost":500,"status":"Red"}]			
        }; 
    }
	
    render() {
        return(
            <table> 
                <thead>
                    <tr>
                        {this.alertInfo.map(
                            info => <th key={info}>{ info }</th>
                        )}
                    </tr>
                </thead> 
                <tbody>
                    {this.state.data.map(
                        alert => <tr key={alert.id}
                                    className={alert.status==='Fault' ? 'fault' : ''}
                                    //onClick={()=>window.location = `/alert/segment/${alert.id}`}
                                >
                                    <td>{alert.date}</td>
                                    <td>{alert.desc}</td>
                                    <td>R{alert.cost }/hr</td>
                                    <NavLink to={`/alert/segment/${alert.id}`}><td>{alert.status}</td></NavLink>
                                </tr>
                    )}
                </tbody>
            </table> 
        );
    }
}

export default AlertTableComponent;
