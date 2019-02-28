import React, { Component } from "react";
import TankGraph from "./TankGraph";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "./Loader";
import Error404 from "./Error404";
import { fetchTankGraphDaily } from '../actions/TankDailyAction';

class DailyTankGraph extends Component {
  constructor(props) {
    super(props);
    this.openGraph = this.openGraph.bind(this);
    this.state = {
      display: "day"
    };
  }
  componentDidMount() {
    this.openGraph("day");
    this.props.fetchTankGraphDaily(this.props.id);
    ;
  }

  openGraph = graphType => {
    this.setState({
      display: graphType
    });
  };

  getGraphType = () => {
    if (this.state.display === "day") {
      return <TankGraph props={this.props.dailytankgraph} />;
    }
  }
  render() {
    const { error, loading, dailytankgraph } = this.props;
    if (error) {
      return <Error404 />;
    }
    if (loading) {
      return <Loader />;
    }

    return (
      <div className="wastageTank">
        <p>Water Level History</p>
        <TankGraph props={this.props} />
      
      </div>

    );
  }
}

DailyTankGraph.propTypes = {
  fetchTankGraphDaily: PropTypes.func.isRequired,
  dailytankgraph: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  dailytankgraph: state.dailytankgraph.item,
  loading: state.dailytankgraph.loading,
  error: state.dailytankgraph.errorr
});
export default connect(
  mapStateToProps,
  { fetchTankGraphDaily }
)(DailyTankGraph);