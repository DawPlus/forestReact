import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/service";
import Swal from "sweetalert2";

// material-ui
const Service = ()=>{


    const dispatch  = useDispatch();

    React.useEffect(()=>{
        return ()=>{
            console.log("init service")
        }
    },[])


    const {rows, searchInfo} = useSelector(s=> getState(s));
    
    const onSave = ()=>{

        const hasEmptyValues = Object.values(searchInfo).some(value => !value);

        if (hasEmptyValues) {
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: "기본정보를 모두 입력해 주십시오.",
                })
            return;
        } 
        // 데이터 가공  
        const data = rows.map(i=> ({...i, ...searchInfo}))

        callApi("/insertForm/serviceInsert", {data  }).then(r=> {
            if(r.data.result){
                Swal.fire({
                    icon: 'success',
                    title: '확인',
                    text: "정상등록 되었습니다.",
                    }).then(()=>{
                        dispatch(actions.initState()); // Excel Down 으로 변경스 
                    });  
            }


        })
    }


    return <>
        <MainCard style={{marginTop : "10px"}}>
        
            <SearchInfo/>

            <Button variant="contained" size="small" color="primary" onClick={onSave} >전송</Button>
        </MainCard>
        <MainCard style={{marginTop : "10px", minHeight: "400px"}}>
            <InsertForm/>
        </MainCard>
            
    </>

}
export default Service;