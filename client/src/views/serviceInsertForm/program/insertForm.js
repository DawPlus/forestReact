import React ,{useCallback }from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/program"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";
import SetValue from "../component/setValue";

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import TableBody from '@mui/material/TableBody';

import DynamicField from "../component/dynamicField"; 
import { v4 } from "uuid";

const InsertForm = ()=>{

    const dispatch = useDispatch();

    const fields = [ 
        { type: 'select', label: '성별', name: 'SEX'},
        { label: '연령', name: 'AGE', type : "age"},
        { type: 'select', label: '거주지', name: 'RESIDENCE'},
        { type: 'select', label: '직업', name: 'JOB'},
        { type: 'select', label: '참여구분', name: 'TYPE'},
        { label: '강사(문항1)', name: 'SCORE1', type:"sNumber"},
        { label: '강사(문항2)', name: 'SCORE2', type:"sNumber"},
        { label: '강사(문항3)', name: 'SCORE3', type:"sNumber"},
        { label: '구성/품질(문항4)', name: 'SCORE4', type:"sNumber"},
        { label: '구성/품질(문항5)', name: 'SCORE5', type:"sNumber"},
        { label: '구성/품질(문항6)', name: 'SCORE6', type:"sNumber"},
        { label: '효과성(문항7)', name: 'SCORE7', type:"sNumber"},
        { label: '효과성(문항8)', name: 'SCORE8', type:"sNumber"},
        { label: '효과성(문항9)', name: 'SCORE9', type:"sNumber"},
    //    { label: '기타의견', name: 'ETC_OPINION'}
    ];


    const headerInfo = [
        [ '선택', '성별', '연령', '거주지', '직업', '참여구분', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성' ],
        [ '','', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9'  ]
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
                    <TableBody style={{minHeight:"500px"}}>
                        {rows.map((row, idx) => 
                        <TableRow key={v4()}>
                            {idx > 0 ? (
                            <TableCell style={{ textAlign: "center" }}>
                                <Checkbox checked={row.chk} value="" name="chk" onChange={onCheckChange(idx)} />
                            </TableCell>
                            ) :    
                            <TableCell style={{ textAlign: "center" }}></TableCell>}
                            {fields.map((field) => {
                                
                              //  console.log(field)
                                if(field.name ==="SCORE9" && row["TYPE"] === "인솔자"){
                                    
                                    return null;
                                }


                                return <DynamicField key={field.name} type={field.type} label={field.label} name={field.name} onChange={onChange} value={row[field.name]} idx={idx} />
                            })}
                        </TableRow>
                    )}
                    </TableBody>
                    {/* <DynamicTableRow rows={rows} fields={fields} onCheckChange={onCheckChange} onChange={onChange} /> */}
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;