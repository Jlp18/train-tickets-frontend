import { combineReducers } from 'redux';
import {
  routerReducer
} from 'react-router-redux';
import auth from './auth';
import users from './users';
import goods from './goods';
import service from './service';
import orders from './orders';

export default combineReducers({
  auth,
  users,
  goods,
  service,
  orders,
  router: routerReducer
});
