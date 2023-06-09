import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";

const name ="management";

const initialState = {
    codeList : [],
    regUser : [],  // 등록된 사용자 목록
    history : [],   // 히스토리 
};

const action = {
    getBaseInfoPage : createAction(`${name}/getBaseInfoPage`),
    getRegUser : createAction(`${name}/getRegUser`),
    getAllHistories : createAction(`${name}/getAllHistories`),
    getHistory : createAction(`${name}/getHistory`),

}

const codNameList  =[
  {type : "SUPPORT", name : "지원사항"},
  {type : "INCOME_TYPE", name : "수입구분"},
  {type : "PART_TYPE", name : "참가자유형"},
  {type : "BIZ_PURPOSE", name : "사업목적"},
  {type : "PROGRAM_IN_OUT", name : "프로그램"},
  {type : "SERVICE_TYPE", name : "서비스유형"},
  {type : "AGE_TYPE", name : "연령대"},
]


export const {getState, reducer, actions} = createCustomSlice({
    name,
    initialState,
    action, 
    reducers: {
        getBaseInfoPage_SUCCESS : (state, {payload })=>{
            const codeList = Object.entries(payload.data).reduce((acc, [type, values]) => {
              if (type !== 'SEQ') {
                acc.push({
                  type,
                  name: codNameList.find(codName => codName.type === type)?.name || "",
                  items: values.split(','),
                });
              }
              return acc;
            }, []);
            state.codeList = codeList
        },

      // 등록사용자 조회 
      getRegUser_SUCCESS : (state, {payload})=>{
        state.regUser = payload.data.map(i=> ({...i, chk : false}))
      },
      // 모든히스토리 조회 
      getAllHistories_SUCCESS : (state, {payload})=>{
        state.history = payload.data
      },
      // 사용자 히스토리  조회 
      getHistory_SUCCESS : (state, {payload})=>{
        state.history = payload.data
      }
    }
});
