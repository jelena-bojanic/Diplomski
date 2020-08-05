import React from 'react'
import { Route, withRouter, Switch } from "react-router-dom";
import {home,registration,login,facilityid, facilites} from './RoutesConstants';
import Homepage from  './components/homepage/Homepage';
import Appbar from './components/appbar/Appbar';
import Login from './components/login-reg/Login';
import Registration from './components/login-reg/Registration';
import OneFacility from './components/facility/OneFacility.js';

class Routes extends React.Component {

    render() {
        return (
                <Switch>

                    <Route exact path={home} render={(props) =><div><Homepage AllF={true} user={this.props.user} clearState={this.props.clearState}/></div>}/>

                    <Route exact path={facilites} render={(props) =><div><Homepage AllF={true} user={this.props.user} clearState={this.props.clearState}/></div>}/>

                    <Route exact path={login} render={(props) =><div><Appbar/><Login updateUser={this.props.updateUser}/></div>}/>

                    <Route exact path={registration} render={(props) =><div><Appbar/><Registration/></div>}/>

                    <Route exact path={facilityid} render={(props) =><div><Homepage  OneF={true} user={this.props.user} clearState={this.props.clearState}/></div>}/>
                    
                </Switch>
        );
    }
}

export default withRouter(Routes);