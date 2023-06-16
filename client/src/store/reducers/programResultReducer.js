import { createAction, current } from '@reduxjs/toolkit';
import createCustomSlice from "utils/createCustomSlice";

const name ="programResult";

const initialState = {

    type : "",
    agency : "", 

    agencyList : [], 
    programResult : [], 
    facilityList : [] , 
    preventList : [],
    healingList : [],

  searchResult  : {
    searchInfo : {
        effect : "program",
        keyword : [
          {type : "X", text : ""},
          {type : "X", text : ""},
          {type : "X", text : ""},
        ]
    },

    rows : [], 
    facility : [], 

  }


};

const action = {


  //  getProgramAgency : createAction(`${name}/getProgramAgency`),
    getProgramResult : createAction(`${name}/getProgramResult`),
    getFaciltyList : createAction(`${name}/getFaciltyList`),
    getPreventList : createAction(`${name}/getPreventList`),
    getHealingList : createAction(`${name}/getHealingList`),




    getSearchResult : createAction(`${name}/getSearchResult`),


}

const calculateAverage= (scores) =>{
  const filteredScores = scores.filter(i => +i > 0);
  const sum = filteredScores.reduce((sum, num) => sum + +num, 0);
  const average = sum / filteredScores.length;
  if (isNaN(average)) {
    return 0;
  }
  return average.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: average % 1 === 0 ? 1 : 2,
  });
}


