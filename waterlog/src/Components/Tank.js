import React from "react";
import "../Stylesheets/_tank.scss";
const images = {
  tank_yellow: "images/tank-yellow.png",
  tank_orange: "images/tank-orange.png",
  tank_green: "images/tank-green.png"
};

// id: 1
// optimalLevel: 80
// percentageLevel: 80
// pumpId: 1
// tankMonitorsId: 1
//timeStamp: "2019-02-06T06:07:17.9317382"

const Tank = props => {
  const getTankImage = (percent) => {
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
      <p>Tank {props.tank.id}</p>
      {getTankImage(props.tank.percentageLevel)}
    </div>
  );
};
export default Tank;
