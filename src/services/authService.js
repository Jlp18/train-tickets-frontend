import axios from 'axios';
import {
  API_URL,
  headers
} from '../constants';
import { postData, serialize } from '../utils/postData';

const login_url = `${API_URL}/login`
const register_url = `${API_URL}/register`


const loginPost = async (data) => {
  return await axios.post(login_url, serialize(data),{
    headers: headers
  })
}

const registerPost = async (data) => {
  return await axios.post(register_url, serialize(data),{
    headers: headers
  })
}

export default {
  loginPost,
  registerPost
}
