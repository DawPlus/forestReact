import {callApi} from "utils/callApi"



const getProgramList = (param)=> callApi('/program/getProgramList', param)


const api = {
    getProgramList
}
export default api;

