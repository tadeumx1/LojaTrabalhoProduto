import axios from 'axios';
import interceptors from './interceptors';

const api = axios.create({
  baseURL: 'http://fiap-reactjs-presencial.herokuapp.com',
});

interceptors.request(api);
interceptors.response(api);

export default api;
