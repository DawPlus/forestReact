import {callApi} from "utils/callApi"



const getBaseInfoPage = (param)=> callApi("/management/getBasicInfoPage", param)

const getRegUser = ()=> callApi("/management/getRegUser")
const getAllHistories = ()=> callApi("/management/getAllHistories")
const getHistory = (param)=> callApi("/management/getHistory", param)

const getProgramMngList = (param)=> callApi("/programMng/list")
const createProgramMng = (param)=> callApi("/programMng/create", param)
const deleteProgramMng = (param)=> callApi("/programMng/delete", param)






const api = {
    getBaseInfoPage,
    getRegUser,
    getAllHistories,
    getHistory,
    getProgramMngList,
    createProgramMng,
    deleteProgramMng
}
export default api;

