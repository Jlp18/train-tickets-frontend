import * as Types from './types';
import userService from '../services/userService';
import {
  setCurrentUser,
  authError,
  signin,
  signout,
  register
} from './authAction';

import {
  getSelectedTickets,
  statistics as statisticsOrder,
  updateOrderStatus
} from './orderAction';

function serviceStart() {
  return {
    type: Types.SERVICE_START
  }
}

function serviceEnd() {
  return {
    type: Types.SERVICE_END
  }
}

function loadUsers() {
  return {
    type: Types.LOAD_USERS
  }
}

function receiveUsers(users) {
  return {
    type: Types.RECEIVE_USERS,
    users
  }
}

function fetchOrders(userId) {
  return async (dispatch) => {
    try {
      dispatch(loadUsers())
      const res = await userService.all(userId)
      return dispatch(receiveUsers(res.data.data))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        return dispatch(authError(errorMessage))
      }
    }
  }
}

export {
  serviceStart,
  serviceEnd,
  setCurrentUser,
  signin,
  signout,
  register,
  authError,
  fetchOrders,
  getSelectedTickets, //改
  statisticsOrder,
  updateOrderStatus
}
