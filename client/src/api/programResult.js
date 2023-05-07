import {callApi} from "utils/callApi"



const getProgramAgency = (param)=> callApi("/programResult/getProgramAgency", param)
const getProgramResult = (param)=> callApi("/programResult/getProgramResult", param)


const api = {
    getProgramAgency,
    getProgramResult
}
export default api;

