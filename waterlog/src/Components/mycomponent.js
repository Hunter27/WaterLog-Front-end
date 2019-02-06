import React, {Component} from 'react';
import { fetchSegmentLeaks } from './../actions/segmentLeaksActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class MyComponent extends Component {
    componentWillMount() {
        this.props.fetchSensors();
        //console.log('segment leaks: ', this.props.fetchSegmentLeaks());
    }

    render(){
        return (
            <p>Hey</p>
        )
    }


}

MyComponent.propTypes = {
    fetchSegmentLeaks: PropTypes.func.isRequired,
    segment_leaks: PropTypes.array.isRequired
  
  };
 
const mapStateToProps = state => ({
    segment_leaks: state.segment_leaks.items
    });

export default connect(mapStateToProps, { fetchSegmentLeaks })(MyComponent);
