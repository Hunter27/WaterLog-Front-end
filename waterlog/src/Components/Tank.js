import React from "react";
import { getTankImage } from './../utils';

const conditions = (percent) => {
	if (percent > 80) {
		return <p>
			{"pump is on"} <br /> {"the tank is being overfilled"}
		</p>;
	}

	else if (percent >= 50 && percent <80) {
		return <p>
			{"pump is on"} 
		</p>;
	}
	else if (percent ===80) {
		return <p>
			{"optimal level"} <br /> {"pump is on"}
		</p>;
	}

	else if (percent >= 1 && percent <= 49) {
		return <p >
			{"Insufficient Level"} <br /> {"Turn pump on"}
		</p>
	}

	else {
		return <p >
			{"Empty Tank"} <br /> {"Turn pump on"}
		</p>;
	}
}
const Tank = props => {
	const { id, percentageLevel } = props.tank;
	return (
		<div className="tank" onClick={() => (window.location = `/alert/tank/${id}`)}>
			<p>Tank {props.tank.id}</p>
			<img src={getTankImage(percentageLevel)}
				className={(percentageLevel === 0 || percentageLevel > 80) ? 'exclamation' : ''}
				alt={`${percentageLevel}% tank`} />
			<p>{percentageLevel}%</p>
			{(() => {
				if(props.atHome){
					return	<p className="status">{conditions(percentageLevel)}</p>
				}
			})()}
		
		</div>
	);
};
export default Tank;
