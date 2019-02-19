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
    render() {
        return (
            <div>

            </div>
        )
    }
}

CostsReport.propTypes = {
    fetchCostsDaily: PropTypes.func.isRequired,
    dailyCost: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    dailyCost: state.dailyCost.item
})

export default connect(mapStateToProps, { fetchCostsDaily })(CostsReport)
