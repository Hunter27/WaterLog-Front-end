import React from 'react';
const images = {
	percent_100: 'images/100_tank.png',
	percent_75: 'images/75_tank.png',
	percent_50: 'images/50_tank.png',
	percent_0: 'images/0_tank.png',
	tank_yellow: 'images/tank-yellow.png',
	tank_orange: 'images/tank-orange.png'
};
const Tank = (props)=>{
  console.log(props.tank.percentage);
  const getTankImage = (percent)=>{
		if (percent === 100) {
			return <img src={images.percent_100} alt="100% tank" />;
		} else if (percent === 50) {
			return <img src={images.percent_50} alt="50% tank" />;
		} else if (percent === 0) {
			return <img src={images.percent_0} alt="0% tank" />;
		} else if (percent === 75) {
			return <img src={images.percent_75} alt="75% tank" />;
		} else if (percent >= 1 && percent <= 40) {
			return (
				<div>
					<img src={images.tank_yellow} alt="50% tank" />
					<p id="homepage_percentage">{percent}%</p>
				</div>
			);
		} else if (percent >= 41 && percent <= 79) {
			return (
				<div>
					<img src={images.tank_orange} alt="50% tank" />
					<p id="homepage_percentage">{percent}%</p>
				</div>
			);
		}
	};
return (
    <div className="tank">
      <p>Tank {props.tank.tankId}</p>
      {getTankImage(props.tank.percentage)}
      <p>{props.tank.levelStatus}</p>
      <p className="link">{ props.tank.instruction}</p>
    </div>
  )
}
export default Tank;
