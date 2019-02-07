import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegments } from '../actions/SegmentActions';

class Segments extends Component {
    componentWillMount() {
        this.props.fetchSegments();
    }

    render() {
        const segments = this.props.segments.map(segments => (
            <div key={segments.id}>
                <p>{"Id: " + segments.id}</p>
                <p>{"sense ID out: " + segments.senseIDOut}</p>
                <p>{"sense ID in: " + segments.senseIDIn}</p>
            </div>
        ));
        return (
            <div>
                {segments}
            </div>
        )
    }
}

Segments.propTypes = {
    fetchSegments: PropTypes.func.isRequired,
    segments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    segments: state.segments.items
});

export default connect(mapStateToProps, { fetchSegments })(Segments);