import {combineReducers} from 'redux';
import {userReducer} from '../stores/user/userReducer';
// import {notifReducer} from '../stores/notifications/notifReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  // notifications: notifReducer,
});
