import React  from "react";

import {Grid} from '@mui/material';
import {  Input, Select,  MultiSelect, NumberInput} from "ui-component/inputs";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));
const DefaultInfos = ()=>{

    const dispatch =useDispatch();
    const {
        ROOM_PART_PEOPLE,
        ROOM_PART_ROOM,
        ROOM_LEAD_PEOPLE,
        ROOM_LEAD_ROOM,
        ROOM_ETC_PEOPLE,
        ROOM_ETC_ROOM,
        SERVICE_TYPE,
    } = useSelector(s=> getState(s));



    const onChange = e=> {
        
        dispatch(actions.setValue({
            key : e.target.name,
            value : e.target.value
        }))
    }

    const onSupportChange = (e)=>{
        dispatch(actions.setValue({
            key :"SUPPORT",
            value : e.join(",")
        }))
    }


    const onNumberChange = (key ,value)=>{
        
        dispatch(actions.setValue({
            key,
            value
        }))
    }
    const totalPeople = (ROOM_PART_PEOPLE || 0) + (ROOM_LEAD_PEOPLE || 0) + (ROOM_ETC_PEOPLE || 0);
    const totalRoom = (ROOM_PART_ROOM || 0) + (ROOM_LEAD_ROOM || 0) + (ROOM_ETC_ROOM || 0);
    return(
        <> 
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12}>
                    <Div style={{  padding: "22px 0px 0px 8px"}}>{`객실 (총인원 : ${totalPeople} / 총객실 : ${totalRoom})`}</Div>
                </Grid>
                <Grid container item alignItems={"center"} spacing={2}>
                        <Grid item  xs={2}>
                            <div style={{textAlign:"center"}}>
                            참여자
                            </div>
                        </Grid>
                        <Grid item  xs={5}>
                            <NumberInput name="ROOM_PART_PEOPLE" value={ROOM_PART_PEOPLE} label="인원" onChange={onNumberChange}/>
                        </Grid>
                        <Grid item  xs={5}>
                            <NumberInput name="ROOM_PART_ROOM" value={ROOM_PART_ROOM} label="객실" onChange={onNumberChange}/>
                        </Grid>
                </Grid>
                <Grid container item alignItems={"center"} spacing={2}>
                        <Grid item  xs={2}>
                            <div style={{textAlign:"center"}}>
                                인솔자
                            </div>
                        </Grid>
                        <Grid item  xs={5}>
                            <NumberInput name="ROOM_LEAD_PEOPLE" value={ROOM_LEAD_PEOPLE} label="인원" onChange={onNumberChange}/>
                        </Grid>
                        <Grid item  xs={5}>
                            <NumberInput name="ROOM_LEAD_ROOM" value={ROOM_LEAD_ROOM} label="객실" onChange={onNumberChange}/>
                        </Grid>
                </Grid>
                <Grid container item alignItems={"center"} spacing={2}>
                        <Grid item  xs={2}>
                            <div style={{textAlign:"center"}}>
                                기타
                            </div>
                        </Grid>
                        <Grid item  xs={5}>
                            <NumberInput name="ROOM_ETC_PEOPLE" value={ROOM_ETC_PEOPLE} label="인원" onChange={onNumberChange}/>
                        </Grid>
                        <Grid item  xs={5}>
                            <NumberInput name="ROOM_ETC_ROOM" value={ROOM_ETC_ROOM} label="객실" onChange={onNumberChange}/>
                        </Grid>
                </Grid>
            </Grid>
        </>



    );


}
export default DefaultInfos;