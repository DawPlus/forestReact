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
        MEAL_TYPE,
        MEAL_PART,
        MEAL_LEAD,       
        MEAL_ETC 
    } = useSelector(s=> getState(s));


    const onNumberChange = (key ,value)=>{
            console.log(key ,value)
        dispatch(actions.setValue({
            key,
            value
        }))
    }

    const onChange = e=> {
        
        dispatch(actions.setValue({
            key : e.target.name,
            value : e.target.value
        }))
    }




    return(
        <>  
            
            {/* 식사 */}
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Div style={{  padding: "22px 0px 0px 8px"}}>식사</Div>
            </Grid>
            <Grid item  xs={6} >
                <NumberInput name="MEAL_TYPE" value={MEAL_TYPE} label="식사횟수" onChange={onNumberChange}/>
            </Grid>
            <Grid item  xs={6}>
                <NumberInput name="MEAL_PART" value={MEAL_PART}label="참여자인원" onChange={onNumberChange}/>
            </Grid>
            <Grid item  xs={6} >
                <NumberInput name="MEAL_LEAD" value={MEAL_LEAD} label="인솔자인원" onChange={onNumberChange}/>
            </Grid>
            <Grid item  xs={6}>
                <NumberInput name="MEAL_ETC" value={MEAL_ETC} label="기타인원" onChange={onNumberChange}/>
            </Grid>
        </Grid>
        </>



    );


}
export default DefaultInfos;