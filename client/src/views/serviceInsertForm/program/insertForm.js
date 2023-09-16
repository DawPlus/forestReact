import React ,{useCallback }from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/program"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import DynamicTableHead from "ui-component/DynamicTableHead";
// import DynamicTableRow from "../component/dynamicTableRow";
import SetValue from "../component/setValue";
import TableBody from '@mui/material/TableBody';
import { v4 } from "uuid";
import Fields from "./fields";





const headerInfo = [
    [ '선택', '성별', '연령', '거주지', '직업', '참여구분', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성' ],
    [ '','', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9'  ]
]

const InsertForm = ()=>{

    const dispatch = useDispatch();

    const rows = useSelector(s=> getState(s).rows);


    const onAdd = useCallback(() => {
        dispatch(actions.addRow());
    }, []);

    const removeRow = () => {
        const selectedRowIds = rows.filter(i => i.chk).map(({ id, PROGRAM_SEQ }) => ({id, PROGRAM_SEQ}));
        dispatch(actions.removeRow(selectedRowIds));
    };




    const onSetValue = useCallback((e)=>{
        dispatch(actions.setAllData(e));
    },[])

    const getUserTemp= useCallback((value)=>{
        const [agency, openday] = value.split("/")
        dispatch(actions.getUserTemp({agency, openday}))
    },[])

    const id = React.useMemo( ()=>v4(),[])
    return <>   
            <SetValue onAdd={onAdd} onRemove={removeRow} onSetData={onSetValue} getUserTemp={getUserTemp}/>
            <TableContainer style={{minHeight: "560px" , paddingBottom : "50px" }}>
                <Table className="insertForm custom-table">
                    <DynamicTableHead headerInfo={headerInfo} />
                    <TableBody style={{minHeight:"500px"}}>
                        {rows.map((row, idx) => <Fields row={row} idx={idx} key={`${id}-${idx}`}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;