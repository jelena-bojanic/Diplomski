import React from "react";
import { withRouter } from 'react-router-dom';
import './LoggedOutHomepage.css';
import Appbar from "../appbar/Appbar";
import AllFacilites from "../facility/AllFacilites";
import OneFacility from "../facility/OneFacility";

const LoggedOutHomepage = ({OneF,AllF}) => {
    return (
        <div>
           <Appbar/>
            <div className="mainContent" style={{marginTop:'2%',height:'500px'}}>
                { OneF === true &&
                    <OneFacility/> 
                }{
                    AllF === true &&
                    <AllFacilites/>
                }                  
            </div>
        </div>
    );

}
export default withRouter(LoggedOutHomepage);

