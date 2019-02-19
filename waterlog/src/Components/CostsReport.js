import React, { Component } from 'react'
import DailyCostsReports from './DailyCostsReports';
import { fetchCostsDaily } from '../actions/CostsReportActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CostsReport extends Component {
    constructor(props) {
        super(props);

        this.openGraph = this.openGraph.bind(this);
        this.state = {
            display: "daily"
        }
    }
    componentDidMount() {
        this.openGraph("daily");
        this.props.fetchCostsDaily();
    }
    openGraph = (graphType) => {
        this.setState({
            display: graphType
        })
    }
    getGraphType = () => {
        if (this.state.display === "daily")
            return <DailyCostsReports props={this.props.dailyCost} />
        else
            return <div>Error has occured</div>
    }
    render() {
        return (
            <div className="wastage">
                <p>Cost</p>
                <div className="graph-nav tab">
                    <button className={`btn-graph-nav tablinks ${this.state.display === "daily" ? "active" : ""}`}
                        onClick={(e) => this.openGraph("daily")}
                        id="openByDefault"
                    >
                        Daily
              </button>
                </div>
                <div className="tabcontent">
                    {this.getGraphType()}
                </div>
            </div>
        )
    }
}

CostsReport.propTypes = {
    fetchCostsDaily: PropTypes.func.isRequired,
    dailyCost: PropTypes.object
};

const mapStateToProps = (state) => ({
    dailyCost: state.dailyCost.item
})

export default connect(mapStateToProps, { fetchCostsDaily })(CostsReport)
