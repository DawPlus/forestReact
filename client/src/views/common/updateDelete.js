import React , {useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/updateDeleteReducer"
import Swal from "sweetalert2";
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from 'ui-component/dataGrid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {  InputLabel} from '@mui/material';
import { client } from "utils/callApi";
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

const UpdateDelete = ()=>{

    // Dispatch
    const dispatch = useDispatch();
    // Rows
    const {rows, type} = useSelector(s=> getState(s));
 

    useEffect(()=>{
        
        return ()=>{
            dispatch(actions.initState())
        }
    }, [])

    // Component Did Mount 
    useEffect(()=>{
        if(type){
            dispatch(actions.getList({type}))
        }else{
            dispatch(actions.setValue({
                key : "rows", 
                value : []
            }))
        }

    },[type]);

    // 입력양식 변경 Event 
    const onSelectChange = (e)=>{
        dispatch(actions.setValue({
            key : "type",
            value : e.target.value
        }))
    }


    // 삭제 클릭 
    const onDeleteClick = (data)=>{
        //PARAM 
        const [seq, name] = [data[0], data[2]]
            
        Swal.fire({
            title: `${name}`,
            text: `${name} 을/를 삭제 하시겠습니까? ` ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#767676',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if(result.isConfirmed){
                client({ url : '/updateDelete/delete', withCredentials : true, data : { seq, type} })
                .then(r => {
                    if(r.data?.result){
                        Swal.fire({
                            icon: 'success',
                            title: '확인',
                            text: "삭제 되었습니다.",
                            }).then(()=>dispatch(actions.getList({type})))
                    }
                })
            }
        })
    }


    const columns = [
        { name: "SEQ",  options : {display:false, filter: false} },
        { name: "INDEX",      label: "번호",options : { filter: false} },
        { name: "AGENCY",   label: "기관명"},
        { name: "OPENDAY",  label: "실시일자"},
        { name: "actions", label: "Action",
        options: {
            filter: false,
            customBodyRender: (_, tableMeta, _u) => {
            const data = tableMeta.rowData;
            return ( 
                //<button style={{ boxShadow: "none", }} onClick={()=>onDeleteClick(data)} >삭제</button> 
                <Button color="inherit" onClick={() => onDeleteClick(data)} > <Delete/> </Button>
            );
            },
        },
        },
    ];


    return <>
        <MainCard>
            <div>
                <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                <InputLabel id="demo-select-small-label">입력양식</InputLabel>
                <Select labelId="demo-select-small-label" id="demo-select-small" value={type} label="입력양식" onChange={onSelectChange} >
                    <MenuItem value="">입력 양식을 선택해주세요.</MenuItem>
                    <MenuItem value={1}>프로그램 운영 결과</MenuItem>
                    <MenuItem value={2}>서비스환경 만족도</MenuItem>
                    <MenuItem value={3}>프로그램 만족도</MenuItem>
                    <MenuItem value={4}>상담&치유서비스 효과평가</MenuItem>
                    <MenuItem value={5}>예방서비스 효과평가</MenuItem>
                    <MenuItem value={6}>힐링서비스 효과평가</MenuItem>
                    <MenuItem value={7}>HRV 측정 검사</MenuItem>
                    <MenuItem value={8}>바이브라 측정 검사</MenuItem>
                </Select>
                </FormControl>
            </div>

                
            <DataGrid title="수정/삭제" data={rows} columns={columns} />
        </MainCard>
    </>


}
export default UpdateDelete;