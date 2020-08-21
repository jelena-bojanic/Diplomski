import React from 'react';
import './App.css';
import Routes from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataFromServer:'',
    }
  }

    render(){
      console.log(this.state)
      return (
        <div>
          <Router>
          <ReactNotification />
            <Routes/>
          </Router>
        </div>
      );
    }
  }

