import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaksById } from '../actions/SegmentLeaksByIdActions';
import LeakageInfoComponent from './LeakageInfoComponent';
import WastageSummaryComponent from './../Components/WastageSummary';

class ComponentLeakage extends Component {
    
    componentWillMount() {
		this.props.fetchSegmentsLeaksById(this.props.id);
	}

    render (){
        if(this.props.leak === {}){
            return (<span>Loading ...</span>)
        } else {
            return(
                <div className="leakageComponent">
                    <LeakageInfoComponent value={this.props.leak} />
                    <WastageSummaryComponent value={this.props.leak.usage} />
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
