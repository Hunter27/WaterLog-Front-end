import React from "react";
import "../Stylesheets/_tank.scss";
const images = {
  tank_yellow: "images/tank-yellow.png",
  tank_orange: "images/tank-orange.png",
  tank_green: "images/tank-green.png"
};
const Tank = props => {
  const getTankImage = percent => {
    if (percent >= 1 && percent <= 40) {
      return (
        <div>
          <img src={images.tank_yellow} alt="tank" />
          <p id="homepage_tank_percentage_lightimage">{percent}%</p>
        </div>
      );
    } else if (percent >= 41 && percent <= 79) {
      return (
        <div>
          <img src={images.tank_orange} alt="tank" />
          <p id="homepage_tank_percentage_lightimage">{percent}%</p>
        </div>
      );
    } else if (percent >= 80 && percent <= 100) {
      return (
        <div>
          <img src={images.tank_green} alt="tank" />
          <p id="homepage_tank_percentage">{percent}%</p>
        </div>
      );
    }
  };

  return (
    <div className="tank">
      <p>Tank {props.tank.tankId}</p>
      {getTankImage(props.tank.percentage)}
    </div>
  );
};
export default Tank;
