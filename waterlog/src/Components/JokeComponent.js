import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchNotifications } from '../actions/NumberOfNotifsActions';


class Joke extends Component {
  componentDidMount() {
    this.timer = setInterval(()=>  this.props.fetchNotifications(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.notif.data}
      </div>
    );
  }
}

Joke.propTypes = {
  fetchNotifications: PropTypes.func,
  notif: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    notif: state.numNotifs.notif.items,
    isfetching: state.numNotifs.notif.isFetching
  };
}

export default connect(mapStateToProps, { fetchNotifications })(Joke);