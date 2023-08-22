import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/counsel"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";
import SetValue from "../component/setValue";

const InsertForm = ()=>{

    const dispatch = useDispatch();

    const data = [ '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '문항11', '문항12', '문항13', '문항14', '문항15', '문항16', '문항17', '문항18', '문항19', '문항20', '문항21', '문항22', '문항23', '문항24', '문항25', '문항26', '문항27', '문항28', '문항29', '문항30', '문항31', '문항32', '문항33', '문항34', '문항35', '문항36', '문항37', '문항38', '문항39', '문항40', '문항41', '문항42', '문항43', '문항44', '문항45', '문항46', '문항47', '문항48', '문항49', '문항50', '문항51', '문항52', '문항53', '문항54', '문항55', '문항56', '문항57', '문항58', '문항59', '문항60', '문항61', '문항62'].map((i, idx)=> ({ label : i, name : 'SCORE'+(idx+1)}))
    const fields = [ 
        { label: '이름', name: 'NAME'},
        { label: '성별', name: 'SEX'},
        { label: '연령', name: 'AGE', type:"age"},
        { label: '거주지', name: 'RESIDENCE'},
        { label: '직업', name: 'JOB'},
        { label: '과거상담/치유서비스경험', name: 'PAST_STRESS_EXPERIENCE'},
        ...data
    ];


    const headerInfo = [
        [ '선택','이름', '성별', '연령', '거주지', '직업', '과거상담/치유서비스 경험', 
        '변화동기', '변화동기', '신뢰(라포)', '신뢰(라포)', '신뢰(라포)', '서비스이해', '서비스이해', '조절실패', '조절실패', '조절실패', '현저성', '현저성', '현저성', '문제적결과', '문제적결과', '문제적결과', '문제적결과', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '부정정서', '부정정서', '부정정서', '편향된신념', '편향된신념', '편향된신념', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '대인관계기술부족', '대인관계기술부족', '대인관계기술부족', '대인민감성', '대인민감성', '대인민감성', '대인민감성', '관계/유능욕구충족', '관계/유능욕구충족', '긍정정서', '긍정정서', '긍정정서', '삶의만족', '삶의만족', '삶의만족', '자기이해', '자기이해', '자기이해', '자기이해', '자기수용', '자기수용', '자기수용', '마음관리기술/기회', '마음관리기술/기회', '마음관리기술/기회', '스마트폰활용역량', '스마트폰활용역량', ],
        [ '','', '', '', '', '', '',
        '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '문항11', '문항12', '문항13', '문항14', '문항15', '문항16', '문항17', '문항18', '문항19', '문항20', '문항21', '문항22', '문항23', '문항24', '문항25', '문항26', '문항27', '문항28', '문항29', '문항30', '문항31', '문항32', '문항33', '문항34', '문항35', '문항36', '문항37', '문항38', '문항39', '문항40', '문항41', '문항42', '문항43', '문항44', '문항45', '문항46', '문항47', '문항48', '문항49', '문항50', '문항51', '문항52', '문항53', '문항54', '문항55', '문항56', '문항57', '문항58', '문항59', '문항60', '문항61', '문항62',
        ],
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
        const selectedRowIds = rows.filter(i => i.chk).map(({ id, COUNSEL_SEQ }) => ({id, COUNSEL_SEQ}));
        dispatch(actions.removeRow(selectedRowIds));
    }, [dispatch, rows]);

    const onCheckChange = useCallback((idx) => (e) => {
        dispatch(actions.changeValue({ index: idx, key: "chk", value: e.target.checked }));
    }, [dispatch]);




    const onSetValue = (e)=>{
        dispatch(actions.setAllData(e));
    }

    const getUserTemp= (agency)=>{
        dispatch(actions.getUserTemp({agency}))
    }



    return <>   
            <SetValue onAdd={onAdd} onRemove={removeRow} onSetData={onSetValue} getUserTemp={getUserTemp}/>
            <TableContainer style={{minHeight: "560px" , paddingBottom : "50px" }}>
                <Table className="insertForm custom-table">
                    <DynamicTableHead headerInfo={headerInfo} />
                    <DynamicTableRow rows={rows} fields={fields} onCheckChange={onCheckChange} onChange={onChange} />
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;