import React  from "react";

import { IconButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';
import {  Input, Select,  MultiSelect, NumberInput} from "ui-component/inputs";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
import MainCard from "ui-component/cards/MainCard";
import MoneyTable from "../component/moneyTable"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    tableContainer: {
        borderRadius : "4px",
        border: '1px solid #cbcbcb',
      '& .MuiTableCell-root': {  // 모든 TableCell에 대한 스타일 적용
        fontSize: '12px',
      }
    },
    tableHeader: {
      backgroundColor: 'rgba(144, 238, 144, 0.3)',
    },
  });
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));
const ExpenseAmount = ()=>{

    const classes = useStyles();


    const onChange= ()=>{

    }

    return (<>

           {/* 식사 */}
        <Grid container spacing={2}>
                
            <Grid item xs={6} >
                <MainCard style={{marginTop : "20px"}}>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>예정금액-강사</Div>
                        </Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="강사비"  onChange={onChange}/></Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="보조강사"  onChange={onChange}/></Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="교통비"  onChange={onChange}/></Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="식비"  onChange={onChange}/></Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center"> 
                        <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>집행금액-강사</Div>
                        </Grid>   

                        <Grid item sm={12}>
                            <MoneyTable data={[]} title="강사비"/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={[]} title="보조강사"/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={[]} title="교통비"/>
                        </Grid>
                        <Grid item sm={12}>
                            <MoneyTable data={[]} title="식사비"/>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item  xs={6}>
                <MainCard style={{marginTop : "20px"}}>
                    <Grid container spacing={1} alignItems="center"> 
                    <Grid item xs={12}>
                            <Div style={{  padding: "22px 0px 0px 8px"}}>예정금액-참가자</Div>
                        </Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="강사비내용"  onChange={onChange}/></Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="보조강사내용"  onChange={onChange}/></Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="교통비내용"  onChange={onChange}/></Grid>
                        <Grid item sm={3}><Input name="PROGRAM_OPINION"  value={""} label="식비내용"  onChange={onChange}/></Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    
    
    
    </>);

}
export default ExpenseAmount;