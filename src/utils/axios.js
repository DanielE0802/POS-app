import axios from 'axios';
import { JWTconfig } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `${JWTconfig.apiUrl}/${JWTconfig.apiV}`
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
