import React, {useEffect} from "react";
import api from "api/management"
import {Grid, Button, IconButton} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/managementReducer"
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from 'ui-component/dataGrid';
import {  Input, Select  } from "ui-component/inputs";
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';

const items = ["예방교육", "산림교육", "산림치유", "아트", "릴렉싱", "에너제틱", "쿠킹", "이벤트"];

const ProgramMng = ()=>{

    const dispatch = useDispatch();


    const {rows, newInfo, updateInfo} = useSelector(s=> getState(s).programMng)

    const {
        name, 
        bunya, 
        teacher,
    } = newInfo;
    useEffect(()=>{
        dispatch(actions.getProgramMngList());
        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const onDetail = (data)=>{
        const program_seq = data[0] 
        const name = data[1] 
        const bunya = data[2] 
        const teacher = data[3];
        
        dispatch(actions.setProgramUpdateInfo({
            program_seq, name, bunya, teacher
        }))
    }

    
    const columns = [
        { name : "program_seq", label : "" , options:{filter: false, display: false}},
        { name : "name", label : "프로그램명"},
        { name : "bunya", label : "분야"},
        { name : "teacher", label : "강사"},
        { name : "create_user", label : "생성자"},
        { name : "create_dtm", label : "생성일자", options:{filter: false}},
        { name : "update_dtm", label : "수정일자", options:{filter: false}},
        { name : "update_user", label : "수정자" ,options:{filter: false, display: false}},
        { name: "수정", label: "선택", 
            options: {
            filter : false,
            customBodyRender: (_, tableMeta, _u) => {
                const data = tableMeta.rowData;
                return ( 
                    <IconButton color="primary" onClick={()=> onDetail(data)}>
                            <EditIcon />
                    </IconButton>
                    );
            },
            },
        },
    
    ];


    const onChange= e=> {
        const key = e.target.name;
        const value = e.target.value;        
        dispatch(actions.onChangeProgramMngInfo({ target : "newInfo", key, value }))
    }   

    const onUpdateChange= e=> {
        const key = e.target.name;
        const value = e.target.value;        
        dispatch(actions.onChangeProgramMngInfo({ target : "updateInfo", key, value }))
    }   

    const onSave = ()=>{
        if([name, bunya, teacher].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: "입력값을 확인해 주십시오", })
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '등록하시겠습니까?',
            text: ` 프로그램명 의 중복여부를 꼭 확인해 주세요!` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.createProgramMng({data : {...newInfo}}).then(r=> {
                    dispatch(actions.getProgramMngList())

                })
                
            } 
        })
        

    }

    const onUpdate = ()=>{
        if([updateInfo.name, updateInfo.bunya, updateInfo.teacher].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: "입력값을 확인해 주십시오", })
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '수정하시겠습니까?',
            text: ` 프로그램명 의 중복여부를 꼭 확인해 주세요!` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.createProgramMng({data : {...updateInfo}}).then(r=> {
                    dispatch(actions.getProgramMngList())

                })
                
            } 
        })
    }

    // 삭제
    const onDelete = ()=>{
        if([updateInfo.program_seq].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: "삭제할 프로그램을 선택해주세요", })
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '삭제하시겠습니까?',
            text: ` 프로그램명 이 삭제됩니다. ` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.deleteProgramMng({seq : updateInfo.program_seq}).then(r=> {
                    dispatch(actions.getProgramMngList())

                })
                
            } 
        })
    }

    return (<>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <MainCard>
                        <h3 className="tableTitle" style={{paddingLeft : "5px"}}>신규등록</h3>
                        <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                            <Grid item md={4}>
                                <Input name="name" label="프로그램명"  value={name} onChange={onChange}/>  
                            </Grid>
                            <Grid item md={2}>
                                <Select label="분야" name="bunya" options={items} value={bunya} onChange={onChange}/>
                            </Grid>
                            <Grid item md={2}>
                                <Input name="teacher" label="강사"  value={teacher} onChange={onChange}/>  
                            </Grid>
                            <Grid item md={4}>
                                <Button variant="contained" color="primary" type="submit" onClick={onSave} style={{marginRight : "10px"}}>
                                    등록
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item md={12}>
                    <Grid container spacing={2} direction="row" justifyContent="flex-start" >
                            <Grid item md={8}>
                                <MainCard>
                                    <DataGrid  data={rows} columns={columns} />
                                </MainCard>
                            </Grid>
                            <Grid item md={4}>
                                <MainCard>
                                    <h3 className="tableTitle" style={{paddingLeft : "5px", paddingBottom : "5px"}}>수정</h3>
                                    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                                        <Grid item md={12}>
                                            <Input name="name" label="프로그램명"  value={updateInfo.name} onChange={onUpdateChange}/>  
                                        </Grid>
                                        <Grid item md={6}>
                                            <Select name="bunya" label="분야" options={items} value={updateInfo.bunya} onChange={onUpdateChange}/>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Input name="teacher" label="강사"  value={updateInfo.teacher} onChange={onUpdateChange}/>  
                                        </Grid>
                                        <Grid item md={12}>
                                            <Button variant="contained" color="primary" type="submit" onClick={onUpdate} style={{marginRight : "10px"}}>
                                                수정
                                            </Button>
                                            <Button variant="contained" color="primary" type="submit" onClick={onDelete} style={{marginRight : "10px"}}>
                                                삭제
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
    </>)


}
export default ProgramMng;