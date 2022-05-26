import {combineReducers} from 'redux';
import {userReducer} from '../stores/user/userReducer';
import {postReducer} from '../stores/post/postReducer';
import {lastUserReducer} from '../stores/lastUsers/lastUsersReduser';

export const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  users: lastUserReducer,
});
