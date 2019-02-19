import React from 'react';
import Filler from './Filler';

const ProgressBar = props =>{
	return(
	  <div className="progress-bar">
			<Filler percent="40"/>
	  </div>
	)
}
export default ProgressBar;
