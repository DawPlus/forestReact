import {callApi} from "utils/callApi"



const getBaseInfoPage = (param)=> callApi("/management/getBasicInfoPage", param)

const getRegUser = ()=> callApi("/management/getRegUser")
const getAllHistories = ()=> callApi("/management/getAllHistories")
const getHistory = (param)=> callApi("/management/getHistory", param)




const api = {
    getBaseInfoPage,
    getRegUser,
    getAllHistories,
    getHistory
}
export default api;

