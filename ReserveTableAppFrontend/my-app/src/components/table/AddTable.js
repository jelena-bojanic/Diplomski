import React from 'react';
import { Form, Button, Modal, Col } from "react-bootstrap";
import axios from 'axios'
import Select from 'react-select';
import swal from '@sweetalert/with-react';
import { addTableToFacility } from '../../rest/restCallsFacility';
import PostAddIcon from '@material-ui/icons/PostAdd';

const optionsZones = [
    { value: 'SMOKING', label: 'SMOKING' },
    { value: 'NONSMOKING', label: 'NONSMOKING' },
];

const optionsPlacement = [
    { value: 'GARDEN', label: 'GARDEN' },
    { value: 'INSIDE', label: 'INSIDE' },
    { value: 'BALCONY', label: 'BALCONY' },
];

class AddTable extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.Add = this.Add.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onZoneChange = this.onZoneChange.bind(this);
        this.onPlacementChange = this.onPlacementChange.bind(this);

        this.state = {         
            facilityName: this.props.facility.name,
            facilityId : this.props.facility.id,
            zone:'',
            placement:'',
            numberOfSeats:'',          
        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onZoneChange(e) {
        this.setState({ zone: e.value});
    }

    onPlacementChange(e) {
        this.setState({ placement: e.value});
    }

    Add(e) {
        e.preventDefault();
        var table = {zone:'',placement:'',numberOfSeats:this.state.numberOfSeats,facilityName: this.props.facility.name,facilityId : this.props.facility.id};
        if(this.state.zone === "") {
            table.zone=optionsZones[0].value;
        }else{
            table.zone = this.state.zone;
        }
        if(this.state.placement === "") {
            table.placement=optionsPlacement[0].value;
        }else{
            table.placement = this.state.placement;
        }
        addTableToFacility(this.props.facility,table,table.placement);
        this.handleClose();        
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render(){
        return(
            <div>
                <Button variant="outline-dark" onClick={this.handleShow}>
                    <PostAddIcon fontSize="small"/> Table
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                <Modal.Header>
                    <h2 className="regAtitle">Add table</h2>
                </Modal.Header>

                <Modal.Body>

                <Form className="formRLogin" onSubmit={this.Add}>

                    <Form.Group as={Col}>
                        <Form.Label>Table placement</Form.Label>
                        <Select
                            onChange={this.onPlacementChange}
                            options={optionsPlacement}
                            name="type"
                            className="inputFiled"
                            defaultValue={optionsPlacement[0]}
                            required
                        />
                    </Form.Group>
                    <hr/>

                    <Form.Group as={Col}>
                        <Form.Label>Table zone</Form.Label>
                        <Select
                            onChange={this.onZoneChange}
                            options={optionsZones}
                            name="type"
                            className="inputFiled"
                            defaultValue={optionsZones[0]}
                            required
                        />
                    </Form.Group>
                    <hr/>

                    <Form.Group as={Col}>
                        <Form.Label>Number of seats</Form.Label>
                        <br/>
                        <input type="number" pattern="/d+" min="1" style={{width:'70px'}} required name="numberOfSeats" onChange={this.handleChange} />
                    </Form.Group>
                    <hr/>

                <div style={{float:'right'}}>
                    <Button style={{margin:'10px'}} variant="outline-secondary" onClick={this.handleClose}>
                        Close
                    </Button>

                    <Button style={{margin:'10px'}} variant="outline-primary" type="submit">
                        Add
                    </Button> 
                </div>
                </Form>
                </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default AddTable;