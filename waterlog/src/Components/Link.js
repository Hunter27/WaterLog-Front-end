import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
    return(
      <NavLink className="nav-btn" to={ props.to }>{ props.text }</NavLink>
    )
}
export default Link;