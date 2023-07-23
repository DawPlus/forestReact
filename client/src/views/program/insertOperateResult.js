import React  from "react";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {Grid, Button,} from '@mui/material';


import ProgramList from "./containers/programList"
import DefaultInfos from "./containers/defaultinfos"
import PersonInfos from "./containers/personInfos"

import { styled } from '@mui/material/styles';

import RoomInfos from "./containers/roomInfos"
import MealInfos from "./containers/mealInfos"
import OpinionInfo from "./containers/opinionInfo"
import ExpenseAmount from "./containers/expenseAmount"


const InsertOperateResult = ()=>{
  
  
  return(<>
      
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
       



      

        <Grid container spacing={2} style={{marginTop : "5px"}}>
          <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
              임시저장
              {/*  PROGRESS_STATE: P */}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {/* PROGRESS_STATE : E */}
              등록
            </Button>
          </Grid>
        </Grid>
      
  </>)


}
export default InsertOperateResult


