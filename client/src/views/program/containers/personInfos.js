import React  from "react";

import {Grid} from '@mui/material';
import {  Input, Select,  MultiSelect} from "ui-component/inputs";
import { styled } from '@mui/material/styles';
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
  }));
  
const DefaultInfos = ()=>{
    return(
        <>  
            <Grid container spacing={2} style={{marginTop : "5px"}}>
                <Grid item xs={12}>
                    <Div style={{  padding: "22px 0px 0px 8px"}}>참여인원  (실인원  : 1명 / 실인원  : 1명)</Div>
                </Grid>
                <Grid item container xs={6} spacing={2} alignItems="center">
                    <Grid item  xs={6} >
                    <Input name="title" label="참여자남자" type="number"/>
                    </Grid>
                    <Grid item  xs={6}>
                    <Input name="title" label="참여자여자" type="number"/>
                    </Grid>
                </Grid>
            
                <Grid item container xs={6} spacing={2} alignItems="center">
                    <Grid item  xs={6} >
                    <Input name="title" label="인솔자남자" type="number"/>
                    </Grid>
                    <Grid item  xs={6}>
                    <Input name="title" label="인솔자여자" type="number"/>
                    </Grid>
                </Grid>

                <Grid item xs={12} >
                    <MultiSelect label="지원사항" options={["프로그램", "숙박", "식사", "해당없음"]}/>
                </Grid>
                    
                <Grid item container xs={12} spacing={2} alignItems="center">
                    <Grid item  xs={12} >  
                        <Select label="사업목적" name="test" options={["사회공헌", "수익사업"]}/>
                    </Grid>
                </Grid>
                
                <Grid item container xs={12} spacing={2} alignItems="center">
                
                    <Grid item  xs={6} >  
                        <Select label="참가자유형" name="test" options={["장애인", "가족", "저소득", "중독", "교직원", "폐광지역", "해당없음 "]}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="연령대" name="test" options={["아동", "청소년", "성인", "노인", "해당없음"]}/>
                    </Grid>
                </Grid>


                <Grid item container xs={12} spacing={2} alignItems="center">
                    
                    <Grid item  xs={6} >  
                        <Select label="수입구분" name="test" options={["녹색자금", "산림복지", "기타", "해당없음 "]}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="서비스유형" name="test" options={["산림교육", "산림치유", "행위중독치유", "행위중독예방", "힐링"]}/>
                    </Grid>
                </Grid>
                
                </Grid>
        </>



    );


}
export default DefaultInfos;