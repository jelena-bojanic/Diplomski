import axios from 'axios';
import { userInfo, loggOut, login } from '../components/user/userActions';
import { home } from '../RoutesConstants';
import Swal from 'sweetalert2'


let reduxStore;
export function setReduxStoreUser(redux){
    reduxStore = redux;
} 

const user = {
  role: 'NONE',
}

export function loginUser(user) {

        axios.post("http://localhost:8081/auth/login",user).then(
          (resp) => {
            localStorage.setItem('token', resp.data.accessToken);
            getUser();
          },
          (resp) => { alert("error login"); return []; }
        );
  };

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
           // reduxStore.dispatch(login());
          },
          (resp) => { alert("error getting info"); console.log(resp); }
        );
  };
}

export function logout() {
    reduxStore.dispatch(loggOut());
};

export function register(user,history) {
    axios.post("http://localhost:8081/auth/register",user).then(
      (resp) => { history.push(`${home}`); },
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


