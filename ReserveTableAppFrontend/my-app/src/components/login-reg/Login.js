import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './Login.css';
import {withRouter} from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';
import {home} from '../../RoutesConstants';
import { loginUser } from '../../rest/restCallsUser';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.Login = this.Login.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    async Login(e) {
        e.preventDefault(); 

        loginUser(this.state);
        this.props.history.push(`${home}`);      
      
    }

    render() {
        return (
            <Card className="loginCard">
                <div style={{textAlign:'center'}}>
                <VpnKeyIcon fontSize="large" className="keyIcon"/>
                </div>
                <Form onSubmit={this.Login} className="loginForm">
                    <Form.Group className="emailGroup">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required name="email" type="email" placeholder="Enter email" className="input" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="passwordGroup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="Password" className="input" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="forgotPasswordGroup" >
                        <a className="forgotPasswordLink">Forgot password?</a>
                    </Form.Group>

                    <Form.Group >
                        <Button variant="outline-primary" type="submit" className="submitButtonLogin">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
        );
    }
}
export default withRouter(Login);