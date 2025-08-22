// axiosCompany.js
import axios from 'axios';
import { API_COMPANY_URL, API_USER_URL } from '../config';

export const axiosCompany = axios.create({
  baseURL: API_COMPANY_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosUser = axios.create({
  baseURL: API_USER_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosCompany;