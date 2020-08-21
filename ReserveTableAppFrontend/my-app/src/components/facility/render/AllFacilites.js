import React from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import location from '../../../icons/location.svg';
import paw from '../../../icons/paw.svg';
import phone from '../../../icons/phone.svg';
import r from '../../../icons/restuarant.jpg';
import time from '../../../icons/time.svg';
import { withRouter } from 'react-router-dom';
import {facility} from '../../../RoutesConstants';
import './AllFacilites.css';
import { getOneFacility, filterFacilites } from '../../../rest/restCallsFacility';
import moment from 'moment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class AllFacilites extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePetFriendly = this.handlePetFriendly.bind(this);
        this.handleOpenNow = this.handleOpenNow.bind(this);
        this.Filter = this.Filter.bind(this);
        this.state = {
            name:'',
            petFriendly:'',
            openNow:'',    
        }
      }

   render(){
       return(
        <div>

            <div style={{marginLeft:'2%'}}>
                <Form onSubmit={this.Filter}>
                    <Form.Control required name="name" placeholder="Enter restaurant/cafe name" style={{width:'70%'}} onChange={this.handleChange}></Form.Control>        
                    <div style={{marginTop:'2%'}}>
                        <input type="checkbox" id="petFriendly" name="petFriendly" value="petFriendly" onChange={this.handlePetFriendly}/>
                        <img alt="icon" src={paw} style={{height:'20px',width:'20px',marginLeft:'1%'}}></img>
                        <label htmlFor="petFriendly">Pet friendly</label><br/>

                    </div>

                    <div>
                        <input type="checkbox" id="openNow" name="openNow" value="openNow" onChange={this.handleOpenNow}/>
                        <img alt="icon" src={time} style={{height:'20px',width:'20px',marginLeft:'1%'}}></img>
                        <label htmlFor="openNow">Open now</label><br/>
                    </div>
                </Form>
             </div>

            <div style={{display:'flex',flexWrap:'wrap'}} className="backgroundDiv">
                {this.renderFacilites()}
            </div>

       </div>
       );
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
        var filter = {name:e.target.value,openNoW:this.state.openNow,petFriendly:this.state.petFriendly};
        this.Filter(filter);   
    }

    handlePetFriendly(e) {
        if(document.getElementById("petFriendly").checked === true ){
            this.setState({petFriendly:true});
            var filter = {name:this.state.name,openNoW:this.state.openNow,petFriendly:true}
        }else{
            this.setState({petFriendly:''});
            var filter = {name:this.state.name,openNoW:this.state.openNow,petFriendly:''}
        }
        this.Filter(filter);
    }

    handleOpenNow(e) {
        if(document.getElementById("openNow").checked === true){
            this.setState({openNow:true});
            var filter = {name:this.state.name,openNoW:true,petFriendly:this.state.petFriendly}
        }else{
            this.setState({openNow:''});
            var filter = {name:this.state.name,openNoW:'',petFriendly:this.state.petFriendly}
        }
        this.Filter(filter);
    }

    Filter(filter){
        var newf = [];
        console.log(filter);
        if(filter.openNoW !== '' && filter.petFriendly !== '' && filter.name !== ''){
             newf = this.props.facilites.filter(f => 
            (f.name.toUpperCase().indexOf(filter.name.toUpperCase())>=0)  && (f.petFriendly === filter.petFriendly) 
            && (moment().isAfter(moment().hours(f.startWorkingHours[0]).minutes(f.startWorkingHours[1]))) 
            &&(moment().isBefore(moment().hours(f.endWorkingHours[0]).minutes(f.endWorkingHours[1]))));
            console.log(newf);
            this.props.filterF(newf);
        }

        if(filter.openNoW !== '' && filter.petFriendly !== '' && filter.name === ''){
            newf = this.props.facilites.filter(f => 
           ((f.petFriendly === filter.petFriendly) && (moment().isAfter(moment().hours(f.startWorkingHours[0]).minutes(f.startWorkingHours[1]))) 
           &&(moment().isBefore(moment().hours(f.endWorkingHours[0]).minutes(f.endWorkingHours[1])))));
           console.log(newf);
           this.props.filterF(newf);
       }

       if(filter.openNoW === '' && filter.petFriendly === '' && filter.name !== ''){
        newf = this.props.facilites.filter(f => 
       (f.name.toUpperCase().indexOf(filter.name.toUpperCase())>=0));
       console.log(newf);
       this.props.filterF(newf);
   }

        if(filter.openNoW !==  ''  && filter.petFriendly === ''){
             newf = this.props.facilites.filter(f => 
                (f.name.toUpperCase().indexOf(filter.name.toUpperCase())>=0)  
                && (moment().isAfter(moment().hours(f.startWorkingHours[0]).minutes(f.startWorkingHours[1]))) 
                &&(moment().isBefore(moment().hours(f.endWorkingHours[0]).minutes(f.endWorkingHours[1]))));
                console.log(newf);
                this.props.filterF(newf);
        }
        if(filter.openNoW ===  ''  && filter.petFriendly !== ''){
             newf = this.props.facilites.filter(f => 
                (f.name.toUpperCase().indexOf(filter.name.toUpperCase())>=0)   && (f.petFriendly === filter.petFriendly));
                console.log(newf);
                this.props.filterF(newf);
        }
        if((filter.openNoW ===  ''  && filter.petFriendly === '' && filter.name === '') || (((filter.openNoW ===  false || filter.openNoW === '') && (filter.petFriendly === false || filter.petFriendly === '')) && filter.name === '')){
               this.props.filterF(this.props.facilites);
       }
    }

    clearFilters(){
        console.log(this.props.facilites);
    }
   

 renderFacilites(){
    
    if(this.props.filtered !== undefined){
            
        return this.props.filtered.map(f =>
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

