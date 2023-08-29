import React from "react";
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState, actions } from "store/reducers/serviceInsert/counsel";
import {  Input, Select, DatePicker} from "ui-component/inputs";

const SearchInfo = ()=>{


    const dispatch = useDispatch();

    const { 
        OPENDAY, //시작일자
        AGENCY, // 기관명
        EVAL_DATE, // 실시일자
        COUNSEL_CONTENTS , // 콘텐츠 종류 
        PV, // 시점 (사전은 시작으로 변경됨)
        SESSION1 , // 회기 시점
        SESSION2 , // 회기 시점
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

    const item =['게임', '도박', 'SNS', '성인물', '웹툰/웹소설', '기타동영상', '기타',]
    const item2 =['사전','중간','종결']
    



    return <>
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={2}>
                <DatePicker  value={OPENDAY} onChange={onDateChange} label="시작일자" name="OPENDAY" />
            </Grid>
            <Grid item sm={2}>
                <DatePicker label="실시일자" value={EVAL_DATE} onChange={onDateChange} name="EVAL_DATE"/>
            </Grid>
            <Grid item sm={8}></Grid>
            <Grid item sm={2}>
                <Input  label="기관명" value={AGENCY} name="AGENCY" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Select options={item}label="콘텐츠종류"value={COUNSEL_CONTENTS} name="COUNSEL_CONTENTS" onChange={onChange} />
            </Grid>
            <Grid item sm={2}>
                <Grid container spacing={1} alignItems={"center"}>
                    <Grid item sm={5}>
                        <Input  label="회기1" value={SESSION1} name="SESSION1" onChange={onChange}/> 
                    </Grid>
                    <Grid item sm={1}>
                        /
                    </Grid>
                    <Grid item sm={5}>
                        <Input  label="회기2" value={SESSION2} name="SESSION2" onChange={onChange}/> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={2}>
                <Select options={item2}label="시점"value={PV} name="PV" onChange={onChange} />
            </Grid>
        </Grid>
        
    </>

}
export default SearchInfo;