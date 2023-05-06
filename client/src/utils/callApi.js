import axios from 'axios';
import Swal from 'sweetalert2';
import { store } from 'store';
import { actions } from 'store/reducers/commonReducer';

export const client = axios.create({
  method : "post",
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
    store.dispatch(actions.finishLoading());
    Swal.fire({
      icon: 'error',
      title: '에러',
      text: "오류가 발생했습니다 관리자에게 문의해 주세요 ",
    });
    return Promise.reject(error);
  }
);

export const callApi = (url, data) => {  
  return client.request({
    url, 
    data
  });
};

export default callApi;

