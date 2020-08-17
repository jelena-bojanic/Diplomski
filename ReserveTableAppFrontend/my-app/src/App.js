import React from 'react';
import './App.css';
import Routes from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
    render(){
      return (
        <div>
          <Router>
            <Routes/>
          </Router>
        </div>
      );
    }
  }

