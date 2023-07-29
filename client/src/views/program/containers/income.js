import React, {memo, useState} from "react";
import { IconButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NumberInput from "ui-component/inputs/numberInput";
import Input from "ui-component/inputs/input";
import { makeStyles } from '@mui/styles';
import Swal from "sweetalert2";
import Select from "ui-component/inputs/selectItems";

const items = [
    {value : "프로그램",      label : "프로그램"},
    {value : "숙박비",  label : "숙박비"},
    {value : "식사비",      label : "식사비"},
    {value : "재료비",      label : "재료비"},
    {value : "기타",      label : "기타"},
    {value : "할인율",      label : "할인율"},
]


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

// 수입금액 
const Incomes =memo(()=>{
     // Classes 
    const classes = useStyles();
    // dispatch
    const dispatch = useDispatch();
    // selector
    const income = useSelector(s=> getState(s).income);
    // page State
    const [pageInfo, setPageInfo] = useState({
        INCOME_TYPE : "",
        INCOME_PRICE : "",
        INCOME_DETAIL : "",
        INCOME_NOTE : "",
    })


    const onChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setPageInfo(s=>({
            ...s, 
            [name] : value
        }))
    }

    const onInputChange = (name, value)=>{
        setPageInfo(s=>({
            ...s, 
            [name] : value
        }))
    }

    const onAddClick = ()=>{
        
        

        const isEmpty =pageInfo.INCOME_TYPE === "할인율" ?  [pageInfo.INCOME_TYPE, pageInfo.INCOME_PRICE, pageInfo.INCOME_NOTE].includes(""):  Object.values(pageInfo).some(value => value === "");
        

        

        if(isEmpty){
            Swal.fire({ title : "확인", text : "비어있는값이 있습니다."})
            return;
        }

        dispatch(actions.addArrTarget({
            target : "income",
            value : pageInfo
        }))
        setPageInfo({
            INCOME_TYPE : "",
            INCOME_PRICE : "",
            INCOME_DETAIL : "",
            INCOME_NOTE : "",
        })
    }


    const onDeleteHandler= (id) => ()=>{
        dispatch(actions.removeArrTarget({
            target : "income", 
            id
        }));
    }
    

    return (<>

            <div style={{padding : "10px", width : "100%"}}>
                {/* <div style={{padding: "0px 0px 10px 8px" ,"fontSize": "15px"}}></div> */}
                <div style={{padding : "10px 0px "}}>
                <Grid container spacing={2}alignItems="center">
                    <Grid item sm={2}>
                        <Select name="INCOME_TYPE"  value={pageInfo.INCOME_TYPE} label="분류" items={items}size="small" onChange={onChange}/>
                    </Grid>
                    <Grid item sm={2}>
                        <NumberInput name="INCOME_PRICE"  value={pageInfo.INCOME_PRICE} label="금액" size="small" onChange={onInputChange}/>
                    </Grid>
                    {pageInfo.INCOME_TYPE === "할인율" ? 
                    <>
                    <Grid item sm={6}>
                        <Input name="INCOME_NOTE"  value={pageInfo.INCOME_NOTE} label="비고" size="small" onChange={onChange}/>
                    </Grid>
                    </> 
                    : 
                    <>
                        <Grid item sm={4}>
                            <Input name="INCOME_DETAIL"  value={pageInfo.INCOME_DETAIL} label="세부내역" size="small" onChange={onChange}/>
                        </Grid>
                        <Grid item sm={2}>
                            <Input name="INCOME_NOTE"  value={pageInfo.INCOME_NOTE} label="비고" size="small" onChange={onChange}/>
                        </Grid>
                    </>}
                    <Grid item sm={2}>
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
                            <TableCell  style={{ width: '7%' }} align="center">번호</TableCell>
                            <TableCell  style={{ width: '14%' }} align="center">분류</TableCell>
                            <TableCell  style={{ width: '14%' }} align="center">금액</TableCell>
                            <TableCell  style={{ width: '40%' }} align="center">세부내역</TableCell>
                            <TableCell  style={{ width: '20%' }}align="center">비고</TableCell>
                            <TableCell  style={{ width: '20%' }}align="center">삭제</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {income.length === 0 && 
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell colSpan={5} align="center">등록된 항목이 없습니다.</TableCell>
                            </TableRow>
                            }
                            {income.map((i, idx) => 
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={idx} >
                                    <TableCell align="center">{idx +1}</TableCell>
                                    <TableCell align="center">{i.INCOME_TYPE}</TableCell>
                                    <TableCell align="center">{i.INCOME_PRICE}</TableCell>
                                    <TableCell align="center">{i.INCOME_DETAIL}</TableCell>
                                    <TableCell align="center">{i.INCOME_NOTE}</TableCell>
                                    <TableCell align="center"><IconButton aria-label="delete" onClick={onDeleteHandler(i.id)}>
                                        <DeleteIcon />
                                            </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                            
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
    </>);

})
export default Incomes;