import React, { Component } from 'react';

export default class HeaderComponent extends Component {
  render() {
    return (
      <div style={{
        width:'100%', color: 'white',
        display:'block', marginBottom:'5px', padding: '5px', backgroundColor: '#4f5b62', textAlign:'left'
      }}>
        <h3>
          <img onClick={()=>alert('Please dont do that again')} src="images/burger_menu.png" width="35px" height="35px" alt="icon" />
          <img src="images/logo.png" width="50px" height="50px" alt="retrorabbit" />
            WATER LOG - RETRO RABBIT
        </h3>  
      </div>  
    );
  }
}




