import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/service"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";
import SetValue from "../component/setValue";


// 제가 원한건 만족도의 경우 1-5점, 효과성의 경우 0-6점 사이의 숫자만 입력되게 해달라는 것이었습니다. 
// 모든 숫자가 입력되게 하니 오타로 인해 44, 55 이렇게 입력이 되는 경우가 발생하더라구요

const InsertForm = ()=>{

    const dispatch = useDispatch();

    const fields =[
        {name : 'SEX', label:"성별", type : "select"},
        {name : 'AGE', label:"연령" , type : "age"},
        {name : 'RESIDENCE', label:"거주지", type : "select"},
        {name : 'JOB', label:"직업", type : "select"},
        {name : 'SCORE1', label:"숙소(문항1)", type : "sNumber" },
        {name : 'SCORE2', label:"숙소(문항2)", type : "sNumber" },
        {name : 'SCORE3', label:"식당(문항3)", type : "sNumber" },
        {name : 'SCORE4', label:"식당(문항4)", type : "sNumber" },
        {name : 'SCORE5', label:"프로그램장소(문항5)", type : "sNumber"},
        {name : 'SCORE6', label:"프로그램장소(문항6)", type : "sNumber"},
        {name : 'SCORE7', label:"프로그램장소(문항7)", type : "sNumber"},
        {name : 'SCORE8', label:"야외(문항8)" , type : "sNumber"},
        {name : 'SCORE9', label:"야외(문항9)" , type : "sNumber"},
        {name : 'SCORE10', label:"야외(문항10)" , type : "sNumber"},
     //   {name : 'FACILITY_OPINION', label:"기타의견" },
        {name : 'SCORE11', label:"운영(문항1)" , type : "sNumber"},
        {name : 'SCORE12', label:"운영(문항2)" , type : "sNumber"},
        {name : 'SCORE13', label:"운영(문항3)" , type : "sNumber"},
        {name : 'SCORE14', label:"식사(문항4)" , type : "sNumber"},
        {name : 'SCORE15', label:"식사(문항5)" , type : "sNumber"},
        {name : 'SCORE16', label:"식사(문항6)" , type : "sNumber"},
       // {name : 'OPERATION_OPINION', label:"기타의견" },
        {name : 'SCORE17', label:"잠재적 관광수요(문항8)", type : "sNumber" },
        {name : 'SCORE18', label:"잠재적 관광수요(문항9)", type : "sNumber" }
    ];

    
    const headerInfo = [
        ['선택', '성별', '연령', '거주지', '직업', '숙소', '숙소', '식당', '식당', '프로그램 장소', '프로그램 장소', '프로그램 장소', '야외', '야외', '야외', '운영', '운영', '운영', '식사', '식사', '식사', '잠재적 관광수요','잠재적 관광수요'],
        ['', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10',  '문항1', '문항2', '문항3', '문항4', '문항5', '문항6',  '문항8','문항9']        
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
        const selectedRowIds = rows.filter(i => i.chk).map(({ idx, SERVICE_SEQ }) => ({idx, SERVICE_SEQ}));
        dispatch(actions.removeRow(selectedRowIds));
    }, [dispatch, rows]);

    const onCheckChange = useCallback((idx) => (e) => {
        dispatch(actions.changeValue({ index: idx, key: "chk", value: e.target.checked }));
    }, [dispatch]);



    const setData = (e)=>{
        dispatch(actions.setAllData(e))
    }

    const getUserTemp= (value)=>{
        const [agency, openday] = value.split("/")
        dispatch(actions.getUserTemp({agency, openday}))
    }

    return <>   
            <SetValue onAdd={onAdd} onRemove={removeRow} onSetData={setData} getUserTemp={getUserTemp}/>
            
            <TableContainer style={{minHeight: "560px" , paddingBottom : "50px" }}>
                <Table className="insertForm custom-table">
                    <DynamicTableHead headerInfo={headerInfo} />
                    <DynamicTableRow rows={rows} fields={fields} onCheckChange={onCheckChange} onChange={onChange} id="idx" />
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;