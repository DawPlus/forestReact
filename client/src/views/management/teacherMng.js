import React, {useEffect} from "react";
import api from "api/management"
import {Grid, Button, IconButton} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/managementReducer"
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from 'ui-component/dataGrid';
import {  Input  } from "ui-component/inputs";
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';


const TeacherMng = ()=>{

    const dispatch = useDispatch();


    const {rows, newInfo, updateInfo} = useSelector(s=> getState(s).teacherMng)

    
    useEffect(()=>{
        dispatch(actions.getTeacherMngList());
        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const onDetail = (data)=>{
        const teacher_seq = data[1] 
        const name = data[2]     
        const phone = data[3]     
        dispatch(actions.setTeacherUpdateInfo({teacher_seq, name, phone}))
    }

    
    const columns = [
        { name: "index", label: "번호", options : {  filter : false} },
        { name : "teacher_seq", label : "" , options:{filter: false, display: false}},        
        { name : "name", label : "강사명"},
        { name : "phone", label : "핸드폰번호" , options:{filter: false, display: false}},
        { name : "phoneDisplay", label : "핸드폰번호"},
        // { name : "create_user", label : "생성자"},
        // { name : "create_dtm", label : "생성일자", options:{filter: false}},
        // { name : "update_dtm", label : "수정일자", options:{filter: false}},
        // { name : "update_user", label : "수정자" ,options:{filter: false, display: false}},
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
        dispatch(actions.onChangeTeacherMngInfo({ target : "newInfo", key, value }))
    }   


    const onUpdateChange= e=> {
        const key = e.target.name;
        const value = e.target.value;        
        dispatch(actions.onChangeTeacherMngInfo({ target : "updateInfo", key, value }))
    }   


    const onSave = ()=>{
        if([newInfo.name, newInfo.phone].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: "입력값을 확인해 주십시오", })
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '등록하시겠습니까?',
            text: ` 강사명 의 중복여부를 꼭 확인해 주세요!` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.createTeacherMng({data : {...newInfo}}).then(r=> {
                    dispatch(actions.getTeacherMngList())

                })
                
            } 
        })
        

    }

    const onUpdate = ()=>{
        if([updateInfo.name, updateInfo.phone].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: "입력값을 확인해 주십시오", })
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '수정하시겠습니까?',
            text: ` 강사명 의 중복여부를 꼭 확인해 주세요!` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.createTeacherMng({data : {...updateInfo}}).then(r=> {
                    dispatch(actions.getTeacherMngList())

                })
                
            } 
        })
    }

    // 삭제
    const onDelete = ()=>{
        if([updateInfo.teacher_seq].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: "삭제할 강사를 선택해주세요", })
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '삭제하시겠습니까?',
            text: `선택하신 강사가 삭제됩니다.` ,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                api.deleteTeacherMng({seq : updateInfo.teacher_seq}).then(r=> {
                    dispatch(actions.getTeacherMngList())

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
                            <Grid item md={3}>
                                <Input name="name" label="강사명"  value={newInfo.name} onChange={onChange}/>  
                            </Grid>
                            <Grid item md={3}>
                                <Input name="phone" label="핸드폰번호(숫자만입력)"  value={newInfo.phone} onChange={onChange}/>  
                            </Grid>  
                            <Grid item md={3}>
                                <Button variant="contained" color="primary" type="submit" onClick={onSave} style={{marginRight : "10px"}}>
                                    등록
                                </Button>
                            </Grid>
                            <Grid item md={3}> </Grid>  
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
                                            <Input name="name" label="강사명"  value={updateInfo.name} onChange={onUpdateChange}/>  
                                        </Grid>
                                        <Grid item md={12}>
                                            <Input name="phone" label="핸드폰번호(숫자만입력)" value={updateInfo.phone} onChange={onUpdateChange}/>  
                                        </Grid>
                                        {/* <Grid item md={6}>
                                            <Select name="bunya" label="분야" options={items} value={updateInfo.bunya} onChange={onUpdateChange}/>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Input name="teacher" label="강사"  value={updateInfo.teacher} onChange={onUpdateChange}/>  
                                        </Grid> */}
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
export default TeacherMng;