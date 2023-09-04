import React , {useState }from "react";
import { IconButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import {  SelectItems } from "ui-component/inputs";
import { styled } from '@mui/material/styles';
import NumberInput from "ui-component/inputs/numberInput";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
import { makeStyles } from '@mui/styles';

import Swal from "sweetalert2";
import { useMemo } from "react";


const useStyles = makeStyles({
    tableContainer: {
        marginTop : "20px",
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


const ProgramListContainer = ()=>{
    // Classes 
    const classes = useStyles();
    const dispatch = useDispatch();

    const programList = useSelector(s=> getState(s).programList);
    const programMngList = useSelector(s=> getState(s).programMngList);
    const teacherMngList = useSelector(s=> getState(s).teacherMngList);
    
    
    const [pageInfo , setPageInfo] = useState(
        { programName : "", col1 : "", col2 : "", col3 : "", col4 : ""  }
    );

    const onAdd = ()=>{
        const isEmpty = Object.values(pageInfo).some(value => value === "");
        if(isEmpty){
            Swal.fire({ title : "확인", text : "프로그램 입력중 비어있는값이 있습니다."})
            return;
        }

        // if (programList.length >= 7) { 
        //     Swal.fire({
        //         icon: 'warning',
        //         title: '확인',
        //         text: "프로그램은 7개 까지만 추가 할 수 있습니다. ",
        //         });
        //     return;
        // }
        dispatch(actions.addArrTarget({
            target : "programList", 
            value : pageInfo,
        }));
        setPageInfo({programName : "", col1 : "", col2 : "", col3 : "", col4 : ""  })
    }

    const onRemove = (id) => ()=>{
        dispatch(actions.removeArrTarget({
            target : 'programList', 
            id
        }))
    }

    const onNumberChange = (name, value)=>{
        setPageInfo(s=> ({
            ...s, 
            [name] : value  
        }));
    }

    const programItems = useMemo(()=> {
        
        const list = programMngList.map(i=> i.bunya === pageInfo.col1 ? ({label : `${i.name} [${i.bunya}]`, value : i.name}) : null);
        return list.filter(i=> i);

    },[programMngList, pageInfo.col1]);
    const bunyaItem = useMemo(()=> programMngList.map(i=> ({label : `${i.bunya}`, value : i.bunya})),[programMngList]);
    const teacherItems = useMemo(()=> teacherMngList.map(i=> ({label : i.name , value : i.name})),[teacherMngList]);

    const onChangeProgram = (e)=>{
        setPageInfo(s=> ({
            ...s, 
            programName : e.target.value, 
        }))
    }

    const onChangeBunya = (e)=>{
        setPageInfo(s=> ({
            ...s, 
            col1 : e.target.value, 
        }))
    }
    const onChangeTeacher= (e)=>{
        setPageInfo(s=> ({
            ...s, 
            col2 : e.target.value
        }))
    }
    
    return(
        <>
            <Div alignItems="center">프로그램</Div>
            <Grid  container spacing={1} alignItems="center" justifyContent="flex-end">
                <Grid item  xs={2} >  
                    <SelectItems label="분야" value={pageInfo.col1} items={bunyaItem} onChange={onChangeBunya}/>
                </Grid>
                <Grid item  xs={2} >  
                    <SelectItems label="프로그램명" value={pageInfo.programName} items={programItems} onChange={onChangeProgram}/>
                </Grid>
                <Grid item  xs={2} >  
                    <SelectItems label="강사명" value={pageInfo.col2} items={teacherItems} onChange={onChangeTeacher}/>
                </Grid>
                <Grid item  xs={2} >  
                    <NumberInput name="col3" label="내부강사" value={pageInfo.col3} onChange={onNumberChange}/>
                </Grid>
                <Grid item  xs={2} >  
                    <NumberInput name="col4" label="외부강사" value={pageInfo.col4} onChange={onNumberChange}/>
                </Grid>
                <Grid item  xs={2} > 
                    <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="primary" startIcon={<AddIcon />}   onClick={onAdd}>
                            추가
                        </Button>
                    </div> 
                </Grid>
        
            </Grid>
            <TableContainer component={Paper}  className={classes.tableContainer}>
                <Table aria-label="simple table" size="small">
                <TableHead className={classes.tableHeader}>
                    <TableRow>
                        <TableCell  style={{ width: '20%' }} align="center">프로그램명</TableCell>
                        <TableCell  style={{ width: '20%' }} align="center">분야</TableCell>
                        <TableCell  style={{ width: '15%' }} align="center">강사명</TableCell>
                        <TableCell  style={{ width: '15%' }} align="center">내부강사</TableCell>
                        <TableCell  style={{ width: '15%' }}align="center">외부강사</TableCell>
                        <TableCell  style={{ width: '15%' }}align="center">삭제</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {programList.length === 0 && 
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell colSpan={5} align="center">등록된 항목이 없습니다.</TableCell>
                        </TableRow>
                        }
                        {programList.map((i, idx) => 
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={idx} >
                                <TableCell align="center">{i.programName}</TableCell>
                                <TableCell align="center">{i.col1}</TableCell>
                                <TableCell align="center">{i.col2}</TableCell>
                                <TableCell align="center">{i.col3}</TableCell>
                                <TableCell align="center">{i.col4}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" onClick={onRemove(i.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>



    );


}
export default ProgramListContainer;