import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaks } from '../actions/SegmentResolveActions';

class BtnResolve extends Component {

  componentDidMount() {
    this.props.fetchSegmentsLeaks(1);
  }

  render() {

    const { error, loading, leaks } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <button onClick={() => this.resolve(leaks)} className="BtnResolve" > Resolve </button>
      </div>
    )
  }

  resolve(leaksArray) {

    leaksArray = this.props.leaks;
    console.log(leaksArray);



    /* for (var i = 0; i < this.state.data.length; i++) {
       if (this.state.data[i].status === "faulty") {
         this.setState({
           text: "Can't resolve " + this.state.data[i].type + " " + this.state.data[i].id + ' is faulty'
         });
       } else {
         this.setState({
           text: 'Good '
         });
       }
     }*/
  }
}

BtnResolve.propTypes = {
  fetchSegmentsLeaks: PropTypes.func.isRequired,
  leaks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  leaks: state.leaks.items,
  loading: state.leaks.loading,
  error: state.leaks.errors
});

export default connect(mapStateToProps, { fetchSegmentsLeaks })(BtnResolve);
