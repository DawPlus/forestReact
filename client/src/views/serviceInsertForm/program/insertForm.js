import React ,{useCallback, useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import {getState, actions} from"store/reducers/serviceInsert/program"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DynamicTableHead from "ui-component/DynamicTableHead";
import DynamicTableRow from "../component/dynamicTableRow";
import { Grid } from "@mui/material";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';

import {   Select,   SelectItems,  NumberInput} from "ui-component/inputs";
const localeItems = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '미기재', '폐광지역'];
const jobItem = ["학생", "자영업", "서비스직", "판매영업직", "기능", "단순노무직", "고위공직/임직원", "임직원", "전문직", "일반사무직", "농림어업축산직", "주부", "무직", "기타", "미기재"]

const items =[
    {label : "성별", value : "SEX"},
    {label : "연령", value : "AGE"},
    {label : "거주지", value : "RESIDENCE"},
    {label : "직업", value : "JOB"},
]

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



    const [setType, setSetType] = useState("");
    const [values, setValues] = useState("");


    const onChangeSelectItem = e=>{
        setSetType(s =>e.target.value)
        setValues(v => "");
    }

    const onSetValue = ()=>{
        if(setType ===""){
            Swal.fire({ icon: 'warning', title: '확인', text: "일괄입력 항목을 선택해 주세요 ", })
            return;
        }
        if(values ===""){
            Swal.fire({ icon: 'warning', title: '확인', text: "일괄입력 값을 입력/선택해 주세요 ", })
            return;
        }
        dispatch(actions.setAllData({type : setType, value : values}))
    }


    return <>   
            
            <div style={{padding : "15px 5px"}}>
                <Grid container spacing={2}  direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item md={1}>
                        <IconButton color="primary" onClick={onAdd}>
                            <AddIcon color="primary" />
                        </IconButton>
                        <IconButton color="primary" onClick={removeRow} style={{margin : "0px 10px"}}>
                            <RemoveIcon color="primary" />
                        </IconButton>
                    </Grid>
                    <Grid item md={10}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2} >
                            <Grid item md={2}>
                                <SelectItems label="항목" value={setType} items={items} onChange={onChangeSelectItem}/>
                            </Grid>
                            {setType ===  "" ? null : 
                            <Grid item md={2}>
                                {
                                    {
                                        "SEX"  : <Select label="성별" value={values} options={["남", "여", "미기재"]} onChange={(e)=>setValues(e.target.value)}/>,
                                        "AGE"  : <NumberInput label="연령" value={values} onChange={(name, value)=>setValues(value)}/>,
                                        "RESIDENCE"  : <Select label="거주지" value={values} options={localeItems} onChange={(e)=>setValues(e.target.value)}/>,
                                        "JOB"  : <Select label="직업" value={values} options={jobItem} onChange={(e)=>setValues(e.target.value)}/>,
                                    }[setType]
                                }
                            </Grid>
                            }
                            <Grid item md={2}>
                                <Button variant="contained" size="small" color="secondary" onClick={onSetValue}>적용</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
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