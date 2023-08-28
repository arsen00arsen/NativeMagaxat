import {combineReducers} from 'redux';
import {userReducer} from '../stores/user/userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
});
