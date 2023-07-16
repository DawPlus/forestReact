import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
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
import {PrintSection } from "ui-component/printButton"

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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

    const onPrint = ()=>{
        window.print();
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
                <Grid item sm={2}>
                    <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="primary" onClick={onSearch} style={{margin : "0px 5px"}}>조회</Button>
                        <Button variant="contained" color="primary" onClick={onPrint}><PrintIcon /></Button>
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    
        <MainCard  id="print" style={{marginTop : "10px", minHeight: "400px"}}>
        <PrintSection>
            <div style={{textAlign :"right" , marginBottom : "15px"}}>
                <div style={{width : "250px", display:"inline-block"}}>
                    <TableContainer>
                        <Table className="sighLine">
                        <TableHead>
                            <TableRow >
                                <TableCell>담당</TableCell>
                                <TableCell>팀장</TableCell>
                                <TableCell>사무국장</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{textAlign:"center",     margin: "60px 0px 30px 0px"}}>
                <h1>하이힐링원 연·월 프로그램 실시 결과 보고</h1>
            </div>
            <div style={{textAlign: "right", fontSize: "12px"}}>
                {`기간 : ${openday} ~ ${endday}`}
            </div>
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
        </PrintSection>
        </MainCard>
    
    </>)
}
export default YearMonthResult;