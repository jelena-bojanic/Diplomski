import axios from 'axios';
import { userInfo, loggOut, login } from '../components/user/userActions';
import { home,login as l } from '../RoutesConstants';
import Swal from 'sweetalert2'
import { store } from 'react-notifications-component'
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

let reduxStore;
export function setReduxStoreUser(redux){
    reduxStore = redux;
} 

const user = {
  role: 'NONE',
}

const options = `accessToken=${localStorage.getItem('token')}`;
let socket = '';
let stompClient='';


export function loginUser(user) {

        axios.post("http://localhost:8081/auth/login",user).then(
          (resp) => {
            localStorage.setItem('token', resp.data.accessToken);
            console.log(resp.data);
            getUser();

            /*const options = `accessToken=${resp.data.accessToken}`;
            socket = new SockJS(`http://localhost:8081/socket/?${options}`);
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function () {
              alert('connected');
              openGlobalSocket(true);
              
              });*/
          },
          (resp) => { alert("error login"); return []; }
        );
  };

  function openGlobalSocket(lodaded) {
    if (lodaded) {
        var message = 'caos';

        stompClient.subscribe("/user/socket-publisher/");

        socket.onmessage = function (event) {
            store.addNotification({
              title: "New notification",
              message: event.data.substring(event.data.indexOf("Y")),
              type: "success",
              insert: "top",
              container: "bottom-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                  duration: 2000,
                  pauseOnHover: true
              }

          })
         
        }
        
    }
  }

  export function getUser() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
        reduxStore.dispatch(userInfo(user));
      }else{
      
      const options = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
      };



      axios.get('http://localhost:8081/auth/user',options).then(
          (resp) => {
            reduxStore.dispatch(userInfo(resp.data));

          const token = `accessToken=${localStorage.getItem('token')}`;
           socket = new SockJS(`http://localhost:8081/socket/?${token}`);
           stompClient = Stomp.over(socket);
           stompClient.connect({name:resp.data.email}, function () {
             alert('connected');
             openGlobalSocket(true);
             
             });

          },
          (resp) => { alert("please log in."); console.log(resp); }
        );
  };
}

export function logout() {
    reduxStore.dispatch(loggOut());
    socket.close();
};

export function register(user,history) {
    axios.post("http://localhost:8081/auth/register",user).then(
      (resp) => { history.push(`${l}`); },
      (resp) => { alert("error register"); return []; }
    );
};

export function editInfo(user) {

  const options = {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
  };

  user.token = localStorage.getItem('token');
  
  axios.put(`http://localhost:8081/auth/edit`,user,options).then(
    (resp) => { 
      //localStorage.setItem('token', resp.data.token);
        reduxStore.dispatch(userInfo(resp.data));
        Swal.fire({
          text: `Successfully updated your information!` ,
          icon: 'success',
          confirmButtonText: 'Continue'
        });
     },
    (resp) => { alert("error editing info"); return []; }
  );
};

export function updatepassword(user) {
  const options = {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
  };
  axios.put("http://localhost:8081/auth/update-password",user,options).then(
    (resp) => { 
      Swal.fire({
      text: `Successfully updated your password!` ,
      icon: 'success',
      confirmButtonText: 'Continue'
    }); },
    (resp) => { alert("error pass"); return []; }
  );
};


