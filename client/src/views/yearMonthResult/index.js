import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/yearMonthResultReducer";
import { Grid } from "@mui/material";
import DatePicker from "ui-component/inputs/datePicker";
import ParticipationType  from "./participationType";
import ResidenceList  from "./residenceList";
import ProgramOverview  from "./programOverview";
import ProgramManage  from "./programManage";
import SerList  from "./serList";
import ProgramEffect  from "./programEffect";
import ExIncomeList  from "./exIncomeList";
const YearMonthResult = ()=>{

    const dispatch = useDispatch();

    const {openday , endday} = useSelector(s=> getState(s));


    useEffect(()=>{
        
    },[])


    const onSearch = ()=>{
        // 참가유형
        dispatch(actions.getPartTypeList({ openday, endday }));
        // 지역 목록
        dispatch(actions.getResidenceList({ openday, endday }));
        // 프로그램시행개요
        dispatch(actions.getAllPrograms({ openday, endday }));
        // 만족도
        dispatch(actions.programManage({ openday, endday }));
        // 시설서비스 만족도
        dispatch(actions.getSerList({ openday, endday }));
        // 효과성 분석
        dispatch(actions.getProgramEffect({ openday, endday }));
        // 수입지출
        dispatch(actions.getExIncomeList({ openday, endday }));
    }


    const onChange = (name, value)=>{
        dispatch(actions.setValue({
            key : name, 
            value,
        }))
    }

    return (<>
        <MainCard>
            <Grid container spacing={1} alignItems={"center"}  justifyContent="space-between">
                <Grid item  container sm={6} spacing={1} alignItems={"center"}  justifyContent="space-between">
                    <Grid item sm={6}>
                        <DatePicker value={openday} label="시작일자" name="openday" onChange={onChange}/>
                    </Grid>
                    <Grid item sm={6}>
                        <DatePicker value={endday} label="종료일자" name="endday" onChange={onChange}/>
                    </Grid>
                </Grid>
                <Grid item sm={1}>
                    <Button variant="contained" color="primary" onClick={onSearch}>조회</Button>
                </Grid>
            </Grid>
        </MainCard>
        <MainCard style={{marginTop : "10px", minHeight: "400px"}}>
            <ParticipationType/>
            <ResidenceList/>
            <ProgramOverview/>
            {/* 프로그램윤영 */}
            <ProgramManage/>
            {/* 시설만족도 */}
            <SerList/>
            {/* 효과성분석 */}
            <ProgramEffect/>
            {/* 수입지출 */}
            <ExIncomeList/>
        </MainCard>
    
    </>)
}
export default YearMonthResult;