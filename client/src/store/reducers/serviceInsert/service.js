import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";
import { v4 } from 'uuid';
const name ="serviceInsert/service";

const initialState = {
    rows : [
      {
        id : "1", 
        chk : false, 
        OPENDAY:"",
        AGENCY:"",
        SEX:"",
        AGE:"",
        PTCPROGRAM:"",
        RESIDENCE:"",
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
    searchInfo : {}
  
};

const action = {

}


export const {getState, reducer, actions} = createCustomSlice({
  name,
  initialState,
  action, 
  reducers: {

    addRow  : (state)=>{
      state.rows = state.rows.concat({...initialState.rows[0], id: v4()})
    }, 
    removeRow : (state, {payload})=>{
      console.log(payload)
        state.rows = state.rows.filter((i)=> !payload.includes(i.id))
    },
    changeValue : (state, {payload : {index, key , value}})=>{
      state.rows[index][key] = value;
    }


  }
});

