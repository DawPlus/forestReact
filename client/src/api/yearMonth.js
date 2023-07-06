import {callApi} from "utils/callApi"



const getPartTypeList = (param)=> callApi('/yearMonthResult/getPartTypeList', param)


const api = {
    getPartTypeList
}
export default api;

