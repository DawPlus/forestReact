import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/hrv"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";
import SetValue from "../component/setValue";


const InsertForm = ()=>{

    const dispatch = useDispatch();

    const fields = [ 
        {name : "ID", label: "ID"},
        {name : "NAME", label: "이름"},
        {name : "JUMIN", label: "주민등록번호(앞자리)", type : "jumin"},
        {name : "SEX", label: "성별", type : "select"},
        {name : "AGE", label: "연령", type : "age"},
        {name : "NUM1", label: "자율신경활성도"},
        {name : "NUM2", label: "자율신경균형도"},
        {name : "NUM3", label: "스트레스저항도"},
        {name : "NUM4", label: "스트레스지수"},
        {name : "NUM5", label: "피로도지수"},
        {name : "NUM6", label: "평균심박동수"},
        {name : "NUM7", label: "심장안정도"},
        {name : "NUM8", label: "이상심박동수"},
    ];
    const headerInfo = [
        ['선택','ID', '이름', '주민등록번호', '성별', '연령', '자율신경활성도', '자율신경균형도', '스트레스저항도', '스트레스지수', '피로도지수', '평균심박동수', '심장안정도', '이상심박동수'],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ]
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
        const selectedRowIds = rows.filter(i => i.chk).map(({ idx, HRV_SEQ }) => ({idx, HRV_SEQ}));
        dispatch(actions.removeRow(selectedRowIds));
    }, [dispatch, rows]);

    const onCheckChange = useCallback((idx) => (e) => {
        dispatch(actions.changeValue({ index: idx, key: "chk", value: e.target.checked }));
    }, [dispatch]);



    const onSetValue = (e)=>{
        dispatch(actions.setAllData(e));
    }

    const getUserTemp= (value)=>{
        const [agency, openday] = value.split("/")
        dispatch(actions.getUserTemp({agency, openday}))
    }


    return <>   
            <SetValue onAdd={onAdd} onRemove={removeRow} onSetData={onSetValue} getUserTemp={getUserTemp}/>
            <TableContainer style={{minHeight: "560px" , paddingBottom : "50px" }}>
                <Table className="insertForm custom-table">
                    <DynamicTableHead headerInfo={headerInfo} />
                    <DynamicTableRow rows={rows} fields={fields}id="idx" onCheckChange={onCheckChange} onChange={onChange} />
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;