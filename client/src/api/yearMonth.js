import {callApi} from "utils/callApi"



const getPartTypeList = (param)=> callApi('/yearMonthResult/getPartTypeList', param)
const getResidenceList = (param)=> callApi('/yearMonthResult/getResidenceList', param)
const getAllPrograms = (param)=> callApi('/yearMonthResult/getAllPrograms', param)
const programManage = (param)=> callApi('/yearMonthResult/programManage', param)


const api = {
    getPartTypeList,
    getResidenceList,
    getAllPrograms,
    programManage
}
export default api;

