import React from "react";
import { Card, Spinner, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './EditUserInfo.css';
import EditIcon from '@material-ui/icons/Edit';
import user from '../../icons/Account-pana.svg';
import { editInfo, getUser } from "../../rest/restCallsUser";
import UpdatePassword from "./UpdatePassword";

class EditUserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.Update = this.Update.bind(this);
        this.state = {
            name: this.props.user.name,
            lastname: this.props.user.lastname,
            id: this.props.user.id,
            email : this.props.user.email,
        }
    }


    Update(e) {
        e.preventDefault();
        editInfo(this.state);
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    render() {
        if (this.props.isLoggedIn === true) {
            return (
                    <Card className="editInfoCard">
                        <Card.Title><EditIcon/> My info</Card.Title>
                        <div style={{textAlign:'center'}}><Card.Img src={user} style={{height:'250px',width:'250px'}}></Card.Img></div>
                        <Card.Body>
                            <Form onSubmit={this.Update}>
                                <Form.Group >
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control defaultValue={this.props.user.name} required name="name" type="text" placeholder="Enter first name" className="inputFiled" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control defaultValue={this.props.user.lastname} required name="lastname" type="text" placeholder="Enter last name" className="inputFiled" onChange={this.handleChange} />
                                </Form.Group>

                                <UpdatePassword user={this.props.user}/>

                                <div className="submitButton">
                                    <Button variant="outline-dark" type="submit">
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
            );
        } else {
            return (
                <Spinner animation="border" role="status" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>);
        }

    }

}
export default withRouter(EditUserInfo);