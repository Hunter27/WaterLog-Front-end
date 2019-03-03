import React from "react";
import { getTankImage } from './../utils';

const Tank = props => {
	const { id, percentageLevel } = props.tank;
  return (
		<div className="tank" onClick={() => (window.location = `/alert/tank/${id}`)}>
			<p>Tank {props.tank.id}</p>
			<img src={getTankImage(percentageLevel)}
				alt={`${percentageLevel}% tank`}/>
			<p>{percentageLevel}%</p>
    </div>
  );
};
export default Tank;
