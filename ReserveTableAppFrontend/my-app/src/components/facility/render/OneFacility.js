import React from "react";
import { Card, Spinner } from "react-bootstrap";
import location from '../../../icons/location.svg';
import paw from '../../../icons/paw.svg';
import phone from '../../../icons/phone.svg';
import r from '../../../icons/restuarant.jpg';
import { withRouter } from "react-router-dom";
import RenderTables from "../../table/RenderTables";
import DeleteIcon from '@material-ui/icons/Delete';
import AddTable from "../../table/AddTable";
import { Prompt } from 'react-router'
import { deleteFacility, getOneFacility } from "../../../rest/restCallsFacility";
import './OneFacility.css';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import EditFacility from "../edit/EditFacility";

class OneFacility extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           endOfShift:false,
           start:'',
           end:'',
        }
    }

    deleteF = () => {
        deleteFacility(this.props.facility);
    }

    componentDidMount(){
        getOneFacility(this.props.match.params.id);      
    }


    render() {
        if (this.props.current_is_avaliable === true) {  
            return (
                <div className="renderOneFacilityDiv">
                    <Prompt
                        message={(location, action) => { this.props.removeCurentFac(); }}
                    />
                    <Card style={{ marginLeft: '2%', padding: '15px', height: '20%', width: '300px', borderRadius: '7px' }}>
                        <Card.Title>{this.props.facility.name}
                        { this.props.user.role === 'ADMIN' &&
                        <DeleteIcon fontSize="small" onClick={() => { this.deleteF() }} style={{ float: 'right', color: 'gray' }} />
                        }{ this.props.user.role === 'ADMIN' &&
                            <EditFacility facility={this.props.facility}/>
                        }
                        </Card.Title>
                        <Card.Img src={r}></Card.Img>
                        <hr/>
                            <div style={{textAlign:'center'}}>
                                <p>{this.props.facility.type}</p>
                            </div>
                        <hr/>
                        <Card.Body>
                            <img alt="icon" src={location} style={{ height: '20px', width: '20px', marginLeft: '0.5%' }} /> {this.props.facility.city} , {this.props.facility.street}
                            <hr />
                            {this.props.facility.petFriendly === true &&
                                <p><img alt="icon" src={paw} style={{ height: '20px', width: '20px', marginRight: '2%' }} />Pet friendly</p>
                            }{this.props.facility.petFriendly === false &&
                                <p style={{ textDecoration: 'line-through' }}><img alt="icon" src={paw} style={{ height: '20px', width: '20px', marginRight: '2%' }} />Pet friendly</p>
                            }
                            <hr />
                        <p>Open from {moment().hours(this.props.facility.startWorkingHours[0]).minutes(this.props.facility.startWorkingHours[1]).format('HH:mm')}</p>
                        <p>Open till {moment().hours(this.props.facility.endWorkingHours[0]).minutes(this.props.facility.endWorkingHours[1]).format('HH:mm')}</p>   
                            <img alt="icon" src={phone} style={{ height: '20px', width: '20px', marginLeft: '0.5%' }} /> Contact : {this.props.facility.contactNumber}
                            <hr />
                            {this.props.user.role === 'ADMIN' &&
                                <AddTable facility={this.props.facility} variant="outline-primary" getAllT={this.getAllT} />
                            }
                        </Card.Body>
                    </Card>
   
                    <RenderTables current_table={this.props.current_table} user={this.props.user} tables={this.props.facility.facilitesTablesByPlacemntDTO} facility={this.props.facility} />
                    
                    </div>
            );
        } else {
            return (
                <Spinner animation="border" role="status" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>);
        }

    }

}
export default withRouter(OneFacility);