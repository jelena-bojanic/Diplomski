import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './Registration.css';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.Reg = this.Reg.bind(this);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            repeatedPass: '',

        }
    }
    
    Reg(e) {
        e.preventDefault();
        if (this.state.password !== this.state.repeatedPass) {
           alert('pass dont match');
            return;
        }
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="background">
                <Card className="regCard">
                    <Form onSubmit={this.Reg}>
                        <Form.Group >
                            <Form.Label>First name</Form.Label>
                            <Form.Control required name="name" type="text" placeholder="Enter first name" className="input" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required name="lastname" type="text" placeholder="Enter last name" className="input" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control required name="username" type="text" placeholder="Enter username" className="input" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required name="email" type="email" placeholder="Enter email" className="input" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="password" type="password" placeholder="Password" className="input" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control required name="repeatedPass" type="password" placeholder="Repeat password" className="input" onChange={this.handleChange} />
                        </Form.Group>

                        <div className="submitButton">
                            <Button variant="outline-primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default (Registration);