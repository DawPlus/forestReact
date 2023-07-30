import React ,{memo} from "react";
import {Grid} from '@mui/material';
// import {Input} from "ui-component/inputs";
import MainCard from "ui-component/cards/MainCard";
import MoneyTable from "../component/moneyTable"
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "ui-component/inputs/numberInput";
import AmountInputForm  from "../component/amountInpuForm";
import { getState , actions} from "store/reducers/programReducer";
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));

const ExpenseAmount = ()=>{

    const dispatch = useDispatch();

       // const mealState = useSelector(s => ({
    //     MEAL_TYPE: s.MEAL_TYPE,
    //     MEAL_PART: s.MEAL_PART,
    // }));
    // // 이후 컴포넌트에서는 mealState.MEAL_TYPE, mealState.MEAL_PART를 사용합니다.
    
    
    const expenseBasicInfo= useSelector(s=> getState(s).expenseBasicInfo);
    const expenseList= useSelector(s=> getState(s).expenseList);
    const customBasicInfo= useSelector(s=> getState(s).customBasicInfo);
    const customList= useSelector(s=> getState(s).customList);



    const onChangeBasic = index => (name, value)=>{
        dispatch(actions.setArrTargetChange({
            target  : "expenseBasicInfo",
            index, 
            name, 
            value
        }))
    }


    const onChangeBasic2 = index => (name, value)=>{
        dispatch(actions.setArrTargetChange({
            target  : "customBasicInfo",
            index, 
            name, 
            value
        }))
    }

    // Row 추가 
    const onAdd= target => (value)=>{
        dispatch(actions.addArrTarget({
            target, 
            value
        }))
    }

    const onDelete = target => (id)=>{
        dispatch(actions.removeArrTarget({
            target, 
            id
        }))
    }

    
    return (<>
                <MainCard style={{marginTop : "20px"}}>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>예정금액-강사(단위:천원)</Div>
                        </Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={expenseBasicInfo[0].EXPENSE_PRICE} label="강사비"  onChange={onChangeBasic(0)}/></Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={expenseBasicInfo[1].EXPENSE_PRICE} label="보조강사"  onChange={onChangeBasic(1)}/></Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={expenseBasicInfo[2].EXPENSE_PRICE} label="교통비"  onChange={onChangeBasic(2)}/></Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={expenseBasicInfo[3].EXPENSE_PRICE} label="식비"  onChange={onChangeBasic(3)}/></Grid>
                        
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>집행금액-강사(단위:천원)</Div>
                        </Grid>
                        {expenseList.map((i, idx)=>
                            <AmountInputForm key={idx} data={i} index={idx} type="expense" />
                        )}
                        
                    </Grid>
                        <MoneyTable data={expenseList} onAdd={onAdd("expenseList")} onDelete={onDelete('expenseList')} type="expense"/>
                </MainCard>
                <MainCard style={{marginTop : "20px"}}>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>예정금액-참가자(단위:천원)</Div>
                        </Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={customBasicInfo[0].EXPENSE_PRICE} label="숙박비"  onChange={onChangeBasic2(0)}/></Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={customBasicInfo[1].EXPENSE_PRICE} label="식사비"  onChange={onChangeBasic2(1)}/></Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={customBasicInfo[2].EXPENSE_PRICE} label="재료비"  onChange={onChangeBasic2(2)}/></Grid>
                        <Grid item sm={3}><NumberInput name="EXPENSE_PRICE"  value={customBasicInfo[3].EXPENSE_PRICE} label="예비비"  onChange={onChangeBasic2(3)}/></Grid>
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>집행금액-참가자(단위:천원)</Div>
                        </Grid>
                        {customList.map((i, idx)=>
                            <AmountInputForm key={idx} data={i} index={idx} />
                        )}
                    </Grid>
                        <MoneyTable data={customList} onAdd={onAdd("customList")} onDelete={onDelete('customList')}/>
                </MainCard>
    </>);

}
export default memo(ExpenseAmount);