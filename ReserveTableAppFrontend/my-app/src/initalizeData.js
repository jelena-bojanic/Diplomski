import { initalizeAllFacilites } from "./rest/restCallsFacility";
import { getUser } from "./rest/restCallsUser";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';


export function InitData(){
    initalizeAllFacilites(); 
    if(localStorage.getItem('token') !== null){
        getUser();
    };

}
