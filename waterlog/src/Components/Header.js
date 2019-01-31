import React, { Component } from 'react';

export default class HeaderComponent extends Component {
  render() {
    return (
      <div style={{
        width:'100%', display:'block', marginBottom:'5px', padding: '5px', backgroundColor: 'blue', textAlign:'center'
      }}>  
        <h2>
          <img src="images/logo.png" width="50px" height="50px" alt="retrorabbit" />
            WATER LOG - RETRO RABBIT
        </h2>  
      </div>
        
    );
  }
}




