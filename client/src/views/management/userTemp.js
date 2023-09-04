import React, {useEffect, useState} from "react";
import api from "api/management"
import { Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/managementReducer"
import MainCard from 'ui-component/cards/MainCard';


import Swal from "sweetalert2";

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import DatePicker from "ui-component/inputs/datePicker";
import {  Input, SelectItems, NumberInput} from "ui-component/inputs";

import UserInfo from "./userinfos";

const sexItems = [
    {label  :"남", value : "남"},
    {label  :"여", value : "여"},
    {label  :"미기재", value : "미기재"},
]
const residenceItems = [
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
const jobItem = [
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
const UserTemp = ()=>{
    
    
    const dispatch = useDispatch();

    const userTemp = useSelector(s=> getState(s).userTemp)
    const userTempAgency = useSelector(s=> getState(s).userTempAgency)

    
    useEffect(()=>{
        dispatch(actions.getUserTempAgency());
        return ()=>{
            dispatch(actions.initState())
        }
    },[])




    const onSave = ()=>{

        if(!agency){
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: `기관명을 입력해 주십시오?` ,
            })
            return;
        }


        Swal.fire({
            icon: 'warning',
            title: '등록하시겠습니까?',
            text: `사용자 정보를 입력하시겠습니까?` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.createUserTemp({data : userTemp, agency, openday}).then(r=> {
                    dispatch(actions.getUserTemp());
                })
                
            } 
        })
        

    }

    const onNumberChange = index => (key, value)=>{
        dispatch(actions.onChangeUserTemp({ index, key, value }))
    }

    const onChange= index =>  e=> {
        const key = e.target.name;
        const value = e.target.value;        
        dispatch(actions.onChangeUserTemp({ index, key, value }))
    }   
    // 추가 
    const onAdd = ()=>{
        dispatch(actions.onUserTempAddRow())
    }
    // 삭제
    const removeRow = (d)=>{
        if(userTemp.length ===1){
            Swal.fire({ icon: 'warning', title: '삭제확인', text: `모든 Row를 삭제할수 없습니다.` , confirmButtonText: '확인', })
            return;
        }
        dispatch(actions.onUserTempRemoveRow(d))
    }

    const setRowData = ()=>{
        Swal.fire({
            icon: 'warning',
            title: '정보수정',
            text: `첫번째행의 정보로 업데이트 됩니다. ` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                dispatch(actions.setUserTempData());
                
            } 
        })
    }



    const [agency , setAgency] = useState("");
    const [openday, setOpenday] = useState("");
    
    const [agencySelect, setAgencySelect] = useState("");
    const [opendaySelect , setOpendaySelect] = useState("");

    const onChangeAgency= (e)=>{
        const value = e.target.value;
        setAgencySelect(a => value);
    }


    const agencyItem = userTempAgency.map(i=> ({label : i.agency, value : i.agency}));


    const onSearch = ()=>{
        setAgency(a=> agencySelect);
        setOpenday(a=> opendaySelect);
        
        if([agencySelect, opendaySelect].includes("")){
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: `[기관, 시작일] 을 선택해 주십시오` ,
                confirmButtonText: '확인',
            });
            return;
        }


        dispatch(actions.getUserTemp({agency: agencySelect, openday: opendaySelect}))




    }

    return (<>
            <MainCard>
                <Grid container spacing={2} justifyItems={"center"} alignItems="center">
                    <Grid item md={4}>
                        <SelectItems items={agencyItem} label="기관선택" value={agencySelect} name="agency" onChange={onChangeAgency}/>
                    </Grid>
                    <Grid item md={4}>
                        <DatePicker label="시작일"name="openday" value={opendaySelect} onChange={(_, value)=>setOpendaySelect(value)}/>
                    </Grid>
                    <Grid item md={4}>
                        <Button variant="contained" size="small" color="primary" onClick={onSearch} >조회</Button>
                    </Grid>
                
                </Grid>

            </MainCard>
            <MainCard style={{marginTop : "5px"}}>
                <div style={{padding : "15px 5px"}}>
                    <Button variant="contained" size="small" color="primary" onClick={onAdd} style={{marginRight:"10px"}}>추가</Button>
                    <Button variant="contained" size="small" color="primary" onClick={setRowData} style={{marginRight:"10px"}}>첫번째행 정보 모두적용</Button>
                    <Button variant="contained" size="small" color="primary" onClick={onSave}>저장</Button>
                </div>
                <div style={{margin:"10px 0px"}}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <Input label="기관명" value={agency} name="agency" onChange={(e)=>setAgency(e.target.value)} /> 
                        </Grid>
                        <Grid item md={3}>
                            <DatePicker label="시작일"name="openday" value={openday} onChange={(_, value)=>setOpenday(value)}/>
                        </Grid>
                    </Grid>
                    
                </div>
                <TableContainer style={{minHeight: "560px" , paddingBottom : "50px" }}>
                    <Table className="insertForm custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-header" align="center">ID</TableCell>
                                <TableCell className="table-header" align="center">이름</TableCell>
                                <TableCell className="table-header" align="center">성별</TableCell>
                                <TableCell className="table-header" align="center">연령</TableCell>
                                <TableCell className="table-header" align="center">거주지</TableCell>
                                <TableCell className="table-header" align="center">직업</TableCell>
                                <TableCell className="table-header" align="center">주민번호</TableCell>
                                <TableCell className="table-header" align="center">삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        
                        {userTemp.map((i, index)=>
                            <UserInfo key={i.idx} data={i} index={index} onChange={onChange} onNumberChange={onNumberChange} removeRow={removeRow}/>
                            // <TableRow key={i.idx}>
                            //     <TableCell >
                            //         <Input label="ID" value={i.id} name="id" onChange={onChange(index)}/> 
                            //     </TableCell>
                            //     <TableCell >
                            //         <Input label="이름" value={i.name} name="name" onChange={onChange(index)}/> 
                            //     </TableCell>
                            //     <TableCell >
                            //         <SelectItems items={sexItems} label="성별" value={i.sex} name="sex" onChange={onChange(index)}/>
                            //     </TableCell>
                            //     <TableCell >
                            //         <NumberInput label="연령" value={i.age} name="age" onChange={onNumberChange(index)}/> 
                            //     </TableCell>
                            //     <TableCell >
                            //         <SelectItems items={residenceItems} label="거주지" value={i.residence} name="residence" onChange={onChange(index)}/>
                            //     </TableCell>
                            //     <TableCell >
                            //         <SelectItems items={jobItem} label="직업" value={i.job} name="job" onChange={onChange(index)}/>
                            //     </TableCell>
                            //     <TableCell >
                            //         <NumberInput label="주민번호앞자리" value={i.jumin} maxLength={6} name="jumin" onChange={onNumberChange(index)}/> 
                            //     </TableCell>
                            //     <TableCell align="center">
                            //         <Button variant="contained" size="small" color="primary" onClick={()=>removeRow(i.idx)}>삭제</Button>
                            //     </TableCell>
                            // </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
            
    </>)


}
export default UserTemp;