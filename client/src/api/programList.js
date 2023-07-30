import {callApi} from "utils/callApi"



const getProgramList = (param)=> callApi('/program/getProgramList', param);
const getTempList = ()=> callApi('/insertOperation/getTempList');
const getTempData = (param)=> callApi('/insertOperation/getTempData',param);


const api = {
    getProgramList,
    getTempList,
    getTempData
}
export default api;

