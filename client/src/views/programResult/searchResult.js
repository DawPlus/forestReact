import React from "react";
import MainCard from 'ui-component/cards/MainCard';

import Select from "ui-component/select";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import {  useDispatch, useSelector } from "react-redux";
import {actions,  getState} from "store/reducers/programResultReducer"
import Button from '@mui/material/Button';

import ProgramResult from "./programResult"
import FacilityResult from "./facilityResult"

const SearchResult = ()=>{

    const dispatch = useDispatch();

    const {searchInfo} = useSelector(s=> getState(s).searchResult);

    const {effect, keyword} = searchInfo;

    const effectItems = [
        {label : "프로그램 만족도", value : "program"},
        {label : "시설서비스 환경 만족도", value : "facility"},
        {label : "상담&치유 서비스", value : "counseling"},
        {label : "예방 서비스", value : "prevent"},
        {label : "힐링 서비스", value : "healing"},
    ]


    const keywordItem = [
        { value : "X" , label : "해당없음"},
        { value : "AGENCY" , label : "기관명"},
        { value : "SEX" , label : "성별"},
        { value : "AGE" , label : "연령(만)"},
        { value : "REGIDENCE" , label : "거주지"},
        { value : "JOB" , label : "직업"},
        { value : "OPENDAY" , label : "시작일자"},
        { value : "PLACE" , label : "장소"},
        { value : "TEACHER" , label : "강사"},
        { value : "PROGRAM_NAME" , label : "프로그램이름"},
        { value : "BUNYA" , label : "분야"},
    ]

    const onChangeHandler = (e)=>{
        dispatch(actions.onChangeSearchResult({
            key : "searchInfo", 
            value : { 
                ...searchInfo, 
                [e.target.name] : e.target.value
            }
        }));
    }

    const onChangeKeyword = index => e =>{
        dispatch(actions.onChangeSearchKeyword({
            index, 
            key : e.target.name, 
            value : e.target.value
        }));       
    }

    const onSearch = ()=>{
        dispatch(actions.getSearchResult(searchInfo))
    }

    return <>
            <MainCard>
                <Grid container  alignItems="center" spacing={1}>
                    <Grid item sm={9}>
                        <Select value={effect} label="입력양식" name="effect" items={effectItems}onChange={onChangeHandler}/>
                    </Grid>
                    <Grid item sm={3}>
                        <div style={{textAlign: "right"}}>
                            <Button variant="contained" color="primary" onClick={onSearch} >조회</Button>
                        </div>
                    </Grid>
                    <Grid item sm={12}></Grid>
                    {keyword.map((i, idx)=> 
                        <Grid item sm={4} key={idx}>
                            <Grid container  alignItems="center" spacing={1}>
                                <Grid item sm={6}>
                                    <Select minWidth="50" value={i.type} label={`주제어${idx+1}`} name="type" items={keywordItem} onChange={onChangeKeyword(idx)}/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField label="주제어" name="text" value={i.text} size="small" onChange={onChangeKeyword(idx)} variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>            
            </MainCard>
            <MainCard style={{marginTop : "10px"}}>
                {/* <ProgramResult/> */}
                <FacilityResult/>
            </MainCard>
    </>


}
export default SearchResult;