import {callApi} from "utils/callApi"



const getPreviousServiceList = (param)=> callApi('/insertForm/getPreviousServiceList', param)
const getPreviousProgramList = (param)=> callApi('/insertForm/getPreviousProgramList', param)




const api = {
    getPreviousServiceList,
    getPreviousProgramList
}
export default api;

