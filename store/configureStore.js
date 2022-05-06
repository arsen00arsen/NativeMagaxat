import {createStore, combineReducers} from 'redux';
import signUpReducer from '../stores/reducers/signUpReducer';
const rootReducer = combineReducers({usser: signUpReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
