import React  from "react";
import {Grid} from '@mui/material';
import {Input} from "ui-component/inputs";
import MainCard from "ui-component/cards/MainCard";
import MoneyTable from "../component/moneyTable"
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));

const ExpenseAmount = ()=>{

    const dispatch = useDispatch();


    const {expenseBasicInfo, expense1,expense2,expense3,expense4,
            expenseBasicInfo2, expense5,expense6,expense7,expense8
    } = useSelector(s=> getState(s));


    const onChangeBasic = index => (e)=>{
        dispatch(actions.setArrTargetChange({
            target  : "expenseBasicInfo",
            index, 
            name : e.target.name, 
            value : e.target.value
        }))
    }

    const onChangeBasic2 = index => (e)=>{
        dispatch(actions.setArrTargetChange({
            target  : "expenseBasicInfo2",
            index, 
            name : e.target.name, 
            value : e.target.value
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

           {/* 식사 */}
       
            
                <MainCard style={{marginTop : "20px"}}>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>예정금액-강사</Div>
                        </Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo[0].EXPENSE_PRICE} label="강사비"  onChange={onChangeBasic(0)}/></Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo[1].EXPENSE_PRICE} label="보조강사"  onChange={onChangeBasic(1)}/></Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo[2].EXPENSE_PRICE} label="교통비"  onChange={onChangeBasic(2)}/></Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo[3].EXPENSE_PRICE} label="식비"  onChange={onChangeBasic(3)}/></Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>집행금액-강사</Div>
                        </Grid>   
                        <Grid item sm={12}>
                            <MoneyTable data={expense1} title="강사비" type="강사집행강사비" onAdd={onAdd("expense1")} onDelete={onDelete('expense1')}/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={expense2} title="보조강사" type="강사집행보조강사비" onAdd={onAdd("expense2")} onDelete={onDelete('expense2')}/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={expense3} title="교통비" type="강사집행교통비" onAdd={onAdd("expense3")} onDelete={onDelete('expense3')}/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={expense4} title="식사비" type="강사집행식사비" onAdd={onAdd("expense4")} onDelete={onDelete('expense4')}/>
                        </Grid>
                    </Grid>
                </MainCard>
                <MainCard style={{marginTop : "20px"}}>
                <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>예정금액-참가자</Div>
                        </Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo2[0].EXPENSE_PRICE} label="숙박비"  onChange={onChangeBasic2(0)}/></Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo2[1].EXPENSE_PRICE} label="식사비"  onChange={onChangeBasic2(1)}/></Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo2[2].EXPENSE_PRICE} label="재료비"  onChange={onChangeBasic2(2)}/></Grid>
                        <Grid item sm={3}><Input name="EXPENSE_PRICE"  value={expenseBasicInfo2[3].EXPENSE_PRICE} label="예비비"  onChange={onChangeBasic2(3)}/></Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>집행금액-강사</Div>
                        </Grid>   
                        <Grid item sm={12}>
                            <MoneyTable data={expense5} title="숙박비" type="고객집행숙박비" onAdd={onAdd("expense5")} onDelete={onDelete('expense5')}/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={expense6} title="식사비" type="고객집행식사비" onAdd={onAdd("expense6")} onDelete={onDelete('expense6')}/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={expense7} title="재료비" type="고객집행재료비" onAdd={onAdd("expense7")} onDelete={onDelete('expense7')}/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={expense8} title="기타" type="고객집행기타비" onAdd={onAdd("expense8")} onDelete={onDelete('expense8')}/>
                        </Grid>
                    </Grid>
                </MainCard>
    </>);

}
export default ExpenseAmount;