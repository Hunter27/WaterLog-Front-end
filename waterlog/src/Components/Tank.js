import React from 'react';

const Tank = (props)=>{
  const tankIcon = ()=>{
    if(props.tank.percentage < 50)
      return "images/tank_0.png"
    else if (props.tank.percentage >= 50 && props.tank.percentage < 75)
      return "images/tank_50.png"
    else if (props.tank.percentage >= 75 && props.tank.percentage < 95)
      return "images/tank_75.png"
    else
    return "images/tank_100.png"
  }

  const pumpStatusIndicator = () => {
    if(props.tank.pumpOn===true && props.tank.percentage ===0)
      return "turn pump off";
    else if(!props.tank.pumpOn && props.tank.percentage < 5)
      return "turn pump on";
    else 
      return "leave pump on";  
  }

return (
    <div className="tank">
      <p>Tank {props.tank.tankId}</p>
      <img src={tankIcon()} alt="100% tank"/>
      <p>{props.tank.levelStatus}</p>
      <p className="link">{ props.tank.instruction}</p>
    </div>
  )
}
export default Tank;
