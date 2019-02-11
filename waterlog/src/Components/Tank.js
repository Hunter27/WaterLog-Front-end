import React from 'react';

const Tank = (props)=>{
  const tankIcon = ()=>{
    if(props.tank.waterLevel < 50)
      return "images/tank_0.png"
    else if (props.tank.waterLevel >= 50 && props.tank.waterLevel < 75)
      return "images/tank_50.png"
    else if (props.tank.waterLevel >= 75 && props.tank.waterLevel < 95)
      return "images/tank_75.png"
    else
    return "images/tank_100.png"
  }

  const pumpStatusIndicator = () => {
    if(props.tank.pumpOn===true && props.tank.waterLevel > 95)
      return "turn pump off";
    else if(!props.tank.pumpOn && props.tank.waterLevel < 5)
      return "turn pump on";
    else 
      return "leave pump off";  
  }

  return (
    <div className="tank">
      <p>{props.tank.name}</p>
      <img src={tankIcon()} alt="100% tank"/>
      <p>{props.tank.status}</p>
      <p className="link">{pumpStatusIndicator()}</p>
    </div>
  )
}
export default Tank;
