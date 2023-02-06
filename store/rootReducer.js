import {combineReducers} from 'redux';
import {userReducer} from '../stores/user/userReducer';
import {postReducer} from '../stores/post/postReducer';
import {lastUserReducer} from '../stores/lastUsers/lastUsersReduser';
import {mediaReducer} from '../stores/medias/mediaReducer';
import {appearsReducer} from '../stores/appears/appearsReducer';
import {myPostReducer} from '../stores/profileMe/profileMeReducer';
import {chatUserReducer} from '../stores/chatUsers/chatUsersReducer';
import {messagesReducer} from '../stores/messages/messageReducer';
import {storiReducer} from '../stores/stories/storiesReducer';
import {accountUserPostReducer} from '../stores/userPosts/accountUserPost/accountUsserPostReducer';
import {myAccountUserPostReducer} from '../stores/userPosts/myAccountUserPost/myAccountUsserPostReducer';
import {benefactorAccountUserPostReducer} from '../stores/userPosts/benAccountUserPost/benAccountUsserPostReducer';
import {homePageUsersReducer} from '../stores/userPosts/homePageUsers/homePageUsersReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  users: lastUserReducer,
  medias: mediaReducer,
  appears: appearsReducer,
  myPosts: myPostReducer,
  chatUsers: chatUserReducer,
  messages: messagesReducer,
  stori: storiReducer,
  accountUserPosts: accountUserPostReducer,
  myAccountUserPosts: myAccountUserPostReducer,
  benefactorAccountUserPosts: benefactorAccountUserPostReducer,
  homeAccountUserPosts: homePageUsersReducer,
});
