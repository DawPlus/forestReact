import { createAction } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";

const name ="programResult";

const initialState = {
    formList : [], 
    agencyList : [], 
    programResult : [], 
};

const action = {


    getProgramAgency : createAction(`${name}/getProgramAgency`),
    getProgramResult : createAction(`${name}/getProgramResult`),


}



export const {getState, reducer, actions} = createCustomSlice({
    name,
    initialState,
    action, 
    reducers: {
      getProgramAgency_SUCCESS : (state, {payload})=>{
        state.agencyList = payload.data.map(({agency})=> ({label : agency , value : agency}))
      },
      getProgramResult_SUCCESS : (state, {payload})=>{


        state.programResult = payload.data.map(i =>{

          const sum1List = [i.SCORE1, i.SCORE2, i.SCORE3];
          const sum2List = [i.SCORE4, i.SCORE5, i.SCORE6];
          const sum3List = [i.SCORE7, i.SCORE8, i.SCORE9];
          
          const sum1 = sum1List.reduce((sum, num) => sum + +num, 0) / sum1List.filter(i=> +i >0).length
          const sum2 = sum2List.reduce((sum, num) => sum + +num, 0) / sum2List.filter(i=> +i >0).length
          const sum3 = sum3List.reduce((sum, num) => sum + +num, 0) / sum3List.filter(i=> +i >0).length

          const result1 = sum1.toFixed(sum1 % 1 === 0 ? 1 : 2)
          const result2 = sum2.toFixed(sum2 % 1 === 0 ? 1 : 2)
          const result3 = sum3.toFixed(sum3 % 1 === 0 ? 1 : 2)

          return {
            ...i, 
            sum1 : result1,
            sum2 : result2,
            sum3 : result3,
          }

        });
      },

    }
});
