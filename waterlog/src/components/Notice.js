import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchNotices} from '../actions/NoticeActions';
import PropTypes from 'prop-types';


class Notice extends Component {
 
  componentWillMount(){
    this.props.fetchNotices();
  }
 
  render() {
    const postItems = this.props.notices.map(Notice =>(
    <div key={Notice.id}>
      <h3>{Notice.title}</h3>
      <p>{Notice.body}</p>
    </div>
    )); 
    return (
      <div> 
        <p>THESE ARE THE ITEMS</p>
        {postItems}
      </div>
    )
  }
}

Notice.propTypes={
  fetchNotices: PropTypes.func.isRequired,
 
}
const mapStateToProps= state =>({
  notices:state.notices.items, 
});

export default connect(mapStateToProps,{fetchNotices})(Notice);