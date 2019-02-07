import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';
import {
  fetchSegmentsLeaks
} from '../actions/SegmentLeaksActions';

class Segmentleaks extends Component {

  componentWillMount() {
    this.props.fetchSegmentsLeaks();
  }

  render() {
    const leaksItems = this.props.leaks.map(leaks => ( 
    <div key = {leaks.id} >
      <h3 > {leaks.severity} </h3> 
      <p> {leaks.resolvedStatus} </p>  
    </div>
    ));

    return ( 
    <div> {leaksItems} </div>
    )
  }
}

Segmentleaks.propTypes = {
  fetchSegmentsLeaks: PropTypes.func.isRequired,
  leaks: PropTypes.array.isRequired

};

const mapStateToProps = state => ({
  leaks: state.leaks.items
});


export default connect(mapStateToProps, {
  fetchSegmentsLeaks
})(Segmentleaks);