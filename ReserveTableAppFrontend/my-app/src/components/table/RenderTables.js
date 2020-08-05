import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {facility} from '../../RoutesConstants';
import plant from '../../icons/plant.svg';
import balcony from '../../icons/balcony.svg';
import r from '../../icons/dinner.svg';


class RenderTables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tables : undefined,
        }
      }

   render(){
       if(this.state.tables !== undefined){
       return(
       <div style={{display:'flex',marginLeft:'3%'}}>
          { this.state.tables.inGarden.reduce((acc, o) => acc + Object, 0) !== 0 &&
              <div style={{marginLeft:'3%'}}>
                <img src={plant} alt="garden" style={{height:'30px',width:'30px'}}></img>  <label style={{fontSize:'20px'}}>Garden</label>
                {this.renedrTGarden()}
            </div>
          }
          { this.state.tables.inside.reduce((acc, o) => acc + Object, 0) !== 0 &&
            <div style={{marginLeft:'3%'}}>
                 <img src={r} alt="garden" style={{height:'30px',width:'30px'}}></img>  <label style={{fontSize:'20px'}}>Inside</label>
              {this.renedrTInside()}
          </div>
          }
          { this.state.tables.onBalcony.reduce((acc, o) => acc + Object, 0) !== 0 &&
            <div style={{marginLeft:'3%'}}>
                <img src={balcony} alt="garden" style={{height:'30px',width:'30px'}}></img>  <label style={{fontSize:'20px'}}>Balcony</label>
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

    getAllT(){
        const options = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
          };
          axios.get(`http://localhost:8081/table/all-from-facility/${this.props.facilityid}`, options).then(
                    (response) => { this.setState({tables: response.data}); console.log(response.data) },
                    (response) => {alert('error tables'); }
                );
    }

    componentDidMount(){
        this.getAllT();
    }
    

 renedrTInside(){
    if(this.state.tables !== undefined){
    return this.state.tables.inside.map(t =>
        <Card key={t.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',marginTop:'3%'}}>
            <Card.Title>{t.tableNum}</Card.Title>
            <Card.Body>
                <p>Zone: {t.zone}</p>

            </Card.Body>
        </Card>
        
    );
}
}

renedrTGarden(){
    
    if(this.state.tables !== undefined){
    return this.state.tables.inGarden.map(t =>
        <Card key={t.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',marginTop:'3%'}}>
            <Card.Title>{t.tableNum}</Card.Title>
            <Card.Body>
                <p>Zone: {t.zone}</p>

            </Card.Body>
        </Card>
        
    );
}
}

renedrTBalcony(){
    
    if(this.state.tables !== undefined){
    return this.state.tables.onBalcony.map(t =>
        <Card key={t.id} style={{marginLeft:'2%',padding:'15px',height:'auto',width:'300px',marginTop:'3%'}}>
            <Card.Title>{t.tableNum}</Card.Title>
            <Card.Body>
                <p>Zone: {t.zone}</p>

            </Card.Body>
        </Card>
        
    );
}
}

}
export default withRouter(RenderTables);

