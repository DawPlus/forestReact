import React from "react";
import { useDispatch } from "react-redux";
import { actions} from "store/reducers/programReducer";
import { Grid} from '@mui/material';
import {  Input} from "ui-component/inputs";

const AmountInputForm = ({ data, index , type}) => {
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        dispatch(actions.setArrTargetChange({
            target: type === "expense" ? "expenseList" : "customList",
            index,
            name,
            value,
        }));
    };
    
    const { TITLE, EXPENSE_PRICE, EXPENSE_DETAIL, EXPENSE_NOTE } = data;

    return (
        <>
            <Grid container spacing={1}alignItems="center" sm={6} style={{marginTop : "10px"}}>
                <Grid item sm="2">
                    <div style={{textAlign:"center"}}>
                    {TITLE}
                    </div>
                </Grid>
                <Grid item sm="3">
                    <Input name="EXPENSE_PRICE"  value={EXPENSE_PRICE} label="금액" size="small" onChange={onChangeHandler}/>
                </Grid>
                <Grid item sm="4">
                    <Input name="EXPENSE_DETAIL"  value={EXPENSE_DETAIL} label="세부내역" size="small" onChange={onChangeHandler}/>
                </Grid>
                <Grid item sm="3">
                    <Input name="EXPENSE_NOTE"  value={EXPENSE_NOTE} label="비고" size="small" onChange={onChangeHandler}/>
                </Grid>
            </Grid>
        </>
    );
};

export default React.memo(AmountInputForm);
