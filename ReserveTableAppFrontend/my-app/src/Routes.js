import React from 'react'
import { Route, withRouter, Switch } from "react-router-dom";
import {home,registration,login,facilityid, facilites, newfacility, editInfo, reservations, reservationsid} from './RoutesConstants';
import Homepage from  './components/homepage/Homepage';
import Appbar from './components/appbar/Appbar';
import Login from './components/login-reg/Login';
import Registration from './components/login-reg/Registration';
import OneFacility from './components/facility/render/OneFacility.js';

class Routes extends React.Component {

    render() {
        return (
                <Switch>

                    <Route exact path={home} render={(props) =><div><Homepage AllF={true} /></div>}/>

                    <Route exact path={facilites} render={(props) =><div><Homepage AllF={true} /></div>}/>

                    <Route exact path={login} render={(props) =><div><Appbar/><Login/></div>}/>

                    <Route exact path={registration} render={(props) =><div><Appbar/><Registration/></div>}/>

                    <Route exact path={facilityid}  render={(props) =><div><Homepage  OneF={true} /></div>}/>
                    
                    <Route exact path={newfacility} render={(props) =><div><Homepage  NewF={true} /></div>}/>

                    <Route exact path={editInfo} render={(props) =><div><Homepage  editUser={true} /></div>}/>

                    <Route exact path={reservations} render={(props) =><div><Homepage  viewMyReservations={true} /></div>}/>

                </Switch>
        );
    }
}

export default withRouter(Routes);