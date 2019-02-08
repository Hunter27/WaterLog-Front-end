import React, {
  Component
} from 'react';

export default class HeaderComponent extends Component {
  render() {
    return ( 
    <div className="header">
      <h3>
      <img className="burger-menu" onClick = {() => alert('Please dont do that again')}
      src = "images/burger_menu.png"
      alt = "icon" />
      <img className="logo" src="images/logo.png"
      alt = "retrorabbit" />
      WATER LOG - RETRO RABBIT </h3>  
    </div>  
    );
  }
}
