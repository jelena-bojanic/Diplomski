import React from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {facility} from '../../RoutesConstants';
import plant from '../../icons/plant.svg';
import balcony from '../../icons/balcony.svg';
import r from '../../icons/dinner.svg';
import './RenderTables.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { removeTableFromFacility } from '../../rest/restCallsFacility';
import table from '../../icons/dinner.svg';
import EditTable from './EditTable';
import ReserveTableModal from './ReserveTableModal';

class RenderTables extends React.Component {

    deleteT = (t) => {
        console.log(t);
        console.log(this.props.facility);
        removeTableFromFacility(this.props.facility,t,t.placement)
    }

   render(){
       if(this.props.tables !== undefined){
       return(
       <div className="renderTablesDiv">
          { this.props.tables.inGarden.reduce((acc, o) => acc + Object, 0) !== 0 &&
              <div className="smallDiv">
                <p style={{fontSize:'20px'}}>Garden</p>
                {this.renedrTGarden()}
            </div>
          }
          { this.props.tables.inside.reduce((acc, o) => acc + Object, 0) !== 0 &&
            <div className="smallDiv">
                <p style={{fontSize:'20px'}}>Inside</p>
              {this.renedrTInside()}
          </div>
          }
          { this.props.tables.onBalcony.reduce((acc, o) => acc + Object, 0) !== 0 &&
            <div className="smallDiv">
                <p style={{fontSize:'20px'}}>Balcony</p>
              {this.renedrTBalcony()}
          </div>
          }
       </div>
       );
        }else{
            return(
                <Spinner animation="border" role="status" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }

    }

 renedrTInside(){
    if(this.props.tables !== undefined){
    return this.props.tables.inside.map(t =>
        <Card className="insideTable" key={t.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',marginTop:'3%',borderRadius:'7px'}}>
            {t.tableNum} 
            <Card.Body style={{textAlign:'center'}}>
            <Card.Img src={table} style={{height:'100px',width:'100px'}}></Card.Img>
            <p>Number of seats: {t.numberOfSeats}</p>
            <p>Zone: <b>{t.zone}</b></p>
                <hr/>
                { this.props.user.role === 'ADMIN' &&
                    <div>
                        <DeleteOutlineIcon fontSize="small" style={{cursor:'pointer',float:'right'}} onClick={() => { this.deleteT(t) }}/>
                        <EditTable table={t} facility={this.props.facility}/>
                    </div>
                    }
                    { this.props.user.role ===  'CUSTOMER' && 
                    <ReserveTableModal table={t}  user={this.props.user} facility={this.props.facility} reservations={t.reservationList}/>
                    }
                
            </Card.Body>
        </Card>
        
    );
}
}

renedrTGarden(){
    
    if(this.props.tables !== undefined){
    return this.props.tables.inGarden.map(t =>
        <Card className="gardenTable" key={t.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',marginTop:'3%',borderRadius:'7px'}}>
           {t.tableNum} 
            <Card.Body style={{textAlign:'center'}}>
            <Card.Img src={table} style={{height:'100px',width:'100px'}}></Card.Img>
            <p>Number of seats: {t.numberOfSeats}</p>
            <p>Zone: <b>{t.zone}</b></p>
                <hr/>
                { this.props.user.role === 'ADMIN' &&
                      <div>
                        <DeleteOutlineIcon fontSize="small" style={{cursor:'pointer',float:'right'}} onClick={() => { this.deleteT(t) }}/>
                        <EditTable table={t} facility={this.props.facility}/>
                      </div>
                }{ this.props.user.role ===  'CUSTOMER' && 
                <ReserveTableModal user={this.props.user} table={t} facility={this.props.facility} reservations={t.reservationList}/>
                }
                
            </Card.Body>
        </Card>
        
    );
}
}

renedrTBalcony(){
    
    if(this.props.tables !== undefined){
    return this.props.tables.onBalcony.map(t =>
        <Card className="balconyTable" key={t.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',marginTop:'3%',borderRadius:'7px'}}>
         {t.tableNum} 
            <Card.Body style={{textAlign:'center'}}>
            <Card.Img src={table} style={{height:'100px',width:'100px'}}></Card.Img>
            <p>Number of seats: {t.numberOfSeats}</p>
            <p>Zone: <b>{t.zone}</b></p>
                <hr/>
                { this.props.user.role === 'ADMIN' &&
                      <div>
                        <DeleteOutlineIcon fontSize="small" style={{cursor:'pointer',float:'right'}} onClick={() => { this.deleteT(t) }}/>
                        <EditTable table={t} facility={this.props.facility}/>
                      </div>
                }{ this.props.user.role ===  'CUSTOMER' && 
                <ReserveTableModal table={t} user={this.props.user} facility={this.props.facility} reservations={t.reservationList}/>
                }
            </Card.Body>
        </Card>
        
    );
}
}

}
export default withRouter(RenderTables);

