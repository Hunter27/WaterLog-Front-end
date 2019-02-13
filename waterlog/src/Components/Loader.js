import React from 'react';

const Loader = () => {
    return(
      <div>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h3 className="home-text">Loading ...</h3>
      </div>
    )
}
export default Loader;