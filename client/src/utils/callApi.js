import axios from 'axios';
import Swal from 'sweetalert2';
import { store } from 'store';
import { actions } from 'store/reducers/commonReducer';

export const client = axios.create({
  method : "post",
  baseURL: process.env.REACT_APP_BASE_URL+"/api", // Base URL 설정
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  // request 시작전에 store의 isLoading 값을 true로 변경
  store.dispatch(actions.startLoading());
  return config;
});

client.interceptors.response.use(
  (response) => {
    store.dispatch(actions.finishLoading());
    // 응답 데이터에서 invalidateSession 값을 체크
    if (response.data.invalidateSession) {
      // Swal을 이용해 메시지 출력
      Swal.fire({
        icon: 'warning',
        title: '세션 종료',
        text: "세션이 종료되었습니다. 다시 로그인해주세요.",
      }).then(() => {
        // "/login" 페이지로 이동
        window.location.href = '/login';
      });
      
      // 에러를 발생시켜 후속 요청 중단
      return Promise.reject(new Error('세션이 종료되었습니다. 다시 로그인해주세요.'));
    }
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


