import React from 'react';
import ProgressBar from './ProgressBar';

const WastageSummary = (props) => {
	const percentage = isNaN(props.percent) ? 0 : props.percent;
    return (
		<div className="wastage-summary">
			<p>{percentage}% or {props.litres}&#x2113;</p>
			<p>(of the total water used is being lost due to this pipe)</p>
			<ProgressBar severity={props.severity} percent={percentage}/>
			<p>(only {100-percentage}% of the water passing out the tanks throughout the system is being used)</p>
		</div>
    )
}
export default WastageSummary;
