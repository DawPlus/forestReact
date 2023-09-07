import React ,{useCallback}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/healing"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";
import SetValue from "../component/setValue";

const InsertForm = ()=>{

    const dispatch = useDispatch();

   
    
    const headerInfo = [
        ['선택', '이름', '성별', '연령', '거주지', '직업', '스트레스해소 및 힐링 서비스 경험', 
            '욕구충족',
            '욕구충족',
            '긍정정서',
            '긍정정서',
            '긍정정서',
            '자기이해',
            '자기이해',
            '자기이해',
            '자기이해',
            '마음관리기술',
            '마음관리기술',
            '마음관리기술',
            '정서능력측면',
            '정서능력측면',
            '정서능력측면',
            '정서능력측면',
            '영성측면',
            '영성측면',
            '영성측면',
            '삶의조망측면',
            '삶의조망측면',
            '삶의조망측면',
        ],
        [ '', '', '', '', '', '', '',
            '문항1',
            '문항2',
            '문항3',
            '문항4',
            '문항5',
            '문항6',
            '문항7',
            '문항8',
            '문항9',
            '문항10',
            '문항11',
            '문항12',
            '문항13',
            '문항14',
            '문항15',
            '문항16',
            '문항17',
            '문항18',
            '문항19',
            '문항20',
            '문항21',
            '문항22'
        ],
    ]


    const data = [ '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '문항11', '문항12', '문항13', '문항14', '문항15', '문항16', '문항17', '문항18', '문항19', '문항20', '문항21', '문항22'].map((i, idx)=> ({ label : i, name : 'SCORE'+(idx+1), type : "eNumber"}))
    const fields = [ 
        { label: '이름', name: 'NAME'},
        { label: '성별', name: 'SEX', type : "select"},
        { label: '연령', name: 'AGE', type :"age"},
        { label: '거주지', name: 'RESIDENCE', type : "select"},
        { label: '직업', name: 'JOB', type : "select"},
        { label: '스트레스해소 및 힐링 서비스 경험', name: 'PAST_STRESS_EXPERIENCE'},
        ...data
    ];
    const { rows} = useSelector(s=> getState(s));

    const onChange = useCallback((idx) => (e) => {
        const { name, value } = e.target;
        dispatch(actions.changeValue({ index: idx, key: name, value }));
    }, [dispatch]);

    const onAdd = useCallback(() => {
        dispatch(actions.addRow());
    }, [dispatch]);

    const removeRow = useCallback(() => {
        const selectedRowIds = rows.filter(i => i.chk).map(({ id, HEALING_SEQ }) => ({id, HEALING_SEQ}));
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
                    <DynamicTableRow rows={rows} fields={fields} onCheckChange={onCheckChange} onChange={onChange} />
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;