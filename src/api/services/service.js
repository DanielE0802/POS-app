import { configGetWithToken, configPostWithToken } from '../configFetch';
import apiClient from '../axios';

class RequestService {
  fetchLoginUser = async ({ databody }) => apiClient(configPostWithToken('/auth/login', databody));

  fetchRegisterUser = async ({ databody }) => apiClient(configPostWithToken('/auth/register', databody));

  fetchGetUserById = async ({ id }) => apiClient(configGetWithToken(`/user/${id}`));

  // Products

  getProducts = async () => apiClient(configGetWithToken('/product'));

  // Categories

  getCategories = async () => apiClient(configGetWithToken('/category'));
}

export default new RequestService();
