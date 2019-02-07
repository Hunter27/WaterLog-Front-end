import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaks } from '../actions/segmentLeaksActions';

import LeakageInfoComponent from './LeakageInfoComponent';
import WastageSummaryComponent from './wastageSummary';

class ComponentLeakage extends Component {
    constructor(){
        super();

        this.state = {
            leak: {},
            cost: {},
            usage: {},
        }
    }

    componentWillMount() {
        this.props.fetchSegmentsLeaks();
    }

    componentDidMount() {
		fetch('https://localhost:44382/api/segmentleaks')
			.then(response => response.json())
			.then(data => {
				this.setState({ data });
			})
			.catch(err => {
				console.log(err)
            });

        fetch('https://localhost:44382/api/segmentleaks')
			.then(response => response.json())
			.then(data => {
				this.setState({ data });
			})
			.catch(err => {
				console.log(err)
            }
        );

        fetch('https://localhost:44382/api/segmentleaks')
			.then(response => response.json())
			.then(data => {
				this.setState({ data });
			})
			.catch(err => {
				console.log(err)
            }
        );      
	}

    resolveLeak(){
        //verify if it is resolved and disable the button if it 
        console.log('Leak is resolved');
        alert('resolved')
    }


    render (){
        const leaksItems= this.props.leaks;
        const leak = this.props.leaks[0];
        console.log(leaksItems);
        return (
            <div style={{textAlign:"center"}}> 
            <LeakageInfoComponent segment={leak.segmentId} severity={leak.severity} waterLost="20" cost="200"/>
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

ComponentLeakage.propTypes = {
    fetchSegmentsLeaks: PropTypes.func.isRequired,
    leaks: PropTypes.array.isRequired
  
  };
  
  const mapStateToProps = state => ({
    leaks: state.leaks.items
  });
  
  
  export default connect(mapStateToProps, { fetchSegmentsLeaks })(ComponentLeakage);