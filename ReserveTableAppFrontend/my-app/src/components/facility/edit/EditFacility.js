import React from 'react';
import { Form, Button, Modal, Col } from "react-bootstrap";
import Select from 'react-select';
import EditIcon from '@material-ui/icons/Edit';
import { Switch } from '@material-ui/core';
import { editT, editF } from '../../../rest/restCallsFacility';

const options = [
    { value: 'RESTAURANT', label: 'RESTAURANT' },
    { value: 'CAFE', label: 'CAFE' },
  ];

class EditFacility extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.Edit = this.Edit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);

        this.state = {
            name:this.props.facility.name,
            city:this.props.facility.city,
            street:this.props.facility.street,
            petFriendly:this.props.facility.petFriendly,
            startWorkingHours:this.props.facility.startWorkingHours,
            endWorkingHours:this.props.facility.endWorkingHours,
            contactNumber:this.props.facility.contactNumber,
            stringFiles:undefined,
            type:this.props.facility.type,     
        }
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    onTypeChange(e) {
        this.setState({ type: e.value });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onSwitchChange(e) {
        if(this.state.petFriendly === 'true'){
            this.setState({petFriendly:'false'});
        }else{
            this.setState({petFriendly:'true'});
        }
        }

    Edit(e) {
        e.preventDefault();
        var f = {
            name: this.state.name,
            city:this.state.city,
            street:this.state.street,
            petFriendly:this.state.petFriendly,
            startWorkingHours:this.state.startWorkingHours,
            endWorkingHours: this.state.endWorkingHours,
            contactNumber:this.state.contactNumber,
            type:this.state.type,
            files : this.state.stringFiles,
            id: this.props.facility.id,    
        }
        editF(f);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <EditIcon onClick={this.handleShow} fontSize="small" style={{ cursor: 'pointer', float: 'right', marginRight: '2%' }} />
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"
                    style={{marginTop:'2%'}}
                >
                    <Modal.Body>
                        <Form className="formRLogin" onSubmit={this.Edit}>
                           
                        <Form.Group className="inputGroup">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={this.state.name} className="inputFiled" required name="name" type="text" placeholder="Enter name" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>City</Form.Label>
                        <Form.Control defaultValue={this.state.city} className="inputFiled" required name="city" type="text" placeholder="Enter city" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Street (name and number)</Form.Label>
                        <Form.Control defaultValue={this.state.street} className="inputFiled" required name="street" type="text" placeholder="Enter street" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Contact number</Form.Label>
                        <Form.Control defaultValue={this.state.contactNumber} className="inputFiled" required name="contactNumber" type="number" placeholder="Enter contact number" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Pet friendly</Form.Label>
                        { this.state.petFriendly === true &&
                        <Switch
                        onChange={this.onSwitchChange}
                        name="petFriendly"
                        color="primary"
                        value = "true"
                        />
                        }
                        { this.state.petFriendly === false &&
                        <Switch
                        onChange={this.onSwitchChange}
                        name="petFriendly"
                        color="primary"
                        value = "false"
                        />
                        }
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Facility type</Form.Label>
                        <Select
                            onChange={this.onSelectChange}
                            options={options}
                            name="type"
                            className="inputFiled"
                            defaultValue={{label: this.state.type,value : this.state.type}}
                        />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Enter start and end working hours</Form.Label> <br/>
                        <input value={this.state.startWorkingHours} type="time" min="08:00" step="300" name="startWorkingHours" onChange={this.handleChange} ></input>
                        <input value={this.state.endWorkingHours} style={{marginLeft:'2%'}} step="300" type="time" label="End working hours" min="01:00" name="endWorkingHours" onChange={this.handleChange} ></input>
                    </Form.Group>

                            <div style={{ float: 'right' }}>
                                <Button style={{ margin: '10px' }} variant="outline-secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button style={{ margin: '10px' }} variant="outline-primary" type="submit">
                                    Update
                                 </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default EditFacility;