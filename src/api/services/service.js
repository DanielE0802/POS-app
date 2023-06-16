import axios from 'axios';
import {
  configGet,
  configGetWithToken,
  configPostWithToken,
  configPatchWithToken,
  configDeleteWithToken,
  configPutWithToken
} from '../configFetch';
import apiClient from '../axios';

class RequestService {
  fetchLoginUser = async ({ databody }) => apiClient(configPostWithToken('/auth/login', databody));

  fetchRegisterUser = async ({ databody }) => apiClient(configPostWithToken('/auth/register', databody));

  // Users

  fetchGetUserById = async ({ id }) => apiClient(configGet(`/user/${id}`));

  updateUser = async ({ id, databody }) => apiClient(configPutWithToken(`/user/${id}`, databody));

  // Products

  getProducts = async () => apiClient(configGetWithToken('/product'));

  createProduct = async (databody) => apiClient(configPostWithToken('/product', databody));

  // Categories

  getCategories = async () => apiClient(configGetWithToken('/category?r=true'));

  createCategory = async (databody) => apiClient(configPostWithToken('/category', databody));

  // pdv

  getPDV = async ({ r }) => apiClient(configGetWithToken(`/pdv?r=${r}`));

  // Brands

  getBrands = async ({ r }) => apiClient(configGetWithToken(`/brand?r=${r}`));

  createBrand = async (databody) => apiClient(configPostWithToken('/brand', databody));

  editBrand = async ({ id, databody }) => apiClient(configPatchWithToken(`/brand/${id}`, databody));

  deleteBrand = async ({ id }) => apiClient(configDeleteWithToken(`/brand/${id}`));

  // Companies

  getCompanies = async () => apiClient(configGetWithToken('/company'));

  updateCompany = async ({ databody }) => apiClient(configPatchWithToken('/company', databody));

  createCompany = async ({ databody }) => apiClient(configPostWithToken('/company', databody));

  // External API (deparments and cities)

  getDepartments = async () =>
    axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=distinct%20departamento');

  getCities = async ({ department }) =>
    axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`);
}

export default new RequestService();
