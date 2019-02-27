import React, { Component } from 'react'
import { connect } from 'react-redux';
import root from '../actions/Saga';
import PropTypes from 'prop-types';

class TryNumberNotifs extends Component {

    componentDidMount() {
        this.props.root();
    }
    render() {
        const notifItems = this.props.numNotifs;
        console.log("The number of notif: ",notifItems )
        return (
            <div>
            {notifItems}
            </div>
        )
    }
}

TryNumberNotifs.propTypes = {
    root: PropTypes.func.isRequired,
    numNotifs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    numNotifs: state.numNotifs.items, 
});
export default connect(mapStateToProps, { root })(TryNumberNotifs);

