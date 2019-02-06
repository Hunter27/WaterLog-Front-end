import React, { Component } from 'react'

 
const APIUri = 'http://api.iot.retrotest.co.za/api/monitors';
class BtnResolve extends Component {
   
    monitorInfo = ["id","type","max_flow","location","status"];
	faults = 0;

  constructor(props) {
    super(props);
    this.state = {
			data: [{"id":0,"type":"xxxx","max_flow":0.0,"long":0.0,"lat":0.0,"status":"xxx"}],
      faultyMonitors: 0,
      text:'Resolve Issue'
		}; 
	}
		
  componentDidMount() {
    fetch(APIUri)
      .then(response => response.json())
      .then(data => {
				this.setState({ data });
			})
      .catch(err => {
          console.log(err)
			});
  
    } 
  resolve(){ 
        for(var i = 0; i < this.state.data.length; i++)
        { 
          if(this.state.data[i].status==="faulty")
          {
           // console.log(this.state.data[i].status);
           this.setState({
            text: "Can't resolve "+this.state.data[i].type+" "+ this.state.data[i].id +' is faulty'
          });
          }
          else{
            this.setState({
              text: 'Good '
            });
          } 
        }
    }
   
  render() {
    return ( 
      <div>
      <h1>{this.state.text}</h1>
      
      <button onClick={()=>this.resolve()} className="BtnResolve">Resolve</button>
      </div>
    )
  }
}
export default BtnResolve;