export const {getState, reducer, actions} = createCustomSlice({
    name,
    initialState,
    action, 
    reducers: {
      initProgramAgency : (state)=>{
        state.type = initialState.type;
        state.agencyList = initialState.agencyList;
        state.programResult = initialState.programResult;
      },
      setAgency : (state, {payload})=>{
        state.agency = payload;
        state.programResult = initialState.programResult;
        state.facilityList = initialState.facilityList;
      },


      // 힐링서비스  효과평가
      getHealingList_SUCCESS : (state, {payload})=>{

        const sortedData = payload.data.sort((a, b) => {
          if (a.NAME < b.NAME) return -1;
          if (a.NAME > b.NAME) return 1;
          if (a.PV === '사전' && b.PV === '사후') return -1;
          if (a.PV === '사후' && b.PV === '사전') return 1;
          return 0;
      });

      // 사전 사후가 없을경우는 0 으로 입력  
      // 사전과 사후가 모두 있는 항목만 출력
      const filteredData = sortedData.filter(data => {
          const hasPre = sortedData.some(item => item.NAME === data.NAME && item.PV === '사전');
          const hasPost = sortedData.some(item => item.NAME === data.NAME && item.PV === '사후');
          return hasPre && hasPost;
      });



        state.healingList = filteredData.map(i=> {
          const sum1List = [i.SCORE1, i.SCORE2];
          const sum2List = [i.SCORE3, i.SCORE4, i.SCORE5];
          const sum3List = [i.SCORE6, i.SCORE7, i.SCORE8, i.SCORE9];
          const sum4List = [i.SCORE10, i.SCORE11, i.SCORE12];
          const sum5List = [i.SCORE11, i.SCORE12, i.SCORE13, i.SCORE14];
          const sum6List = [i.SCORE15, i.SCORE16, i.SCORE17];
          const sum7List = [i.SCORE18, i.SCORE19, i.SCORE20];
          const [ sum1, sum2, sum3, sum4, sum5, sum6, sum7] = 
              [ calculateAverage(sum1List), calculateAverage(sum2List), calculateAverage(sum3List), calculateAverage(sum4List), calculateAverage(sum5List), calculateAverage(sum6List) , calculateAverage(sum7List)]
          return { ...i, sum1, sum2, sum3, sum4, sum5, sum6, sum7 }
        })
        },
  
      // 예방서비스 효과평가
      getPreventList_SUCCESS : (state, {payload})=>{

        const sortedData = payload.data.sort((a, b) => {
          if (a.NAME < b.NAME) return -1;
          if (a.NAME > b.NAME) return 1;
          if (a.PV === '사전' && b.PV === '사후') return -1;
          if (a.PV === '사후' && b.PV === '사전') return 1;
          return 0;
      });

      // 사전 사후가 없을경우는 0 으로 입력  
      // 사전과 사후가 모두 있는 항목만 출력
      const filteredData = sortedData.filter(data => {
          const hasPre = sortedData.some(item => item.NAME === data.NAME && item.PV === '사전');
          const hasPost = sortedData.some(item => item.NAME === data.NAME && item.PV === '사후');
          return hasPre && hasPost;
      });



        state.preventList = filteredData.map(i=> {
          const sum1List = [i.SCORE1, i.SCORE2, i.SCORE3];
          const sum2List = [i.SCORE4, i.SCORE5, i.SCORE6];
          const sum3List = [i.SCORE7, i.SCORE8, i.SCORE9, i.SCORE10];
          const sum4List = [i.SCORE11, i.SCORE12];
          const sum5List = [i.SCORE13, i.SCORE14, i.SCORE15, i.SCORE16, i.SCORE17];
          const sum6List = [i.SCORE18, i.SCORE19, i.SCORE20];
          const [ sum1, sum2, sum3, sum4, sum5, sum6] = 
              [ calculateAverage(sum1List), calculateAverage(sum2List), calculateAverage(sum3List), calculateAverage(sum4List), calculateAverage(sum5List), calculateAverage(sum6List) ]
          return { ...i, sum1, sum2, sum3, sum4, sum5, sum6 }
        })
      },

      getProgramAgency : (state, {payload : {type}})=>{
        state.type = type;
        state.agency = initialState.agency;
        
        state.programResult = initialState.programResult; 
        state.facilityList = initialState.facilityList; 
        state.preventList = initialState.preventList;
      },
      getProgramAgency_SUCCESS : (state, {payload})=>{
        state.agencyList = payload.data.map(({agency})=> ({label : agency , value : agency}))
      },
      // 프로그램 만족도
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



      // 시설 서비스환경만족도
      getFaciltyList_SUCCESS : (state, {payload})=>{
          state.facilityList = payload.data.map(i=> {
            const sum1List = [i.SCORE1, i.SCORE2];
            const sum2List = [i.SCORE3, i.SCORE4];
            const sum3List = [i.SCORE5, i.SCORE6, i.SCORE7];
            const sum4List = [i.SCORE8, i.SCORE9, i.SCORE10];
            const sum5List = [i.SCORE11, i.SCORE12, i.SCORE13];
            const sum6List = [i.SCORE14, i.SCORE15, i.SCORE16];
            const sum7List = [i.SCORE17, i.SCORE18];
            const [ sum1, sum2, sum3, sum4, sum5, sum6, sum7 ] = 
                [ calculateAverage(sum1List), calculateAverage(sum2List), calculateAverage(sum3List), calculateAverage(sum4List), calculateAverage(sum5List), calculateAverage(sum6List), calculateAverage(sum7List) ]
            return { ...i, sum1, sum2, sum3, sum4, sum5, sum6, sum7 }
          });
      },




      // 주제어별 
      onChangeSearchResult : (state, {payload : {key, value}})=>{
        state.searchResult[key] = value
      },
      //주제어 변경 
      onChangeSearchKeyword : (state, {payload: {index, key, value}})=>{
        state.searchResult.searchInfo.keyword[index][key] = value
      },

      getSearchResult_SUCCESS : (state, {payload})=>{
        
        const {searchInfo  : {keyword, effect}} = current(state).searchResult
        const _keyword = keyword.map(i=> ({...i, text : i.type=== "X" ? "" : i.text}))

        state.searchResult.rows = payload.data.map(i=> {

          let avgs = {};

          if(effect ==="program"){
            avgs = {
              avg1 : calculateAverage([i.SCORE1, i.SCORE2, i.SCORE3]),
              avg2 : calculateAverage([i.SCORE4, i.SCORE5, i.SCORE6]),
              avg3 : calculateAverage([i.SCORE7, i.SCORE8, i.SCORE9]),
              avg4 : calculateAverage([i.SCORE1, i.SCORE2, i.SCORE3, i.SCORE4, i.SCORE5, i.SCORE6,i.SCORE7, i.SCORE8, i.SCORE9])
            }
          }else if(effect==="facility"){
            const sum1List = [i.SCORE1, i.SCORE2];
            const sum2List = [i.SCORE3, i.SCORE4];
            const sum3List = [i.SCORE5, i.SCORE6, i.SCORE7];
            const sum4List = [i.SCORE8, i.SCORE9, i.SCORE10];
            const sum5List = [i.SCORE11, i.SCORE12, i.SCORE13];
            const sum6List = [i.SCORE14, i.SCORE15, i.SCORE16];
            const sum7List = [i.SCORE17, i.SCORE18];
            const [ sum1, sum2, sum3, sum4, sum5, sum6, sum7 ] = 
            [ calculateAverage(sum1List), calculateAverage(sum2List), calculateAverage(sum3List), calculateAverage(sum4List), calculateAverage(sum5List), calculateAverage(sum6List), calculateAverage(sum7List) ]
            avgs = {
              sum1, sum2, sum3, sum4, sum5, sum6, sum7
            }
          }


          return {
              ...i, 
              keyword0  : _keyword[0].text,
              keyword1  : _keyword[1].text,
              keyword2  : _keyword[2].text,
              ...avgs
          }

        })
      }

    }
});
