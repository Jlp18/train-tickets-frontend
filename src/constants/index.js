export const BASE_URL = 'http://192.168.1.173'
//  export const API_URL = 'http://192.168.0.107:8080';
export const API_URL = `${BASE_URL}:8080`;

export const getStaticData_URL = `${BASE_URL}:8080/getCount`;
export const getOrderCount_URL = `${BASE_URL}:8080/getOrdersCount`;
export const getSelectCount_URL = `${BASE_URL}:8080/getSelectsCount`;
export const getUerInfo_URL = `${BASE_URL}:8080/getUserInfo`;
export const updateUerInfo_URL = `${BASE_URL}:8080/updateUserInfo`;

export const getOrders_URL = `${BASE_URL}:8080/getOrders`;

export const headers = {'Content-Type' : 'application/x-www-form-urlencoded'}

export const WEBSITE_NAME = '火车票系统';
export const USERID = 'userid';
export const USERNAME = 'username';
export const PASSWORD = 'password';
export const TOKEN = 'token';
export const ADMIN_ID = 'adminId';
export const AUTHORIZATION = 'authorization';
export const DEFAULT_PAGE = 1;
export const DEFAULT_ROWS = 10;
