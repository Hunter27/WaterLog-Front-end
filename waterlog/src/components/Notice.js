import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchNotices} from '../actions/NoticeActions';
import PropTypes from 'prop-types';


class Notice extends Component {
 
  componentDidMount(){
    this.props.fetchNotices();
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.newNotice) {
      this.props.notices.unshift(nextProps.newNotice);
    }
  }

  render() {
    const noticeItems = this.props.notices.map(notice =>(
    <div key={notice.id}>
      <h3>{notice.title}</h3>
      <p>{notice.body}</p>
    </div>
    )); 
    return (
      <div> 
        <p>THESE ARE THE ITEMS</p>
        {noticeItems}
      </div>
    )
  }
}

Notice.propTypes={
  fetchNotices: PropTypes.func.isRequired,
  notices: PropTypes.array.isRequired,
  newNotice: PropTypes.object
}
const mapStateToProps= state =>({
  notices:state.notices.items, 
  newNotice:state.notices.item
});

export default connect(mapStateToProps,{fetchNotices})(Notice);