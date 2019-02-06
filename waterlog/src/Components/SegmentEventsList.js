import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsEvents } from '../actions/SegmentEvents';

class SegmentEventsList extends Component {

    componentWillMount() {
        this.props.fetchSegmentsEvents();
    }

    render() {

        const events = this.props.events.map(events => (
            <div key={events.id}>
                <h3>{"Event ID: " + events.id}</h3>
                <p>{"Event type: " + events.eventType}</p>
                <p>{"Segment ID: " + events.segmentId}</p>
                <p>{"flow in: " + events.flowIn}</p>
                <p>{"flow out: " + events.flowOut}</p>
            </div>
        ));
        return (
            <div>
                {events}
            </div>
        )
    }
}
SegmentEventsList.propTypes = {
    fetchSegmentsEvents: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    events: state.events.items
});
export default connect(mapStateToProps, { fetchSegmentsEvents })(SegmentEventsList); 
