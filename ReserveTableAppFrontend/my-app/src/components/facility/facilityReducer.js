import { initalizeAllFacilites } from "../../rest/restCallsFacility";
import moment from 'moment';

const emptyState= {
    facilites : [],
    current_facility:undefined,
    current_is_avaliable:false,
    current_table : undefined,
    is_current_table_avaliable: false,
    filtered: [],
}

const updateList = (facility,facilites) =>{
    var index = facilites.indexOf(facility);
    facilites.splice(index,1);
    return facilites;
}

const updateCurrent =  (facility,table,placement) => {
    if(placement === 'GARDEN'){facility.facilitesTablesByPlacemntDTO.inGarden.push(table)}
    else if(placement === 'INSIDE'){facility.facilitesTablesByPlacemntDTO.inside.push(table)}
    else if(placement === 'BALCONY'){facility.facilitesTablesByPlacemntDTO.onBalcony.push(table)}
    return facility;
}

const updatePlacementTables =  (tables) => {
    var returnTables = [];
    tables.forEach(table => {

        var tableEvents = [];
        table.reservationList.map((r, index) => {
            var reservationString = '';
            if(r.startReservation[1] === 0){reservationString = r.startReservation[0]+ ":" + r.startReservation[1]+"0";
            }else{reservationString = r.startReservation[0]+ ":" + r.startReservation[1];}
    
            var begin = moment(reservationString, "HH:mm:ss").format("HH:mm:ss");
            var end = moment(reservationString, "HH:mm:ss").add(r.duration, 'minutes').format("HH:mm:ss");
            var today = new Date().toISOString();
    
            var startEvent = new Date(today.substring(0,4), today.substring(5,7)-1, parseInt(today.substring(8,11)), parseInt(begin.toString().substring(0,2)),parseInt(begin.toString().substring(3,5)), 0);
            var endEvent = new Date(parseInt(today.substring(0,4)), parseInt(today.substring(5,7))-1, parseInt(today.substring(8,11)),parseInt(end.toString().substring(0,2)),parseInt(end.toString().substring(3,5)), 0);       
                tableEvents.push({
                title: 'Reservation',
                startDate: startEvent,
                endDate: endEvent,
                allDay: false,             
            });
        })
        table.reservationList = tableEvents; 
        returnTables.push(table);      
    });
    return returnTables;
}


const createEvents = (facility) => {

    var newF = facility;
    var garden = [];
    var inside = [];
    var balcony = [];
    
    var gardenChanged = false;
    var balconyChanged = false;
    var insideChanged = false;

   newF.facilitesTablesByPlacemntDTO.inGarden = updatePlacementTables(facility.facilitesTablesByPlacemntDTO.inGarden);
   newF.facilitesTablesByPlacemntDTO.inside = updatePlacementTables(facility.facilitesTablesByPlacemntDTO.inside);
   newF.facilitesTablesByPlacemntDTO.onBalcony = updatePlacementTables(facility.facilitesTablesByPlacemntDTO.onBalcony);
   console.log(newF);

return newF;
}



export default function facilityReducer(state = emptyState ,action){
    switch(action.type){
        case 'ADD_FACILITY':  
            return { ...state,
                    facilites : [...state.facilites,action.facility],
                    current_facility: action.facility,
                    filtered: [...state.facilites,action.facility] };
        case 'INIT_FACILITES':  
            return {
                ...state,
                facilites : action.facilites,
                filtered: action.facilites};
        case 'REMOVE_CURRENT':  
            return {
                    ...state,
                    current_facility : {},
                    current_is_avaliable: false};
        case 'CURRENT_FACILITY':  
            return {
                ...state,
                current_facility : createEvents(action.facility),
                current_is_avaliable: true};
        case 'DELETE_FACILITY':  
            return{
                ...state,
                current_facility: {},
                facilites: updateList(action.facility,state.facilites),
            }
        case 'ADD_TABLE_TO_FACILITY':  
            return{
                ...state,
                current_facility: updateCurrent(action.facility,action.table,action.placement),
                facilites :  [...state.facilites,state.current_facility],
            }
        case 'REMOVE_TABLE_FROM_FACILITY':  
            return{
                ...state,
                current_facility: action.facility,
                facilites :  action.facilites,
                filtered: [...state.facilites,action.facility] 
            }
        case 'EDIT_TABLE':  
            return{
                ...state,
                current_facility: action.facility,
                facilites :  action.facilites,
            }
        case 'EDIT_FACILITY':  
            return{
                ...state,
                current_facility: action.facility,
                facilites :  action.facilites,
            }
        case 'CREATE_RESERVATION':  
            return{
                ...state,
                current_facility: createEvents(action.facility),
                facilites :  action.facilites, 
            }
        case 'CURRENT_TABLE':  
            return{
                ...state,
                current_table: action.table,
                is_current_table_avaliable :  true,
            }
        case 'FILTER':  
            return{
                ...state,
                filtered: action.facilites}
        case 'REMOVE_RESERVATION':  
            return{
                ...state,
                facilites: action.facilites,
                current_facility:action.facility}
        default: 
            return state
    }

}