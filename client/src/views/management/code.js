import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/managementReducer"
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid } from '@mui/material';

import CodeList from "./container/codeList"
import { client } from 'utils/callApi';
import Swal from 'sweetalert2';


const Code = ()=>{
    // Dispatch
    const dispatch = useDispatch();
    const codeList = useSelector(s=> getState(s).codeList)
    
    useEffect(()=>{
        // 조회 
        dispatch(actions.getBaseInfoPage());
        return ()=>{
            dispatch(actions.initState())
        }
    },[])



    const onChange = (type, e)=>{
        dispatch(actions.setValue({
            key : "codeList", 
            value : codeList.map(i=> ({
                ...i, 
                items  : type === i.type ? e : i.items
            }))

        }))
    }

    const onSave = ()=>{
                
        const data = codeList.reduce((acc, { type, name, items }) => ({
            ...acc,
            [type]: items.join(',')
        }), {});

        Swal.fire({
            title: '코드등록',
            text: "운영결과항목 변경사항을 저장 하시겠습니까?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#767676',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
        
            if(result.isConfirmed){
                client({ url : "/management/insertBasicInfoPage", withCredentials : true, data })
                .then(r => {
                    if(r.data?.result){
                        Swal.fire({
                            icon: 'success',
                            title: '확인',
                            text: "정상 등록 되었습니다.",
                            });
                    }
                })
            }
        })
        
    }


    return <>
    
        <MainCard>
            <div style={{padding: "0px 4px", textAlign: "right"}}>
                <Button variant="contained" color="primary" onClick={onSave}>변경사항저장</Button>
            </div>
            <Grid container spacing={2} style={{marginTop : "5px"}}>
                {codeList.map((i)=>
                    <Grid item md={3} key={i.type}>
                        <CodeList data={i} onChange={onChange}/>
                    </Grid>
                )}
            </Grid>
        </MainCard>
    </>;

}
export default Code;