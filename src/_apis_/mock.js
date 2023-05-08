import AxiosMockAdapter from 'axios-mock-adapter';
// utils
import axios from '../api/axios';

// ----------------------------------------------------------------------

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0
});

export default axiosMockAdapter;
