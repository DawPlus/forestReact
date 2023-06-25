import {callApi} from "utils/callApi"



const getPreviousServiceList = (param)=> callApi('/insertForm/getPreviousServiceList', param)



const api = {
    getPreviousServiceList
}
export default api;

