import React  from "react";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {Grid, Button, Typography} from '@mui/material';
import { DatePicker, Input, Select, CheckBox , MultiSelect} from "ui-component/inputs";

import ProgramList from "./containers/programList"
import DefaultInfos from "./containers/defaultinfos"
import PersonInfos from "./containers/personInfos"

import { styled } from '@mui/material/styles';
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px",
    marginBottom: "-10px"
  }));

const InsertOperateResult = ()=>{
  
  
  return(<>
      <MainCard title="Sample Card">
        {/* 기본정보 */}
        <DefaultInfos/>

        {/* 참여인력 정보 */}
        <PersonInfos/>
        

        {/* 프로그램목록 */}
        <ProgramList/>
      
        <Grid container spacing={2} style={{marginTop : "5px"}}>
          <Grid item xs={12}>
            <Div style={{  padding: "22px 0px 0px 8px"}}>객실</Div>
          </Grid>
          <Grid item  xs={3} >
            <Input name="title" label="참여자인원" type="number"/>
          </Grid>
          <Grid item  xs={3}>
            <Input name="title" label="참여자객실" type="number"/>
          </Grid>
          <Grid item  xs={3} >
            <Input name="title" label="인솔자인원" type="number"/>
          </Grid>
          <Grid item  xs={3}>
            <Input name="title" label="인솔자객실" type="number"/>
          </Grid>
        
          <Grid item  xs={3} >
            <Input name="title" label="인솔자인원" type="number"/>
          </Grid>
          <Grid item  xs={3}>
            <Input name="title" label="인솔자객실" type="number"/>
          </Grid>

          <Grid item  xs={3} >
            <Input name="title" label="총인원-자동계산" value="123" readOnly={true}/>
          </Grid>
          <Grid item  xs={3}>
            <Input name="title" label="총객실-자동계산" type="number" value="2"  readOnly={true}/>
          </Grid>

      </Grid>
      {/* 식사 */}
      <Grid container spacing={2} style={{marginTop : "5px"}}>
          <Grid item xs={12}>
            <Div style={{  padding: "22px 0px 0px 8px"}}>식사</Div>
          </Grid>
          <Grid item  xs={3} >
            <Input name="title" label="식사" type="number"/>
          </Grid>
          <Grid item  xs={3}>
            <Input name="title" label="참여자인원" type="number"/>
          </Grid>
          <Grid item  xs={3} >
            <Input name="title" label="인솔자인원" type="number"/>
          </Grid>
          <Grid item  xs={3}>
            <Input name="title" label="기타인원" type="number"/>
          </Grid>
      </Grid>



      <Grid container spacing={2} style={{marginTop : "5px"}}>
          <Grid item xs={12}>
            <Input name="title" label="프로그램소감" multiline rows={4}/>
          </Grid>
          <Grid item xs={12}>
            <Input name="title" label="시설서비스 소감(식사포함)" multiline rows={4}/>
          </Grid>
          <Grid item xs={12}>
            <Input name="title" label="종합의견 및 불편사항" multiline rows={4}/>
          </Grid>
      </Grid>

        <Grid container spacing={2} style={{marginTop : "5px"}}>
          <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
              임시저장
            </Button>
            <Button variant="contained" color="primary" type="submit">
              등록
            </Button>
          </Grid>
        </Grid>
      
            {/*  TODO  */}
      </MainCard>

  </>)


}
export default InsertOperateResult


