import React from 'react';
import './App.css';
import Routes from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <Routes/>
          </Router>
        </div>
      );
    }
  }

