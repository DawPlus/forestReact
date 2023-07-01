import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/vibra"
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
        {name : "ID", label: "ID"},
        {name : "NAME", label: "이름"},
        {name : "JUMIN", label: "주민등록번호"},
        {name : "SEX", label: "성별"},
        {name : "AGE", label: "연령"},
        {name : "NUM1", label: "적극공격성"},
        {name : "NUM2", label: "스트레스"},
        {name : "NUM3", label: "불안"},
        {name : "NUM4", label: "의심"},
        {name : "NUM5", label: "밸런스"},
        {name : "NUM6", label: "카리스마"},
        {name : "NUM7", label: "에너지"},
        {name : "NUM8", label: "자기조절"},
        {name : "NUM9", label: "억제"},
        {name : "NUM10", label: "신경증"},
    ];
    const headerInfo = [
        ['선택','ID', '이름', '주민등록번호', '성별', '연령', '적극공격성', '스트레스', '불안', '의심', '밸런스', '카리스마', '에너지', '자기조절', '억제','신경증'],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', ]
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
        const selectedRowIds = rows.filter(i => i.chk).map(({ id, VIBRA_SEQ }) => ({id, VIBRA_SEQ}));
        dispatch(actions.removeRow(selectedRowIds));
    }, [dispatch, rows]);

    const onCheckChange = useCallback((idx) => (e) => {
        dispatch(actions.changeValue({ index: idx, key: "chk", value: e.target.checked }));
    }, [dispatch]);




    return <>   
            <div style={{padding : "15px 5px"}}>
                <button onClick={()=>{
                    dispatch(actions.setTest())
                }}> 테스트</button>
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