import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchLeakLitres } from "../actions/LeakLitresActions";

class LeakLitres extends Component {
  componentDidMount() {
    this.props.fetchLeakLitres();
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const leakItem = this.props.litres;

    return (
      <div>
        <h1>{leakItem.item.Item1}</h1>
      </div>
    );
  }
}

LeakLitres.propTypes = {
  fetchLeakLitres: PropTypes.func.isRequired,
  litres: PropTypes.object
};

function mapStateToProps(state) {
  return { litres: state.litres };
}

export default connect(
  mapStateToProps,
  { fetchLeakLitres }
)(LeakLitres);
