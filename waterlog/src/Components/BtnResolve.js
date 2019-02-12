import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaksResolve } from '../actions/SegmentResolveActions';

class BtnResolve extends Component {

  componentDidMount() { 
    this.props.fetchSegmentsLeaksResolve(1);
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
        <button onClick={() => this.resolve(leaksResolves)} className="BtnResolve" > Resolve </button>
      </div>
    )
  }

  resolve(leaksObject) {

    leaksObject = this.props.leaksResolves;
    console.log(leaksObject);
  }
}

BtnResolve.propTypes = {
  fetchSegmentsLeaksResolve: PropTypes.func.isRequired, 
};

const mapStateToProps = (state) => ({
  leaksResolves: state.leaksResolves.items,
  loading: state.leaksResolves.loading,
  error: state.leaksResolves.errors
});

export default connect(mapStateToProps, { fetchSegmentsLeaksResolve })(BtnResolve);
