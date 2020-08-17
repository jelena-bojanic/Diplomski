import React from "react";
import { withRouter } from 'react-router-dom';
import './LoggedOutHomepage.css';
import Appbar from "../appbar/Appbar";
import AllFacilites from "../facility/render/AllFacilites";
import OneFacility from "../facility/render/OneFacility";

const LoggedOutHomepage = ({OneF,AllF,facilites,current_is_avaliable,getCurrent,facility,user,removeCurentFac}) => {
    return (
        <div>
           <Appbar/>
            <div className="mainContent" style={{marginTop:'2%',height:'500px'}}>
                { OneF === true &&
                    <OneFacility current_is_avaliable={current_is_avaliable} facility={facility} user={user} removeCurentFac={() => removeCurentFac()} /> 
                }{
                    AllF === true &&
                    <AllFacilites facilites={facilites.facilites}/>
                }                  
            </div>
        </div>
    );

}
export default withRouter(LoggedOutHomepage);
