import React from 'react';
import ProgressBar from './ProgressBar';

const WastageSummary = (props) => {
    return (
		<div className="wastage-summary">
			<p>{props.percent}% or {props.litres}&#x2113;</p>
			<p>(of the total water used is being lost due to this pipe)</p>
			<ProgressBar severity={props.severity} percent={props.percent}/>
			<p>(only {100-props.percent}% of the water passing out the tanks throughout the system is being used)</p>
		</div>
    )
}
export default WastageSummary;
