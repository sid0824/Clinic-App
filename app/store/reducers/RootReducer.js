import { combineReducers } from 'redux';
import UsersReducer from './UsersReducers';

const RootReducer = combineReducers({
  users: UsersReducer,
});
