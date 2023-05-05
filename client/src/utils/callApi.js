import axios from 'axios';
import Swal from 'sweetalert2';
import { store } from 'store';
import { actions } from 'store/reducers/commonReducer';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL+"/api", // Base URL 설정
});

client.interceptors.request.use((config) => {
  // request 시작전에 store의 isLoading 값을 true로 변경
  store.dispatch(actions.startLoading());
  return config;
});

client.interceptors.response.use(
  (response) => {
    store.dispatch(actions.finishLoading());
    return response;
  },

  (error) => {
    Swal.fire({
      icon: 'error',
      title: '에러',
      text: error.response.data.message,
    });
    return Promise.reject(error);
  }
);

const axiosUtil = (payload) => {  
  return client({
    method  : "post",
    ...payload
  });
};

export default axiosUtil;
