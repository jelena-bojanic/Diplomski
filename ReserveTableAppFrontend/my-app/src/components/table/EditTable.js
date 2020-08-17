import React from 'react';
import { Form, Button, Modal, Col } from "react-bootstrap";
import Select from 'react-select';
import { addTableToFacility, editT } from '../../rest/restCallsFacility';
import EditIcon from '@material-ui/icons/Edit';

const optionsZones = [
    { value: 'SMOKING', label: 'SMOKING' },
    { value: 'NONSMOKING', label: 'NONSMOKING' },
];

const optionsPlacement = [
    { value: 'GARDEN', label: 'GARDEN' },
    { value: 'INSIDE', label: 'INSIDE' },
    { value: 'BALCONY', label: 'BALCONY' },
];

class EditTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.Edit = this.Edit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onZoneChange = this.onZoneChange.bind(this);
        this.onPlacementChange = this.onPlacementChange.bind(this);

        this.state = {
            facilityName: this.props.facility.name,
            facilityId: this.props.facility.id,
            zone: this.props.table.zone,
            placement: this.props.table.placement,
            numberOfSeats: this.props.table.numberOfSeats,
        }
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    onZoneChange(e) {
        this.setState({ zone: e.value });
    }

    onPlacementChange(e) {
        this.setState({ placement: e.value });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    Edit(e) {
        e.preventDefault();
        var table = {
            zone:'',
            placement:'',
            numberOfSeats:this.state.numberOfSeats,
            facilityName: this.props.facility.name,
            facilityId : this.props.facility.id,
            id: this.props.table.id};

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
        editT(table);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <EditIcon onClick={this.handleShow} fontSize="small" style={{ cursor: 'pointer', float: 'right', marginRight: '4%' }} />
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"
                >
                    <Modal.Header>
                        <h2 className="regAtitle">Edit table</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="formRLogin" onSubmit={this.Edit}>
                            <Form.Group as={Col}>
                                <Form.Label>Table placement</Form.Label>
                                <Select
                                    onChange={this.onPlacementChange}
                                    options={optionsPlacement}
                                    name="type"
                                    className="inputFiled"
                                    value={{label:this.state.placement,value:this.state.placement}}
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
                                    value={{label:this.state.zone,value:this.state.zone}}
                                    required
                                />
                            </Form.Group>
                            <hr/>
                            <Form.Group as={Col}>
                                <Form.Label>Number of seats</Form.Label>
                                <br/>
                                <input defaultValue={this.state.numberOfSeats} type="number" pattern="\d+" style={{ width: '70px' }} required name="numberOfSeats" placeholder="Enter number of seats" onChange={this.handleChange} />
                            </Form.Group>
                            <hr/>
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

export default EditTable;