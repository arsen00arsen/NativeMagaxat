import {combineReducers} from 'redux';
import {userReducer} from '../stores/user/userReducer';
import {postReducer} from '../stores/post/postReducer';
import {lastUserReducer} from '../stores/lastUsers/lastUsersReduser';
import {mediaReducer} from '../stores/medias/mediaReducer';
import {appearsReducer} from '../stores/appears/appearsReducer';
import {myPostReducer} from '../stores/profileMe/profileMeReducer';
import {chatUserReducer} from '../stores/chatUsers/chatUsersReducer';
import {messagesReducer} from '../stores/messages/messageReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  users: lastUserReducer,
  medias: mediaReducer,
  appears: appearsReducer,
  myPosts: myPostReducer,
  chatUsers: chatUserReducer,
  messages: messagesReducer,
});
