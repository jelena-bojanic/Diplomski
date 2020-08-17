
const emptyState= {
    user: undefined,
    isLoggedIn: false,
}

const user = {
    role: 'NONE',
  }


export default function userReducer(state = emptyState ,action){
    switch(action.type){
        case 'USER_INFO':  
            return { ...state,
                user : action.user,
                isLoggedIn : true}
        case 'LOGOUT':  
            return { ...state,
                user : user,
                isLoggedIn: false}
         case 'LOGIN':  
            return { ...state,
                isLoggedIn: true}
        default: 
            return state
    }

}