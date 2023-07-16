import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";

const name ="program";

const initialState = {
    OPENDAY : "",
    AGENCY : "",
    OM : "",
    ENDDAY : "",
    DAYS_TO_STAY : "",
    RESIDENCE : "",
    PART_MAN_CNT : "",
    PART_WOMAN_CNT : "",
    LEAD_MAN_CNT : "",
    LEAD_WOMAN_CNT : "",
    SUPPORT : "",
    INCOME_TYPE : "",
    PART_TYPE : "",
    AGE_TYPE : "",
    BIZ_PURPOSE : "",
    PROGRAM_IN_OUT : "",
    SERVICE_TYPE : "",
    ROOM_PART_PEOPLE : "",
    ROOM_PART_ROOM : "",
    ROOM_LEAD_PEOPLE : "",
    ROOM_LEAD_ROOM : "",
    ROOM_ETC_PEOPLE : "",
    ROOM_ETC_ROOM : "",
    MEAL_TYPE : "",
    MEAL_PART : "",
    MEAL_LEAD : "",
    MEAL_ETC : "",
    PROGRAM_OPINION : "",
    SERVICE_OPINION : "",
    OVERALL_OPINION : "",
    PROGRESS_STATE : "",
    REG_ID : "",
    ISCLOSEMINE : false,
};

const action = {
    getList : createAction(`${name}/getList`)

}



export const {getState, reducer, actions} = createCustomSlice({
  name,
  initialState,
  action, 
  reducers: {
    getList_SUCCESS : (state, {payload: {data}})=>{
      
      state.rows = data;
    }

  }
});

