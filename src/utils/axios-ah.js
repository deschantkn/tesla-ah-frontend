/* eslint-disable no-undef */
import axios from 'axios';
import { BACKEND_URL } from './constants';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    token: `${sessionStorage.getItem('token')}`,
  },
};

const instance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: { token: `${sessionStorage.getItem('token')}` },
});

export default instance;
