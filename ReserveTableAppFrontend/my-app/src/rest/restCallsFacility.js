import axios from 'axios';
import Swal from 'sweetalert2'
import {removeR, initFacilites, currentFacility, addNewFacility ,addTableToF, removeTable,editTable, editFacility, createRes, currentTable, deleteF} from '../components/facility/facilityActions';
import { userInfo } from '../components/user/userActions';
import { reservations, facilites } from '../RoutesConstants';

let reduxStore;
export function setReduxStoreFacility(redux){
    reduxStore = redux;
} 

export function initalizeAllFacilites() {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};
    axios.get(`http://localhost:8081/facility/all`, options).then(
      (resp) => {
        reduxStore.dispatch(initFacilites(resp.data))
      },
      (resp) => { alert("error init all facilites"); return []; }
    );
  };

  export function getOneFacility(id) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};
    axios.get(`http://localhost:8081/facility/one/${id}`, options).then(
        (response) => {reduxStore.dispatch(currentFacility(response.data))},
        (response) => {alert('error one facility'); }
    );
    
  };
  export function deleteFacility(facility) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};
    axios.delete(`http://localhost:8081/facility/delete/${facility.id}`, options).then(
        (response) => { 
          reduxStore.dispatch(deleteF(response.data));
         },
        (response) => {alert(`Can not delete.This ${facility.type} has tables with upcoming reservations.`); }
    );
    
  };

  export function addFacility(facility) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};
        axios.post(`http://localhost:8081/facility/create`,facility ,options).then(
            (response) => {  
                reduxStore.dispatch(addNewFacility(response.data))
                Swal.fire({
                  text: `Successfully added new ${facility.type}` ,
                  icon: 'success',
                  confirmButtonText: 'Continue'
                })
              },
            (response) => {alert('error creating facility'); }
    );
    
  };

  export  function addTableToFacility(facility,table,placement) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.post(`http://localhost:8081/table/create`,table,options).then(
                (response) => {  
                    reduxStore.dispatch(addTableToF(facility,response.data,placement))},
                (response) => {alert('error creating table'); }
        );
        
    
  };

  export  function editT(table) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.put(`http://localhost:8081/table/edit`,table,options).then(
                (response) => {  
                    reduxStore.dispatch(editTable(response.data))},
                (response) => {alert('error editing table'); }
        );
        
    
  };

  export  function removeTableFromFacility(facility,table,placement) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.delete(`http://localhost:8081/table/delete/${table.id}`,options).then(
                (response) => {  
                    reduxStore.dispatch(removeTable(response.data.facility,response.data.facilites))
                    Swal.fire({
                      text: `Table removed` ,
                      icon: 'success',
                      confirmButtonText: 'Continue'
                    })
                  },
                (response) => {
                  Swal.fire({
                    text: `Table can not be removed because it has future reservations.` ,
                    icon: 'error',
                    confirmButtonText: 'Continue'
                  })
                 }
        );
        
    
  };

  export  function editF(facility) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.put(`http://localhost:8081/facility/edit`,facility,options).then(
                (response) => {  
                    reduxStore.dispatch(editFacility(response.data))},
                (response) => {alert('error editing facility'); }
        );     
  };

  export async function getTable(id) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

        const [response] = await Promise.all([axios.get(`http://localhost:8081/table/one/${id}`,options),]);

            if( response.data !== null){ 
                    reduxStore.dispatch(currentTable(response.data))
              }else{
                alert('error getting table'); 
              }
             
  };

  export  function createR(r) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.post(`http://localhost:8081/reservation/create`,r,options).then(
                (response) => {  
                    reduxStore.dispatch(createRes(response.data));
                    reduxStore.dispatch(userInfo(response.data.user));
                    Swal.fire({
                      text: `Reserved` ,
                      icon: 'success',
                      confirmButtonText: 'Continue'
                    });
                  
                  },
                (response) => {alert('error creating reservation'); }
        );          
  };

  export  function filterFacilites(filter) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.get(`http://localhost:8081/facility/filter`,filter,options).then(
                (response) => {  
                    reduxStore.dispatch(initFacilites(response.data))},
                (response) => {alert('error filtering facility'); }
        );     
  };

  export  function removeReservation(reservation) {
    const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}};

            axios.delete(`http://localhost:8081/reservation/delete/${reservation.id}`,options).then(
                (response) => {  
                  reduxStore.dispatch(removeR(response.data));
                  reduxStore.dispatch(userInfo(response.data.user));
                 },
                (response) => {alert('error removing reservation'); }
        );     
  };


