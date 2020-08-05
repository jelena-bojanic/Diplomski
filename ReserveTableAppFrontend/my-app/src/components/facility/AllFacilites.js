import React,{useState} from 'react';
import { Card, Spinner } from 'react-bootstrap';
import location from '../../icons/location.svg';
import paw from '../../icons/paw.svg';
import phone from '../../icons/phone.svg';
import r from '../../icons/restuarant.jpg';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {facility} from '../../RoutesConstants';

class AllFacilites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          facilites : [],
        }
      }

   render(){
       return(
       <div style={{display:'flex'}}>
           {this.renderFacilites()}
       </div>
       );
    }

    getAllFacilites(){
        var returnFac = [];
        const options = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
          };
          axios.get('http://localhost:8081/facility/all', options).then(
                    (response) => { this.setState({facilites: response.data}); console.log(response.data) },
                    (response) => {alert('error facilites'); }
                );
    }

    componentDidMount(){
        this.getAllFacilites();
    }
    

 renderFacilites(){
    
    if(this.state.facilites !== undefined){
    return this.state.facilites.map(f =>
        <Card key={f.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',cursor:'pointer'}} onClick={() => { this.props.history.push(`${facility}/${f.id}`); }}>
            <Card.Title>{f.name}</Card.Title>
            <Card.Img src={r}></Card.Img>
            <Card.Body>
                <img alt="icon" src={location} style={{height:'20px',width:'20px',marginLeft:'0.5%'}}/> {f.city} , {f.street}
                <hr/>
                {f.petFriendly === true &&
                <p><img alt="icon" src={paw} style={{height:'20px',width:'20px',marginRight:'2%'}}/>Pet friendly</p>
                }{ f.petFriendly === false &&
                    <p style={{textDecoration: 'line-through'}}><img alt="icon" src={paw} style={{height:'20px',width:'20px',marginRight:'2%'}}/>Pet friendly</p>
                }
                <hr/>
                Open from : {f.startWorkingHours[0]} : {f.startWorkingHours[1]}0
                <hr/>
                Open till : {f.endWorkingHours[0]} : {f.endWorkingHours[1]}0
                <hr/>
                <img alt="icon" src={phone} style={{height:'20px',width:'20px',marginLeft:'0.5%'}}/> Contact : {f.contactNumber}          
            </Card.Body>
        </Card>
    );
}
}

}
export default withRouter(AllFacilites);

