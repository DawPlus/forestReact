import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/yearMonthResultReducer";
import { Grid } from "@mui/material";
import DatePicker from "ui-component/inputs/datePicker";
import ParticipationType  from "./participationType";
const YearMonthResult = ()=>{

    const dispatch = useDispatch();

    const {openday , endday} = useSelector(s=> getState(s));


    useEffect(()=>{
        
    },[])


    const onSearch = ()=>{
        dispatch(actions.getPartTypeList({ openday, endday }));
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
        </MainCard>
    
    </>)
}
export default YearMonthResult;