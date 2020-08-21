import React from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import {updatepassword} from '../../rest/restCallsUser';
import { withRouter } from 'react-router-dom';
import { home, login } from '../../RoutesConstants';

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.UpdatePass = this.UpdatePass.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
      
        this.state = {
            password: '',
            repeatedPass: '',
            id: this.props.user.id,
        }
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

   

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    UpdatePass(e) {
        e.preventDefault();
        if(this.state.password !== this.state.repeatedPass){
            alert('password dont match');
            return;
        }
        var user = {password:this.state.password,id:this.props.user.id}
        updatepassword(user);
        this.handleClose();
         this.props.history.push(`${login}`);
        
    }

    render() {
        return (
            <div>
               <Button variant="outline-dark" onClick={this.handleShow}>Change password</Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"
                >
                    <Modal.Header>
                        <h2 className="regAtitle">Change password</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="formRLogin" onSubmit={this.UpdatePass}>
                            
                            <Form.Group >
                                 <Form.Label>New password</Form.Label>
                                 <Form.Control  required name="password" type="password" placeholder="Password" className="inputFiled" onChange={this.handleChange} />
                             </Form.Group>

                             <Form.Group >
                                <Form.Label>Repeat new password</Form.Label>
                                <Form.Control  required name="repeatedPass" type="password" placeholder="Repeat password" className="inputFiled" onChange={this.handleChange} />
                            </Form.Group>
                            
                            <div style={{ float: 'right' }}>
                                <Button style={{ margin: '10px' }} variant="outline-secondary" onClick={this.handleClose}>
                                    Close
                    </Button>
                                <Button style={{ margin: '10px' }} variant="outline-primary" type="submit">
                                    Change
                    </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default withRouter(UpdatePassword);