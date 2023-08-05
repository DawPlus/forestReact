import React from "react";
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState, actions } from "store/reducers/serviceInsert/program";
import {  Input, Select, DatePicker} from "ui-component/inputs";

const SearchInfo = ()=>{


    const dispatch = useDispatch();

    const { 
        OPENDAY,
        AGENCY,
        EVAL_DATE,
        PTCPROGRAM,
        PROGRAM_NAME,
        TEACHER,
        PLACE,
        BUNYA,
    } = useSelector(s=> getState(s).searchInfo);


    const onChange = (e)=>{
        dispatch(actions.setSearchInfo({
            key : e.target.name, 
            value : e.target.value
        }))        
    }

    const onDateChange = (key, value)=>{
        dispatch(actions.setSearchInfo({ key, value }))
    }

    const item = [ "당일형", "1박2일형", "2박3일형", ]
    const item2 = [ '산림교육', '예방교육', '산림치유', '아트', '릴렉싱', '에너제틱', '쿠킹', '이벤트' ]


    return <>
        <Grid container spacing={2} alignItems={"center"} style={{marginBottom : "15px"}}>
            <Grid item sm={2}>
                <DatePicker  value={OPENDAY} onChange={onDateChange} label="시작일자" name="OPENDAY" />
            </Grid>
            <Grid item sm={2}>
                <DatePicker label="실시일자" value={EVAL_DATE} onChange={onDateChange} name="EVAL_DATE"/>
            </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={2}>
                <Input  label="기관명" value={AGENCY} name="AGENCY" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Input  label="프로그램명" value={PROGRAM_NAME} name="PROGRAM_NAME" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Select options={item}label="참여프로그램"value={PTCPROGRAM} name="PTCPROGRAM" onChange={onChange} />
            </Grid>
            <Grid item sm={2}>
                <Input  label="강사명" value={TEACHER} name="TEACHER" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Input  label="장소" value={PLACE} name="PLACE" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Select options={item2}label="분야"value={BUNYA} name="BUNYA" onChange={onChange} />
            </Grid>
        </Grid>
        
    </>

}
export default SearchInfo;