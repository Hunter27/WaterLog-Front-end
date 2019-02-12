import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSegmentsLeaksResolve } from "../actions/SegmentResolveActions";

class BtnResolve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Resolve Issue"
    };
  }
  componentDidMount() {
    this.props.fetchSegmentsLeaksResolve(this.props.id);
  }
  render() {
    const { error, loading, leaksResolves } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h4>{this.state.text}</h4>
        <button
          onClick={() => this.resolve(leaksResolves)}
          className="BtnResolve"
        >

          Resolve
        </button>
      </div>
    );
  }

  resolve(leaksObject) {
    leaksObject = this.props.leaksResolves;
    if (leaksObject.resolvedStatus === "unresolved") {
      this.setState({
        text: "Leak not resolved"
      });
    } else {
      this.setState({
        text: "Issue resolved "
      });
    }
  }
}

BtnResolve.propTypes = {
  fetchSegmentsLeaksResolve: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leaksResolves: state.leaksResolves.items,
  loading: state.leaksResolves.loading,
  error: state.leaksResolves.errors
});

export default connect(
  mapStateToProps,
  { fetchSegmentsLeaksResolve }
)(BtnResolve);
