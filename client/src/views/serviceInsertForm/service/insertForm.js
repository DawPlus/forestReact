import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/service"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import Select from "ui-component/select"

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";




const InsertForm = ()=>{

    const dispatch = useDispatch();

    const fields =[
        {name : 'SEX', label:"성별", type : "select"},
        {name : 'AGE', label:"연령" },
        {name : 'RESIDENCE', label:"거주지", type : "select"},
        {name : 'JOB', label:"직업", type : "select"},
        {name : 'SCORE1', label:"숙소(문항1)" },
        {name : 'SCORE2', label:"숙소(문항2)" },
        {name : 'SCORE3', label:"식당(문항3)" },
        {name : 'SCORE4', label:"식당(문항4)" },
        {name : 'SCORE5', label:"프로그램장소(문항5)" },
        {name : 'SCORE6', label:"프로그램장소(문항6)" },
        {name : 'SCORE7', label:"프로그램장소(문항7)" },
        {name : 'SCORE8', label:"야외(문항8)" },
        {name : 'SCORE9', label:"야외(문항9)" },
        {name : 'SCORE10', label:"야외(문항10)" },
        {name : 'FACILITY_OPINION', label:"기타의견" },
        {name : 'SCORE11', label:"운영(문항1)" },
        {name : 'SCORE12', label:"운영(문항2)" },
        {name : 'SCORE13', label:"운영(문항3)" },
        {name : 'SCORE14', label:"식사(문항4)" },
        {name : 'SCORE15', label:"식사(문항5)" },
        {name : 'SCORE16', label:"식사(문항6)" },
        {name : 'OPERATION_OPINION', label:"기타의견" },
        {name : 'SCORE17', label:"잠재적 관광수요(문항8)" },
        {name : 'SCORE18', label:"잠재적 관광수요(문항9)" }
    ];

    
    const headerInfo = [
        ['선택', '성별', '연령', '거주지', '직업', '숙소', '숙소', '식당', '식당', '프로그램 장소', '프로그램 장소', '프로그램 장소', '야외', '야외', '야외', '기타의견', '운영', '운영', '운영', '식사', '식사', '식사', '기타의견', '잠재적 관광수요','잠재적 관광수요'],
        ['', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '', '문항8','문항9']        
    ]
    const { rows} = useSelector(s=> getState(s));

    const onChange = useCallback((idx) => (e) => {
        const { name, value } = e.target;
        dispatch(actions.changeValue({ index: idx, key: name, value }));
    }, [dispatch]);

    const onAdd = useCallback(() => {
        dispatch(actions.addRow());
    }, [dispatch]);

    const removeRow = useCallback(() => {
        const selectedRowIds = rows.filter(i => i.chk).map(({ id, SERVICE_SEQ }) => ({id, SERVICE_SEQ}));
        dispatch(actions.removeRow(selectedRowIds));
    }, [dispatch, rows]);

    const onCheckChange = useCallback((idx) => (e) => {
        dispatch(actions.changeValue({ index: idx, key: "chk", value: e.target.checked }));
    }, [dispatch]);
    return <>   
            <div style={{padding : "15px 5px"}}>
            <IconButton color="primary" onClick={onAdd}>
                <AddIcon color="primary" />
            </IconButton>
            <IconButton color="primary" onClick={removeRow} style={{margin : "0px 10px"}}>
                <RemoveIcon color="primary" />
            </IconButton>
            </div>
            <TableContainer style={{minHeight: "560px" , paddingBottom : "50px" }}>
                <Table className="insertForm custom-table">
                    <DynamicTableHead headerInfo={headerInfo} />
                    <DynamicTableRow rows={rows} fields={fields} onCheckChange={onCheckChange} onChange={onChange} />
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;