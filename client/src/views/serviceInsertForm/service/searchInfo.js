import React from "react";
// material-ui
import { Grid } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { getState, actions } from "store/reducers/serviceInsert/service";
import {  Input, Select, DatePicker} from "ui-component/inputs";

const SearchInfo = ()=>{


    const dispatch = useDispatch();

    const { AGENCY , OPENDAY , EVAL_DATE, PTCPROGRAM } = useSelector(s=> getState(s).searchInfo);


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

    return <>
        <Grid container spacing={1} alignItems={"center"}>
            <Grid item sm={2}>
                <Input  label="기관명" value={AGENCY} name="AGENCY" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Select options={item}label="참여프로그램"value={PTCPROGRAM} name="PTCPROGRAM" onChange={onChange} />
            </Grid>
            <Grid item sm={2} style={{zIndex:2}}>
                <DatePicker  value={OPENDAY} onChange={onDateChange} label="시작일자" name="OPENDAY" />
            </Grid>
            <Grid item sm={2}>
                <DatePicker label="실시일자" value={EVAL_DATE} onChange={onDateChange} name="EVAL_DATE"/>
            </Grid>
        </Grid>
        
    </>

}
export default SearchInfo;