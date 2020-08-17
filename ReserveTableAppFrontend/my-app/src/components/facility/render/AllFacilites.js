import React from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import location from '../../../icons/location.svg';
import paw from '../../../icons/paw.svg';
import phone from '../../../icons/phone.svg';
import r from '../../../icons/restuarant.jpg';
import { withRouter } from 'react-router-dom';
import {facility} from '../../../RoutesConstants';
import './AllFacilites.css';
import { getOneFacility } from '../../../rest/restCallsFacility';
import moment from 'moment';


class AllFacilites extends React.Component {

   render(){
       return(
        <div>
            <div><Form.Control placeholder="Enter restaurant/cafe name" style={{width:'70%',marginLeft:'2%'}}></Form.Control></div>
            
            <div style={{marginLeft:'2%',marginTop:'2%',display:'flex',flexDirection:'row'}}>
                <InputGroup.Prepend>
                   <Form.Label>Open now</Form.Label>
                    <InputGroup.Checkbox aria-label="Pet friendly" />
                </InputGroup.Prepend>

                <InputGroup.Prepend>
                   <Form.Label>Pet friendly</Form.Label>
                    <InputGroup.Checkbox aria-label="Pet friendly" />
                </InputGroup.Prepend>
            </div>

            <div style={{display:'flex',flexWrap:'wrap'}} className="backgroundDiv">
                {this.renderFacilites()}
            </div>
       </div>
       );
    }
   

 renderFacilites(){
    
    if(this.props.facilites !== undefined){
            
        return this.props.facilites.map(f =>
            <Card className="singleCard" key={f.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',cursor:'pointer',marginTop:'1.5%'}} onClick={() => { this.props.history.push(`${facility}/${f.id}`); getOneFacility(f.id); }}>
                <Card.Title>{f.name}</Card.Title>
                <Card.Img alt="icon" src={r}></Card.Img>
                <Card.Body>
                    <img alt="icon" src={location} style={{height:'20px',width:'20px',marginLeft:'0.5%'}}/> {f.city} , {f.street}
                    <hr/>
                    {f.petFriendly === true &&
                    <p><img alt="icon" src={paw} style={{height:'20px',width:'20px',marginRight:'2%'}}/>Pet friendly</p>
                    }{ f.petFriendly === false &&
                        <p style={{textDecoration: 'line-through'}}><img alt="icon" src={paw} style={{height:'20px',width:'20px',marginRight:'2%'}}/>Pet friendly</p>
                    }
                    <hr/>
                        <p>Open from {moment().hours(f.startWorkingHours[0]).minutes(f.startWorkingHours[1]).format('HH:mm')}</p>
                        <p>Open till {moment().hours(f.endWorkingHours[0]).minutes(f.endWorkingHours[1]).format('HH:mm')}</p>   
                    <hr/>
                    <img alt="icon" src={phone} style={{height:'20px',width:'20px',marginLeft:'0.5%'}}/> Contact : {f.contactNumber}          
                </Card.Body>
            </Card>
        );
    }
    }

}
export default withRouter(AllFacilites);

