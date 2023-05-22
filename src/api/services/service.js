import axios from 'axios';
import { configGet, configGetWithToken, configPostWithToken } from '../configFetch';
import apiClient from '../axios';

class RequestService {
  fetchLoginUser = async ({ databody }) => apiClient(configPostWithToken('/auth/login', databody));

  fetchRegisterUser = async ({ databody }) => apiClient(configPostWithToken('/auth/register', databody));

  fetchGetUserById = async ({ id }) => apiClient(configGet(`/user/${id}`));

  // Products

  getProducts = async () => apiClient(configGetWithToken('/product'));

  // Categories

  getCategories = async () => apiClient(configGetWithToken('/category'));

  // Warehouses

  // External API (deparments and cities)

  getDepartments = async () =>
    axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=distinct%20departamento');

  getCities = async ({ department }) =>
    axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`);
}

export default new RequestService();
