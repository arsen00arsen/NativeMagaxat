import {combineReducers} from 'redux';
import signUpReducer from '../stores/reducers/signUpReducer';
import {userReducer} from '../stores/user/userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  usser: signUpReducer,
});
