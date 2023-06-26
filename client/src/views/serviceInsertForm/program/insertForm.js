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
const HeaderCell = React.memo(({ name }) => {
    return <TableCell align="center">{name}</TableCell>;
});


const TableRowComponent = React.memo(({ row, idx, onCheckChange, onChange }) => {

    const sexItem=[
        {label  :"남", value : "남"},
        {label  :"여", value : "여"},
        {label  :"미기재", value : "미기재"},
    ]

    const locationItem=[
        {label : "서울", value : "서울"},
        {label : "부산", value : "부산"},
        {label : "대구", value : "대구"},
        {label : "인천", value : "인천"},
        {label : "광주", value : "광주"},
        {label : "대전", value : "대전"},
        {label : "울산", value : "울산"},
        {label : "세종", value : "세종"},
        {label : "경기", value : "경기"},
        {label : "강원", value : "강원"},
        {label : "충북", value : "충북"},
        {label : "충남", value : "충남"},
        {label : "전북", value : "전북"},
        {label : "전남", value : "전남"},
        {label : "경북", value : "경북"},
        {label : "경남", value : "경남"},
        {label : "제주", value : "제주"},
        {label : "미기재", value : "미기재"}
    ]

    const jobItem=[
        {label : "학생", value : "학생"},
        {label : "자영업", value : "자영업"},
        {label : "서비스직", value : "서비스직"},
        {label : "판매영업직", value : "판매영업직"},
        {label : "기능", value : "기능"},
        {label : "단순노무직", value : "단순노무직"},
        {label : "고위공직/임직원", value : "고위공직/임직원"},
        {label : "임직원", value : "임직원"},
        {label : "전문직", value : "전문직"},
        {label : "일반사무직", value : "일반사무직"},
        {label : "농림어업축산직", value : "농림어업축산직"},
        {label : "주부", value : "주부"},
        {label : "무직", value : "무직"},
        {label : "기타", value : "기타"},
        {label : "미기재", value : "미기재"},
        
        
    ]


    return (
        <TableRow key={row.id}>
            <TableCell>
                {idx > 0 ?
                <div style={{textAlign:"center"}}>
                    <Checkbox checked={row.chk} value="" name="chk" onChange={onCheckChange(idx)}/>
                </div>
                : <></>}
            </TableCell>
            <TableCell>
                <Select items={sexItem}label="성별"value={row.SEX} name="SEX" onChange={onChange(idx)} style={{minWidth: "100px"}}/>
            </TableCell>
            <TableCell>
                <TextField size="small" label="연령" value={row.AGE} name="AGE" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <Select items={locationItem}label="거주지"value={row.RESIDENCE} name="RESIDENCE" onChange={onChange(idx)} style={{minWidth: "100px"}}/>
            </TableCell>
            <TableCell>
                <Select items={jobItem}label="직업"value={row.JOB} name="JOB" onChange={onChange(idx)} style={{minWidth: "100px"}}/>
            </TableCell>
            <TableCell>
                <TextField size="small" label="숙소(문항1)" value={row.SCORE1} name="SCORE1" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="숙소(문항2)" value={row.SCORE2} name="SCORE2" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="식당(문항3)" value={row.SCORE3} name="SCORE3" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="식당(문항4)" value={row.SCORE4} name="SCORE4" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="프로그램장소(문항5)" value={row.SCORE5} name="SCORE5" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="프로그램장소(문항6)" value={row.SCORE6} name="SCORE6" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="프로그램장소(문항7)" value={row.SCORE7} name="SCORE7" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="야외(문항8)" value={row.SCORE8} name="SCORE8" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="야외(문항9)" value={row.SCORE9} name="SCORE9" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="야외(문항10)" value={row.SCORE10} name="SCORE10" onChange={onChange(idx)}/> 
            </TableCell>
            <TableCell>
                <TextField size="small" label="기타의견" value={row.FACILITY_OPINION} name="FACILITY_OPINION" onChange={onChange(idx)}/> 
            </TableCell>

        

    </TableRow>
    );
});



const InsertForm = ()=>{

    const dispatch = useDispatch();



    const headerInfo = [
        [ '선택', '성별', '연령', '거주지', '직업', '참여구분', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성(문항9)', '기타의견'],
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
                    <TableBody style={{minHeight:"500px"}}>
                    {rows.map((row, idx) => (
                        <TableRowComponent
                            key={row.id}
                            row={row}
                            idx={idx}
                            onCheckChange={onCheckChange}
                            onChange={onChange}
                        />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </>

}
export default InsertForm;