import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";
import { v4 } from 'uuid';
import Swal from "sweetalert2";

const name ="serviceInsert/prevent";

const key = "PREVENT_SEQ"

const initialState = {
    type : "prevent_service",
    deleteRow : [], 
    rows : [
      {
        id : "1", 
        chk : false, 
        [key] : "",
        'NAME'  : "",
        'SEX'  : "",
        'AGE'  : "",
        'RESIDENCE'  : "",
        'JOB'  : "",
        'PAST_STRESS_EXPERIENCE'  : "",
        'SCORE1'  : "",
        'SCORE2'  : "",
        'SCORE3'  : "",
        'SCORE4'  : "",
        'SCORE5'  : "",
        'SCORE6'  : "",
        'SCORE7'  : "",
        'SCORE8'  : "",
        'SCORE9'  : "",
        'SCORE10'  : "",
        'SCORE11'  : "",
        'SCORE12'  : "",
        'SCORE13'  : "",
        'SCORE14'  : "",
        'SCORE15'  : "",
        'SCORE16'  : "",
        'SCORE17'  : "",
        'SCORE18'  : "",
        'SCORE19'  : "",
        'SCORE20'  : "",
    }

    ],
    searchInfo : {
        OPENDAY : "", //시작일자
        AGENCY : "", // 기관명
        EVAL_DATE : "", // 실시일자
        PTCPROGRAM  : "", // 참여일정
        PV : "", // 시점 (사전은 시작으로 변경됨)
    }
  
};

const action = {
  getUserTemp : createAction(`${name}/getUserTemp`),
  //getList : createAction(`${name}/getList`, (data) => ({payload : data})),
  getListAfterSave : createAction(`${name}/getListAfterSave`, (data) => ({payload : data}))
}


export const {getState, reducer, actions} = createCustomSlice({
  name,
  initialState,
  action, 
  reducers: {
    getList : (state, {payload})=>{
      state.searchInfo = {
        ...state.searchInfo, 
        ...payload.data
      }
    },
    addRow  : (state)=>{
      state.rows = state.rows.concat({...initialState.rows[0], id: v4()})
    }, 
    removeRow : (state, {payload})=>{
        const filteredList = payload.map(i=> i.id);
        const deleteSeq = payload.map(i=> i[key]); // seq
        state.deleteRow = [...new Set([...state.deleteRow, ...deleteSeq])];
        state.rows = state.rows.filter((i)=> !filteredList.includes(i.id))
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


    setTest : (state) =>{
      

      const newData = state.rows.map((item) => {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          updatedItem[key] = "1";
        }
        return updatedItem;
      });
      state.rows = newData;
    },



    getList_SUCCESS : (state, {payload  : {data}})=>{
      if(data.length === 0 ){
        Swal.fire({ icon: 'warning', title: '확인', text: "기존 입력된 데이터가 없습니다.", })
      }else{
        Swal.fire({ icon: 'warning', title: '확인', text: "이전에 작성했던 데이터를 불러옵니다."});
        state.rows = data.map(i=> ({...i, id : v4(), chk : false}));
        
      }
    },
    getListAfterSave_SUCCESS : (state, {payload  : {data}})=>{
        state.rows = data.map(i=> ({...i, id : v4(), chk : false}));
    },


    setAllData  : (state, {payload : {type, value}})=>{
      state.rows = state.rows.map(i=> ({...i, 
          [type] : value      
      }))
    },
    // 입력유저관리 
    getUserTemp_SUCCESS : (state, {payload : {data}})=>{
      state.rows  =data.map(i=> ({
        ...initialState.rows[0],
        id : v4(), 
        NAME : i.name,
        SEX:i.sex, // 성별
        AGE:i.age, // 연령
        RESIDENCE:i.residence, // 거주지
        JOB:i.job,  
      }))
    },


  }
});

