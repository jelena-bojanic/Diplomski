import React from 'react';
import { withRouter} from "react-router-dom";
import LoggedOutHomepage from './LoggedOutHomepage';
import LoggedInHomepage from './LoggedInHomepage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as facilityActions from '../facility/facilityActions';
import { getOneFacility } from '../../rest/restCallsFacility';
import { getUser } from '../../rest/restCallsUser';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import SockJsClient from 'react-stomp';
import axios from 'axios';
import { Button } from '@material-ui/core';

const user = {
    role: 'NONE',
  }
class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           loaded: false,
        }

    }

    removeCurentFac(){
        this.props.actionsFacility.removeCurrentFacility();
    }

    getCurrent(id){
        getOneFacility(id);
    }

    getLoggedInUser(){
        getUser();
    }

    setCurrentTable(table){
        this.props.actionsFacility.currentTable(table);
    }

    filterF(facilites){
        this.props.actionsFacility.filter(facilites);
    }


        sendMessageUsingSocket() {
              let message = {
                message: 'hello',

            };
        
        this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
              
          }

          handleResult(m) {
            alert(m);
          }

     onConnected() {

        console.log("its working");
    
    }
    
    
     onError(error) {
    
        console.log(error);
    }



    render() {
        return (
            <div>
              { this.props.user.isLoggedIn === false &&
              <LoggedOutHomepage
               current_is_avaliable={this.props.facilites.current_is_avaliable} 
               removeCurentFac={() => this.removeCurentFac()}
               getCurrent={(id) => this.getCurrent(id)}   
               OneF={this.props.OneF} AllF={this.props.AllF} 
               facilites={this.props.facilites} 
               facility={this.props.facilites.current_facility}
               user={user}
               filterF={(facilites) => this.filterF(facilites)}
               filtered={this.props.facilites.filtered} 
               />
              }
              { (this.props.user.isLoggedIn === true && this.props.user.user.role !== 'NONE') &&
              <LoggedInHomepage 
              current_is_avaliable={this.props.facilites.current_is_avaliable} 
              removeCurentFac={() => this.removeCurentFac()} 
              getCurrent={(id) => this.getCurrent(id)}
              getLoggedInUser={() => this.getLoggedInUser()}   
              facility={this.props.facilites.current_facility} 
              facilites={this.props.facilites} 
              NewF={this.props.NewF} 
              OneF={this.props.OneF} 
              AllF={this.props.AllF} 
              user={this.props.user.user}
              editUser={this.props.editUser}
              isLoggedIn= {this.props.user.isLoggedIn} 
              clearState={this.props.clearState}
              setCurrentTable={(table) => this.setCurrentTable(table)}
              current_table = {this.props.facilites.current_table} 
              viewMyReservations={this.props.viewMyReservations}
              filterF={(facilites) => this.filterF(facilites)}
              filtered={this.props.facilites.filtered}  
              />
              }
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        facilites: state.facilites,
        user : state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsFacility: bindActionCreators(facilityActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage));


function onMessage(event) {
    console.debug("WebSocket message received:", event);
  };