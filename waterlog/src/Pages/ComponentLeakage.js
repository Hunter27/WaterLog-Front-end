import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaksById } from '../actions/segmentLeaksByIdActions';

import LeakageInfoComponent from './LeakageInfoComponent';
import WastageSummaryComponent from './wastageSummary';


class ComponentLeakage extends Component {
    
    componentWillMount() {
		this.props.fetchSegmentsLeaksById(this.props.id);
	}

    


    resolveLeak(){
        //verify if it is resolved and disable the button if it 
        console.log('Leak is resolved');
        alert('resolved')
    }


    render (){
        console.log(this.props.leak);

        if(this.props.leak === {}){
            return (<span>Loading ...</span>)
        } else {
            return(
                <div style={{textAlign:"center"}}>
                <LeakageInfoComponent value={this.props.leak} /*segment={this.props.leak.id} severity={this.props.leak.severity} */ waterLost="20" cost="200"/>
                    <WastageSummaryComponent value={this.props.leak.usage} />
                    <button id="btnResolveLeak" 
                        onClick={()=>this.resolveLeak()}
                    >
                        Resolved 
                    </button>
                    
                </div>
        )
        }   
    }

}

ComponentLeakage.propTypes = {
    fetchSegmentsLeaksById: PropTypes.func.isRequired,
    leak: PropTypes.object.isRequired
  
  };
  
  const mapStateToProps = state => ({
    leak: state.leak.item
  });
  
  
  export default connect(mapStateToProps, { fetchSegmentsLeaksById })(ComponentLeakage);

