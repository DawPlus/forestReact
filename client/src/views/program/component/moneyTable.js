import React, {memo} from "react";
import { IconButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {  Input} from "ui-component/inputs";
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

const MoneyTable = (props)=>{
    const classes = useStyles();
    const {data, title} = props;
    
    const [pageInfo, setPageInfo] = React.useState({
        money : "", 
        detail : "", 
        etc : "", 
    })


    const onChange = (e)=>{
        console.log(e.target.name, e.target.value)
        setPageInfo(s=>({
            ...s, 
            [e.target.name] : e.target.value
        }))
    }

    const onAddClick = ()=>{
        console.log(pageInfo)
        setPageInfo({
            money : "", 
            detail : "", 
            etc : "", 
        })
    }

    return (<>
            <div style={{padding : "20px", width : "100%"}}>
                <div style={{padding: "0px 0px 10px 8px" ,"fontSize": "15px"}}>{title}</div>
                <div style={{padding : "10px 0px "}}>
                <Grid container spacing={2}alignItems="center" sm={12}>
                    <Grid item sm="3">
                        <Input name="money"  value={pageInfo.money} label="금액" size="small" onChange={onChange}/>
                    </Grid>
                    <Grid item sm="4">
                        <Input name="detail"  value={pageInfo.detail} label="세부내역" size="small" onChange={onChange}/>
                    </Grid>
                    <Grid item sm="3">
                        <Input name="etc"  value={pageInfo.etc} label="비고" size="small" onChange={onChange}/>
                    </Grid>
                    <Grid item sm="2">
                    <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} onClick={onAddClick}>
                        추가
                    </Button>
                    </Grid>
                </Grid>
                </div>
                <TableContainer component={Paper}  className={classes.tableContainer}>
                    <Table aria-label="simple table" size="small">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell  style={{ width: '10%' }} align="center">번호</TableCell>
                            <TableCell  style={{ width: '20%' }} align="center">금액</TableCell>
                            <TableCell  style={{ width: '50%' }} align="center">세부내역</TableCell>
                            <TableCell  style={{ width: '20%' }}align="center">비고</TableCell>
                            <TableCell  style={{ width: '10%' }}align="center">삭제</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell align="center">1</TableCell>
                                <TableCell align="center">1</TableCell>
                                <TableCell align="center">2ries</TableCell>
                                <TableCell align="center">2</TableCell>
                                <TableCell align="center"><IconButton aria-label="delete" onClick={()=>{}}>
                                    <DeleteIcon />
                                    </IconButton>
                                    </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
    </>)

}
export default memo(MoneyTable)