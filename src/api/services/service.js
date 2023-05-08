import { configPostWithToken } from '../configFetch';
import apiClient from '../axios';

class RequestService {
  fetchLoginUser = async ({ databody }) => apiClient(configPostWithToken('/auth/login', databody));
}

export default new RequestService();
