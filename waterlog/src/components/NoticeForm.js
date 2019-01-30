import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createNotice} from '../actions/NoticeActions';

class NoticeForm extends Component {

  constructor(props){
  super(props);
  this.state ={
      title:'',
      body:'',
      
  };
  this.onChange=this.onChange.bind(this);
  this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e){
      this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
      e.preventDefault();
      const post ={
          title: this.state.title,
          body:this.state.body
      }
      //call action
      this.props.createNotice(post);
  }    
  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit ={this.onSubmit}>
            <div>
                <label>Title:</label><br/>
                <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
            </div>
            <br/>
            <div>
                <label>Body:</label><br/>
                <textarea name="body"/>
            </div>
            <br/>
            <button type="submit">submit</button>
        </form>
      </div>
    )
  }
}

NoticeForm.propTypes ={
    createNotice: PropTypes.func.isRequired
}
export default connect(null,{createNotice})(NoticeForm);