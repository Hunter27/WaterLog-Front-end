import React, {
  Component
} from 'react';

export default class HeaderComponent extends Component {
  render() {
    return ( 
    <div className="header">
      <h3>
      <img onClick = {() => alert('Please dont do that again')}
      src = "images/burger_menu.png"
      width = "35px"
      height = "35px"
      alt = "icon" />
      <img src = "images/logo.png"
      width = "50px"
      height = "50px"
      alt = "retrorabbit" />
      WATER LOG - RETRO RABBIT </h3>  
    </div>  
    );
  }
}
