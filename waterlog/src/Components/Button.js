import React, { Component } from 'react';

class Button extends Component {
    render(){
		return (
			<button onClick={()=>this.props.click()}
				className={this.props.leakResolved === false ? "unresolved " : " "}
			>
				{this.props.text}
			</button>
		)
    }
}
export default Button;
