import axios from 'axios';
import Swal from 'sweetalert2'
import { initFacilites, currentFacility, addNewFacility ,addTableToF, removeTable,editTable, editFacility, createRes, currentTable} from '../components/facility/facilityActions';
import { userInfo } from '../components/user/userActions';

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
    axios.delete(`http://localhost:8081/facility/delete/${this.state.facility.id}`, options).then(
        (response) => { reduxStore.dispatch(deleteFacility(facility)) },
        (response) => {alert('error deleting'); }
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
                (response) => {alert('error creating table'); }
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
