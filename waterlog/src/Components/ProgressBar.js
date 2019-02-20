import React from 'react';
import Filler from './Filler';

const ProgressBar = props =>{
	return(
	  <div className="progress-bar">
			<Filler severity={props.severity} percent={props.percent}/>
	  </div>
	)
}
export default ProgressBar;
