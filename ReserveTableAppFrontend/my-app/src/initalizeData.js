import { initalizeAllFacilites } from "./rest/restCallsFacility";
import { getUser } from "./rest/restCallsUser";


export function InitData(){
    initalizeAllFacilites(); 
    if(localStorage.getItem('token') !== null){
        getUser();
    };

}