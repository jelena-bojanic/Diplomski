import React from "react";
import { Card, Spinner } from "react-bootstrap";
import axios from 'axios';
import location from '../../icons/location.svg';
import paw from '../../icons/paw.svg';
import phone from '../../icons/phone.svg';
import r from '../../icons/restuarant.jpg';
import { withRouter } from "react-router-dom";
import RenderTables from "../table/RenderTables";

class OneFacility extends React.Component {  
  constructor(props) {
    super(props);
   
    this.state = {
      facility: undefined,
    }
    
  }

  componentDidMount(){
      this.getFacility();
  }

  getFacility(){
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
        };
    console.log(this.props.match.params.id);
    axios.get(`http://localhost:8081/facility/one/${this.props.match.params.id}`, options).then(
                    (response) => { this.setState({facility: response.data});console.log(response.data)},
                    (response) => {alert('error facility'); }
            );
  }

    render() {
        if(this.state.facility !== undefined){
        return (
        <div style={{display:'flex'}}>
            <Card style={{ marginLeft: '2%', padding: '15px', height: 'auto', width: '300px', cursor: 'pointer' }}>
                <Card.Title>{this.state.facility.name}</Card.Title>
                <Card.Img src={r}></Card.Img>
                <Card.Body>
                    <img alt="icon" src={location} style={{ height: '20px', width: '20px', marginLeft: '0.5%' }} /> {this.state.facility.city} , {this.state.facility.street}
                    <hr />
                    {this.state.facility.petFriendly === true &&
                        <p><img alt="icon" src={paw} style={{ height: '20px', width: '20px', marginRight: '2%' }} />Pet friendly</p>
                    }{this.state.facility.petFriendly === false &&
                        <p style={{ textDecoration: 'line-through' }}><img alt="icon" src={paw} style={{ height: '20px', width: '20px', marginRight: '2%' }} />Pet friendly</p>
                    }
                    <hr />
                Open from  {this.state.facility.startWorkingHours[0]} : {this.state.facility.startWorkingHours[1]}0
                <hr />
                Open till  {this.state.facility.endWorkingHours[0]} : {this.state.facility.endWorkingHours[1]}0
                <hr />
                    <img alt="icon" src={phone} style={{ height: '20px', width: '20px', marginLeft: '0.5%' }} /> Contact : {this.state.facility.contactNumber}
                </Card.Body>
            </Card>
            <RenderTables facilityid={this.state.facility.id}/>
        </div>
        );
                }else{
                    return(   <Spinner animation="border" role="status" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>);
                }
                
    }

}
export default withRouter(OneFacility);