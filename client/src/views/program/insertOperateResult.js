import React  ,{useState} from "react";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {Grid, Button,} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";

import ProgramList from "./containers/programList"
import DefaultInfos from "./containers/defaultinfos"
import PersonInfos from "./containers/personInfos"


import RoomInfos from "./containers/roomInfos"
import MealInfos from "./containers/mealInfos"
import OpinionInfo from "./containers/opinionInfo"
import ExpenseAmount from "./containers/expenseAmount"
import Income from "./containers/income"
import BtnArea from "./containers/btnArea"
import Select from "ui-component/inputs/selectItems";

const InsertOperateResult = ()=>{

  const dispatch= useDispatch();

  const tempList = useSelector(s=> getState(s).tempList);

  const [tempValue, setTempValue] = useState("");

  React.useEffect(()=>{
    dispatch(actions.getTempList())

    return ()=>{
      dispatch(actions.initState())
    }
  },[])


  // 임시저장 불러오기 
  const getTempData = () =>{
    dispatch(actions.getTempData({seq : tempValue}))
  }



  return(<>
        <Grid   container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Grid item md={2}>
            <Select items={tempList} onChange={e=>{ setTempValue(e.target.value) }} value={tempValue}/>
          </Grid>
          <Grid item md={4}>
            <Button variant="contained" color="secondary"  onClick={getTempData}>
              임시저장불러오기
            </Button>
          </Grid>
          <Grid item md={8}></Grid>
        </Grid>
      
        
        <Grid container spacing={2}>
          <Grid item sm={6}>
            {/* 기본정보 */}
            <MainCard>
              <DefaultInfos/>
            </MainCard>
          </Grid>
          <Grid item sm={6}>
            {/* 참여인력 정보 */}
            <MainCard>
            <PersonInfos/>
            </MainCard>
          </Grid>
        </Grid>
      

      {/* 프로그램목록 */}
      <MainCard style={{marginTop : "20px"}}>
        <ProgramList/>
      </MainCard>
    
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <MainCard style={{marginTop : "20px"}}>
              {/* 객실 */}
              <RoomInfos/>
            </MainCard>
          </Grid>
          <Grid item sm={6}>
            <MainCard style={{marginTop : "20px"}}>
              {/* 식사 */}
              <MealInfos/>    
            </MainCard>
          </Grid>
        </Grid>
        
        <MainCard style={{marginTop : "20px"}}>
          <OpinionInfo/>
        </MainCard>

        {/* 지출금액 */}
        <ExpenseAmount/>

        {/* 수입금액 */}
        <MainCard style={{marginTop : "20px"}}>
          <Income/>
        </MainCard>



      
        <BtnArea/>
  </>)


}
export default InsertOperateResult


