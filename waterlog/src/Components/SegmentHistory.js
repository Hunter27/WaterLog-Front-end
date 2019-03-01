import React, { Component } from "react";
import HistoryTable from "./HistoryTable";

class SegmentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
  }
  render() {
    return (
      <div>
        <p className="home-text">Segment {this.state.id}</p>
        <p className="home-text">Alert History</p>
        <HistoryTable id={this.state.id} />
      </div>
    );
  }
}
export default SegmentHistory;
