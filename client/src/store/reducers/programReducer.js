import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";
import { v4 } from 'uuid';
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


    // 각각 1개의 expense 테이블 Row 로 구성됨 
    expenseBasicInfo : [ // 강사비 기본 1개의 row로 구성됨... 
      { EXPENSE_TYPE : "강사예정강사비", EXPENSE_PRICE : "" },
      { EXPENSE_TYPE : "강사예정보조강사비", EXPENSE_PRICE : "" },
      { EXPENSE_TYPE : "강사예정교통비", EXPENSE_PRICE : "" },
      { EXPENSE_TYPE : "강사예정식사비", EXPENSE_PRICE : "" },
    ],
    expense1 : [ // 강사비 
        // { EXPENSE_TYPE : "강사집행강사비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    expense2 : [ // 보조강사비
      //  { EXPENSE_TYPE : "강사집행식사비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    expense3 : [ // 교통비 
        //{ EXPENSE_TYPE : "강사집행교통비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    expense4 : [ // 식사비 
        //{ EXPENSE_TYPE : "강사집행식사비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    


    // 고객예정
    expenseBasicInfo2 : [ // 강사비 기본 1개의 row로 구성됨... 
      { EXPENSE_TYPE : "고객예정숙박비", EXPENSE_PRICE : "" },
      { EXPENSE_TYPE : "고객예정식사비", EXPENSE_PRICE : "" },
      { EXPENSE_TYPE : "고객예정재료비", EXPENSE_PRICE : "" },
      { EXPENSE_TYPE : "고객예정예비비", EXPENSE_PRICE : "" },
    ],
    expense5 : [ // 강사비 
        // { EXPENSE_TYPE : "강사집행강사비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    expense6 : [ // 보조강사비
      //  { EXPENSE_TYPE : "강사집행식사비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    expense7 : [ // 교통비 
        //{ EXPENSE_TYPE : "강사집행교통비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],
    expense8 : [ // 식사비 
        //{ EXPENSE_TYPE : "강사집행식사비", EXPENSE_PRICE : "", EXPENSE_DETAIL : "", EXPENSE_NOTE : "", }
    ],

    income : [
      {
        INCOME_SEQ : "",
        INCOME_TYPE : "",
        INCOME_PRICE : "",
        INCOME_DETAIL : "",
        INCOME_NOTE : "",
        BASIC_INFO_SEQ : "",
      }
    ]
};

const action = {
    getList : createAction(`${name}/getList`)

    
  }

export const {getState, reducer, actions} = createCustomSlice({
  name,
  initialState,
  action, 
  reducers: {
    // 목록조회
    getList_SUCCESS : (state, {payload: {data}})=>{
      state.rows = data;
    },
    
    // 배열의 값을 바꾼다 .
    setArrTargetChange  : (state, {payload : {target, index, name, value}})=>{
      state[target][index][name] = value;
    },
    // Row 추가 
    addArrTarget : (state, {payload : {target, value}})=>{
      state[target] = state[target].concat({...value, id : v4()})
    },
    removeArrTarget : (state, {payload : {target, id}})=>{
      state[target] = state[target].filter(i=> i.id !== id)
    }



  }
});

