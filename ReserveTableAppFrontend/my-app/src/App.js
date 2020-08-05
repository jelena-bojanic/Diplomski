import React from 'react';
import './App.css';
import Routes from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      user: {},
    }
  }

  componentDidMount(){
  this.updateUser(localStorage.getItem('token'));
  }

  async updateUser(token){
    if (token === null || token === undefined) {
      this.setState({user:undefined});
    }else{

    const options = {
      headers: { 'Authorization': 'Bearer ' + token}
    };
    const [firstResponse] = await Promise.all([
      axios.get('http://localhost:8081/auth/user', options),
    ]);

      if(firstResponse.data !== null) {this.changeState(firstResponse); }
      else{
            if(window.location.href !== 'http://localhost:3000/login' &&
             window.location.href !== 'http://localhost:3000/')
             alert('logged out');
      }     
          
    }
  }

  changeState = (resp) => {

      this.setState({user: resp.data});
  }

  clearState = () => {
    this.setState({user: undefined});
  }

    render(){

      return (
        <div>
          <Router>
            <Routes user={this.state.user} clearState={this.clearState} updateUser={this.updateUser}/>
          </Router>
        </div>
      );
    }
  }

