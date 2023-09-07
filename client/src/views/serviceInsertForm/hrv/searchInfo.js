import React from "react";
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState, actions } from "store/reducers/serviceInsert/hrv";
import {  Input, Select, DatePicker} from "ui-component/inputs";

const SearchInfo = ()=>{


    const dispatch = useDispatch();

    const { 
        
        AGENCY, // 기관명
        DATE, // 실시일자
       // EQUIPMENT , // 측정기구
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


    const item2 =['사전', '사후']
    



    return <>
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={2}>
                <DatePicker label="실시일자" value={DATE} onChange={onDateChange} name="DATE"/>
            </Grid>
            <Grid item sm={2}>
                <Input  label="기관명" value={AGENCY} name="AGENCY" onChange={onChange}/> 
            </Grid>
            {/* <Grid item sm={2}>
            <Input  label="측정기구" value={EQUIPMENT} name="EQUIPMENT" onChange={onChange}/> 
            </Grid> */}
            <Grid item sm={2}>
                <Select options={item2}label="시점"value={PV} name="PV" onChange={onChange} />
            </Grid>
        </Grid>
        
    </>

}
export default SearchInfo;