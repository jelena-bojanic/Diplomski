export function userInfo(user){ 
    return {type: 'USER_INFO',user: user}
}
export function loggOut(){ 
    return {type: 'LOGOUT'}
}
export function login(){ 
    return {type: 'LOGIN'}
}
