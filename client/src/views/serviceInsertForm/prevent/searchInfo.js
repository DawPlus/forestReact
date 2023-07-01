import React from "react";
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState, actions } from "store/reducers/serviceInsert/prevent";
import {  Input, Select, DatePicker} from "ui-component/inputs";

const SearchInfo = ()=>{


    const dispatch = useDispatch();

    const { 
        OPENDAY, //시작일자
        AGENCY, // 기관명
        EVAL_DATE, // 실시일자
        PTCPROGRAM, //참여프로그램
        PV, // 시점 (사전은 시작으로 변경됨)
    
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
    const item2 =['사전', '중간', '종결']
    



    return <>
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={2}>
                <Input  label="기관명" value={AGENCY} name="AGENCY" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <DatePicker  value={OPENDAY} onChange={onDateChange} label="시작일자" name="OPENDAY" />
            </Grid>
            <Grid item sm={2}>
                <DatePicker label="실시일자" value={EVAL_DATE} onChange={onDateChange} name="EVAL_DATE"/>
            </Grid>
            <Grid item sm={2}>
                <Select options={item}label="참여프로그램"value={PTCPROGRAM} name="PTCPROGRAM" onChange={onChange} />
            </Grid>
            <Grid item sm={2}>
                <Select options={item2}label="시점"value={PV} name="PV" onChange={onChange} />
            </Grid>
        </Grid>
        
    </>

}
export default SearchInfo;