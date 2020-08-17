import React from 'react';
import { withRouter} from "react-router-dom";
import LoggedOutHomepage from './LoggedOutHomepage';
import LoggedInHomepage from './LoggedInHomepage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as facilityActions from '../facility/facilityActions';
import { getOneFacility } from '../../rest/restCallsFacility';
import { getUser } from '../../rest/restCallsUser';
const user = {
    role: 'NONE',
  }
class Homepage extends React.Component {

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