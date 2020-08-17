import {combineReducers} from 'redux';
import facilites from '../components/facility/facilityReducer';
import user from '../components/user/userReducer';


const rootReducer = combineReducers({
    facilites,
    user,
});
export default rootReducer;