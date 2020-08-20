export function addNewFacility(facility){ 
    return {type: 'ADD_FACILITY',facility: facility}
}
export function initFacilites(facilites){ 
    return {type: 'INIT_FACILITES',facilites: facilites}
}
export function currentFacility(facility){ 
    return {type: 'CURRENT_FACILITY',facility: facility}
}
export function removeCurrentFacility(){ 
    return {type: 'REMOVE_CURRENT'}
}
export function deleteFacility(facility){ 
    return {type: 'DELETE_FACILITY',facility:facility}
}
export function addTableToF(facility,table,placement){ 
    return {type: 'ADD_TABLE_TO_FACILITY',facility:facility,table:table,placement:placement}
}
export function removeTable(facility,facilites){ 
    return {type: 'REMOVE_TABLE_FROM_FACILITY',facilites:facilites,facility:facility}
}
export function editTable(data){ 
    return {type: 'EDIT_TABLE',facilites:data.facilites,facility:data.facility}
}
export function editFacility(data){ 
    return {type: 'EDIT_FACILITY',facilites:data.facilites,facility:data.facility}
}
export function createRes(data){ 
    return {type: 'CREATE_RESERVATION',facilites:data.facilites,facility:data.facilityDTO}
}
export function currentTable(table){ 
    return {type: 'CURRENT_TABLE',table: table}
}
export function filter(facilites){ 
    return {type: 'FILTER',facilites: facilites}
}
export function removeR(data){ 
    return {type: 'REMOVE_RESERVATION',facilites:data.facilites,facility:data.facility}
}
