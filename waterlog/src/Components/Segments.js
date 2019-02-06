import React, { Component } from 'react'

class Segments extends Component {
  render() {
    const segments = this.props.segments.map(segments => (
        <div key={segments.id}> 
           <p>{segments.senseIDOut}</p>
           <p>{segments.senseIDIn}</p>
        </div>
      ));
    return (
        <div> 
        {segments}
       </div>
    )
  }
} 
export default Segments;