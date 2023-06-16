import {callApi} from "utils/callApi"



const getProgramAgency = (param)=> callApi("/programResult/getProgramAgency", param)
const getProgramResult = (param)=> callApi("/programResult/getProgramResult", param)
const getSearchResult = (param)=> callApi("/programResult/getSearchResult", param)


const api = {
    getProgramAgency,
    getProgramResult,
    getSearchResult
}
export default api;

