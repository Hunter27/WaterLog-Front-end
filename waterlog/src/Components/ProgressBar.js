import React from 'react';
import Filler from './Filler';
const ProgressBar = props =>{
	return(
	  <div>
			<Filler severity={props.severity} percent={props.percent}/>
	  </div>
	)
}
export default ProgressBar;
