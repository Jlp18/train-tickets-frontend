import {
  API_URL,
  headers
} from '../constants';
import axios from 'axios';
import { postData, serialize } from '../utils/postData';

const url = `${API_URL}/selectTickets`;


const getTickets = async function (data) {
  return await axios.post(url, serialize(data),{
    headers: headers
  });
}



const statistics = async function (adminId, token) {
  
}

const update = async function (adminId, token, orderId, status) {
  
}



export default {
  getTickets,
  statistics,
  update
}
