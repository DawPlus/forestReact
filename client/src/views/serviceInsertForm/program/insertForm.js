import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/program"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";

const InsertForm = ()=>{

    const dispatch = useDispatch();

    const fields = [ 
        { type: 'select', label: '성별', name: 'SEX'},
        { label: '연령', name: 'AGE'},
        { type: 'select', label: '거주지', name: 'RESIDENCE'},
        { type: 'select', label: '직업', name: 'JOB'},
        { type: 'select', label: '참여구분', name: 'TYPE'},
        { label: '강사(문항1)', name: 'SCORE1'},
        { label: '강사(문항2)', name: 'SCORE2'},
        { label: '강사(문항3)', name: 'SCORE3'},
        { label: '구성/품질(문항4)', name: 'SCORE4'},
        { label: '구성/품질(문항5)', name: 'SCORE5'},
        { label: '구성/품질(문항6)', name: 'SCORE6'},
        { label: '효과성(문항7)', name: 'SCORE7'},
        { label: '효과성(문항8)', name: 'SCORE8'},
        { label: '효과성(문항9)', name: 'SCORE9'},
        { label: '기타의견', name: 'ETC_OPINION'}
    ];


    const headerInfo = [
        [ '선택', '성별', '연령', '거주지', '직업', '참여구분', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성', '기타의견'],
        [ '','', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '' ]
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
        const selectedRowIds = rows.filter(i => i.chk).map(({ id, PROGRAM_SEQ }) => ({id, PROGRAM_SEQ}));
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