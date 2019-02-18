import React, { Component } from 'react'; 
import Link from './Link';
import WastageSummary from './WastageSummary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaksById } from '../actions/SegmentLeaksByIdActions'; 
import Loader from './Loader';
import BtnResolve from './BtnResolve';

class SegmentLeak extends Component{
    constructor(props){
      super(props);
  
      this.handleResolveClick = this.handleResolveClick.bind(this);
      this.state = {
        mapExpanded: false,
        leakResolved: false
      }
    }
    componentDidMount() {
      this.props.fetchSegmentsLeaksById(1);
    }
  
    handleMapExpand(){
      this.setState({
        mapExpanded: !this.state.mapExpanded
      });
    }
  
    handleResolveClick(){
      this.setState({
        leakResolved: !this.state.leakResolved
      });
    }
  
    render(){
      const { error, loading, leak } = this.props;
      if (error) {
        return <div>Error! {error.message}</div>;
      }
      if (loading) {
        return <Loader />
      }
      
      return(
        <div>
          <div className="leakInfo">
                  <h2>Segment {this.props.match.params.id} is Leaking</h2>
                  <p>({leak.leak.severity})</p>
                  <h1>R {leak.data.Item2.toFixed(2)}</h1>
                  <p>is being lost per hour!</p>
                  <p>Loosing {leak.usage.Item2.toFixed(0)}&#x2113; per hour</p>
                  <p>no leak would be 0&#x2113; per hour</p>
                </div>
                <img src={this.state.mapExpanded === false ? "images/map_expand.png" : "images/map_close.png" } 
                  width="50px" 
                  alt="segment-map"
                  onClick={()=>this.handleMapExpand()}
                />
                <hr />
                <Link to="/alert/segment-history/1" text="component history" />
                <p className="wastegeLabel">wastage</p>
                <WastageSummary litres={leak.usage.Item1.toFixed(0)}/>
                <BtnResolve id={this.props.match.params.id}/>
        </div>
      )
    }
  }

  SegmentLeak.propTypes = {
    fetchSegmentsLeaksById: PropTypes.func.isRequired 
  };


  const mapStateToProps = state => ({
    leak: state.leak.items,
    loading: state.leak.loading,
    error: state.leak.errors
  });

  export default connect(
    mapStateToProps,
    { fetchSegmentsLeaksById }
  )(SegmentLeak); 