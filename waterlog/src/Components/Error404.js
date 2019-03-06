import React, { Component } from "react";

export default class Error404 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageUrl: this.props.urlLink
    };
  }
  render() {
    return (
      <div>
        <img
          className="imageError"
          src="images/error_connection_blue-71.png"
          alt="green on dark loader gif"
        />
        <p className="error404Blue">Oops!</p>
        <p className="error404Grey">
          {"Something went wrong"} <br /> {"with your connection"} 
        </p>
        <p
          className="error404White"> Report the error</p>
        <p>
          <a className="error404White" href="/">
            Try to refresh
          </a>
        </p>
      </div>
    );
  }
}
