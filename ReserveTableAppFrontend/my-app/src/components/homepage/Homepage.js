import React from 'react';
import { withRouter} from "react-router-dom";
import LoggedOutHomepage from './LoggedOutHomepage';
import LoggedInHomepage from './LoggedInHomepage';

class Homepage extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
              {this.props.user === undefined &&
              <LoggedOutHomepage OneF={this.props.OneF} AllF={this.props.AllF}/>
              }{this.props.user !== undefined &&
              <LoggedInHomepage OneF={this.props.OneF} AllF={this.props.AllF} user={this.props.user} clearState={this.props.clearState}/>
              }
            </div>
        );
    }
}
export default withRouter(Homepage);