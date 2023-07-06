import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";

const name ="yearMonthResult";

const initialState = {
  type : "serviceInsertForm",
  openday : "",
  endday : "",
  partTypeList : {
    count_addict :"",
    count_adult :"",
    count_benefit :"",
    count_boy :"",
    count_etc :"",
    count_family :"",
    count_handicap :"",
    count_income_etc :"",
    count_income_green :"",
    count_income_voucher :"",
    count_kid :"",
    count_lowincome :"",
    count_old :"",
    count_society :"",
    count_teacher :"",
    part_addict :"",
    part_adult :"",
    part_benefit :"",
    part_boy :"",
    part_etc :"",
    part_family :"",
    part_handicap :"",
    part_income_etc :"",
    part_income_green :"",
    part_income_voucher :"",
    part_kid :"",
    part_lowincome :"",
    part_old :"",
    part_society :"",
    part_teacher :"",
  }
};

const action = {
    getPartTypeList : createAction(`${name}/getPartTypeList`, (data) => ({payload : data}))

}



export const {getState, reducer, actions} = createCustomSlice({
  name,
  initialState,
  action, 
  reducers: {
    getPartTypeList_SUCCESS : (state, {payload: {data}})=>{
      console.log(data)
      state.partTypeList = data[0];
    }

  }
});

