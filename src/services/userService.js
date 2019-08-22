import {
  ADMIN_API,
  USER_API,
  updateUerInfo_URL,
  headers
} from '../constants';
import axios from 'axios';
import * as untils from '../utils'

const DEFAULT = {
  userId: 1,
  userName: '',
  nickName: ''
}

const admin_url = `${ADMIN_API}/user`
const user_url = `${USER_API}/user`



const update = async (userId, password, values) => {
  const updateDate = {
    userId: userId,
    username: values.username,
    password: password,
    identityCard: values.identityCard,
    age: values.age,
    gender: values.gender === '男' ? 1 : 2,
    phone: values.phone
  }
  // updateDate.password = password
  // if (values.username) {
  //   updateDate.nickName = values.username
  // }
  // if (values.identityCard) {
  //   updateDate.identityCard = values.identityCard
  // }
  // if (values.age) {
  //   updateDate.age = values.age
  // }
  // if (values.gender) {
  //   updateDate.gender = values.gender === '男' ? 1 : 2
  // }
  // if (values.phone) {
  //   updateDate.phone = values.phone
  // }
  console.log("up"+updateDate.gender);
  
  return axios.post(updateUerInfo_URL,untils.serialize(updateDate),{
    headers: headers
  })
}

export default {
  update
}
