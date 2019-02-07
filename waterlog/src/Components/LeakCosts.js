import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLeaksCosts } from '../actions/LeakCostsActions';

class LeakCosts extends Component {

  componentDidMount(){
    this.props.fetchLeaksCosts();
  }

  constructor(props) {
    super(props); 
    this.state = {}
 }
  
  render() {
    const costsItem = this.props.costs;
    console.log("go",costsItem)
    return (
      <div> 
        {costsItem.item.Item1} 
      </div>
    )
  }
}

LeakCosts.propTypes = {
  fetchLeaksCosts: PropTypes.func.isRequired,
  costs: PropTypes.object
};

function mapStateToProps(state) {
  return {costs: state.costs}
}

 
export default connect(mapStateToProps, { fetchLeaksCosts })(LeakCosts);