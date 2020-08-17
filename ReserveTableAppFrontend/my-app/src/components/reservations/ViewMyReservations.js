import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { facility } from '../../RoutesConstants';
import { getOneFacility } from '../../rest/restCallsFacility';
import bell from '../../icons/reserved.svg'



class ViewMyReservations extends React.Component {

   render(){
       return(
        <div>
            <div style={{display:'flex',flexDirection:'row'}} className="backgroundDiv">
                {this.renderReservations()}
            </div>
       </div>
       );
    }
   

 renderReservations(){
    
    if(this.props.isLoggedIn === true){
            
        return this.props.user.reservations.map(r =>
            <Card className="singleCard"  style={{marginLeft:'2%',padding:'15px',height:'auto',width:'auto',cursor:'pointer',marginTop:'1.5%'}}>
                <Card.Img src={bell}style={{height:'55px',width:'55px',width:'100%'}}></Card.Img>
                <Card.Body>
                    <p>Reservation date: {r.reservationDate[0]}.{r.reservationDate[1]}.{r.reservationDate[2]}</p> 
                    <p>From: {moment().hours(r.startReservation[0]).minutes(r.startReservation[1]).format("HH:mm")}</p>
                    <p>Till: {moment().hours(r.startReservation[0]).minutes(r.startReservation[1]).add(r.duration,"minutes").format("HH:mm")}</p>      
                    <u><p style={{cursor:'pointer'}} onClick={() => { this.props.history.push(`${facility}/${r.facilityId}`); getOneFacility(r.facilityId); }}>At {r.facilityName}</p></u>
                </Card.Body>
            </Card>
        );
    }
 }

}
export default withRouter(ViewMyReservations);

