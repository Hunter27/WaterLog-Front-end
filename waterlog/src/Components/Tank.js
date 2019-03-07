import React from "react";
import { getTankImage } from './../utils';

const conditions = (percent) => {
	if (percent > 80) {
		return <p>
			{"Optimal Level"} <br /> {"Turn pump off"}
		</p>;
	}

	else if (percent >= 50 && percent <= 80) {
		return <p>
			{"Acceptable Level"} <br /> {"Turn pump off"}
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
			<p className="status">{conditions(percentageLevel)}</p>
		</div>
	);
};
export default Tank;
