import {
  FETCH_TOKEN,
  SET_CURRENT_USER,
  AUTH_ERROR
} from './types';
import {
  ADMIN_ID,
  USERID
} from '../constants';
import * as utils from '../utils';
import authService from '../services/authService';

function fetchToken() {
  return {
    type: FETCH_TOKEN
  }
}

function setCurrentUser(admin) {
  return {
    type: SET_CURRENT_USER,
    admin
  }
}

function authError(error) {
  utils.removeStorage(ADMIN_ID)
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

function signin(username, password) {
  const data = {
    username,
    password
  }
  return async (dispatch) => {
    try {
      dispatch(fetchToken())

      const res = await authService.loginPost(data)
      console.log(res.status)
      
      if (res.status === 200 && res.data.code === 100) {
        console.log(res)
        const admin = res.data.data.userId;
        utils.setStorage(USERID, admin)

        return dispatch(setCurrentUser({
          admin
        }))
      }
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 404 && err.response.data.code === -1001) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }
    }
  }
}

function register(userId, username, password, identityCard, age, gender, phone){
  const data = {
    userId,
    username,
    password,
    identityCard,
    age,
    gender,
    phone
  }
  return async (dispatch) =>{
    try{
      const res = await authService.registerPost(data)
      if(res.status === 200 && res.data.code === 100){
        console.log(res)
        const admin = res.data.data.userId;

        return dispatch(setCurrentUser({
          admin
        }))
      } else{
        const errorMessage = res.data.message
        return dispatch(authError(errorMessage))
      }
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 404 && err.response.data.code === -1001) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }
    }
  }

}


function signout() {
  return dispatch => {
    utils.removeStorage(USERID)
    dispatch(setCurrentUser({}))
  }
}

export {
  setCurrentUser,
  authError,
  signin,
  signout,
  register
}
