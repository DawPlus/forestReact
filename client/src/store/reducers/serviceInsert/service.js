import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";
import { v4 } from 'uuid';
import Swal from "sweetalert2";


const name ="serviceInsert/service";

const initialState = {
    deleteRow : [], 
    rows : [
      {
        idx : "", 
        id : "",
        chk : false, 
        SERVICE_SEQ : "", 
        OPENDAY:"",
        AGENCY:"",
        SEX:"미기재", // 성별
        AGE:"", // 연령
        PTCPROGRAM:"",
        RESIDENCE:"미기재", // 거주지
        JOB:"",
        EVAL_DATE:"",
        SCORE1:"",
        SCORE2:"",
        SCORE3:"",
        SCORE4:"",
        SCORE5:"",
        SCORE6:"",
        SCORE7:"",
        SCORE8:"",
        SCORE9:"",
        SCORE10:"",
        FACILITY_OPINION:"",
        SCORE11:"",
        SCORE12:"",
        SCORE13:"",
        SCORE14:"",
        SCORE15:"",
        SCORE16:"",
        OPERATION_OPINION:"",
        SCORE17:"",
        SCORE18:""
      }

    ],
    searchInfo : {
        AGENCY : "",  
        OPENDAY : "", 
        EVAL_DATE: "", 
        PTCPROGRAM  : ""
    }
  
};

const action = {
  
  getUserTemp : createAction(`${name}/getUserTemp`),
  getPreviousServiceList : createAction(`${name}/getPreviousServiceList`, (data) => ({payload : data})),
  getPreviousServiceListAfterSave : createAction(`${name}/getPreviousServiceListAfterSave`, (data) => ({payload : data}))
}


export const {getState, reducer, actions} = createCustomSlice({
  name,
  initialState,
  action, 
  reducers: {
    getPreviousServiceList :(state, {payload : {data}})=>{
      state.searchInfo = {
        ...state.searchInfo, 
        ...data
      }
    },
    addRow  : (state)=>{
      state.rows = state.rows.concat({...initialState.rows[0], idx: v4()})
    }, 
    removeRow : (state, {payload})=>{

        const filteredList = payload.map(i=> i.idx);
        const deleteSeq = payload.map(i=> i.SERVICE_SEQ);

        state.deleteRow = [...new Set([...state.deleteRow, ...deleteSeq])];
        state.rows = state.rows.filter((i)=> !filteredList.includes(i.idx))


        
    },
    changeValue : (state, {payload : {index, key , value}})=>{
      state.rows[index][key] = value;
    }, 
    setSearchInfo : (state, {payload : {key, value}})=>{
      state.searchInfo[key] = value;
    },
    setDate : (state, {payload })=>{
      state.searchInfo.OPENDAY = payload;
      state.searchInfo.EVAL_DATE = payload;
    },


    getPreviousServiceList_SUCCESS : (state, {payload  : {data}})=>{
      if(data.length === 0 ){
        Swal.fire({ icon: 'warning', title: '확인', text: "기존 입력된 데이터가 없습니다.", })
      }else{
        Swal.fire({ icon: 'warning', title: '확인', text: "이전에 작성했던 데이터를 불러옵니다."});
        state.rows = data.map(i=> ({...i, idx : v4(), chk : false}));
        state.searchInfo = {
          ...state.searchInfo, 
          PTCPROGRAM : data[0].PTCPROGRAM
        }
      }
    },
    getPreviousServiceListAfterSave_SUCCESS : (state, {payload  : {data}})=>{
        state.rows = data.map(i=> ({...i, idx : v4(), chk : false}));
    },

    // 입력유저관리 
    getUserTemp_SUCCESS : (state, {payload : {data}})=>{
      state.rows  =data.map(i=> ({
        ...initialState.rows[0],
        idx : v4(),
        id : i.id, 
        chk : false, 
        SEX:i.sex, // 성별
        AGE:i.age, // 연령
        RESIDENCE:i.residence, // 거주지
        JOB:i.job,  
      }))
    },
    setAllData  : (state, {payload : {type, value}})=>{
      state.rows = state.rows.map(i=> ({...i, 
          [type] : value      
      }))
    }
  }
});

