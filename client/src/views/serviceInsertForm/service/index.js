import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/service";
import Swal from "sweetalert2";
import useDownloadExcel from "utils/useDownloadExcel";

import { useLocation } from 'react-router-dom';
const Service = (props)=>{
    // 1. useLocation 훅 취득
    const location = useLocation();

    const dispatch  = useDispatch();

    React.useEffect(()=>{

        if(!location.state) return;

        const {type, name, openday, evalDate}= location.state;

        if(type === "serviceInsertForm"){
            dispatch(actions.getPreviousServiceList({data : {
                AGENCY : name, 
                OPENDAY : openday, 
                EVAL_DATE : evalDate
            }}))
        }


        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const {rows, deleteRow, searchInfo} = useSelector(s=> getState(s));
    


    const headerInfo = [
        ['순서', '성별', "연령" , "거주지", "직업", "숙소(문항1)" , "숙소(문항2)" , "식당(문항3)" , "식당(문항4)" , "프로그램장소(문항5)" , "프로그램장소(문항6)" , "프로그램장소(문항7)" , "야외(문항8)" , "야외(문항9)" , "야외(문항10)" , "기타의견" , "운영(문항1)" , "운영(문항2)" , "운영(문항3)" , "식사(문항4)" , "식사(문항5)" , "식사(문항6)" , "기타의견" , "잠재적관광수요(문항8)" , "잠재적관광수요(문항9)" , ]
    ]

    const cellData = rows.map((i,idx) => Object.values({
        idx : idx + 1, 
        SEX : i.SEX,
        AGE : i.AGE, 
        RESIDENCE : i.RESIDENCE, 
        JOB : i.JOB, 
        SCORE1 : i.SCORE1, 
        SCORE2 : i.SCORE2, 
        SCORE3 : i.SCORE3, 
        SCORE4 : i.SCORE4, 
        SCORE5 : i.SCORE5, 
        SCORE6 : i.SCORE6, 
        SCORE7 : i.SCORE7, 
        SCORE8 : i.SCORE8, 
        SCORE9 : i.SCORE9, 
        SCORE10 : i.SCORE10, 
        FACILITY_OPINION : i.FACILITY_OPINION, 
        SCORE11 : i.SCORE11, 
        SCORE12 : i.SCORE12, 
        SCORE13 : i.SCORE13, 
        SCORE14 : i.SCORE14, 
        SCORE15 : i.SCORE15, 
        SCORE16 : i.SCORE16, 
        OPERATION_OPINION : i.OPERATION_OPINION, 
        SCORE17 : i.SCORE17, 
        SCORE18 : i.SCORE18, 
    }));
    
        const wscols = [ 
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:25},
            {wch:25},
        ];
    

    const downloadExcel = useDownloadExcel({headerInfo, cellData, wscols, filename  : "서비스환경만족도"});



    const array = [ "SEX", "AGE", "RESIDENCE", "JOB", "SCORE1", "SCORE2", "SCORE3", "SCORE4", "SCORE5", "SCORE6", "SCORE7", "SCORE8", "SCORE9", "SCORE10", "FACILITY_OPINION", "SCORE11", "SCORE12", "SCORE13", "SCORE14", "SCORE15", "SCORE16", "OPERATION_OPINION", "SCORE17", "SCORE18", ];
    
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

        const isCheck =  rows.some((row) => {
            return array.some((item) => {
                return !row[item] || row[item].trim() === "";
            });
        });

        if(isCheck){
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: "비어있는 항목이 있습니다.",
                })
            return;
        }


        // 데이터 가공  
        const data = rows.map(i=> ({...i, ...searchInfo}))


        Swal.fire({
            title: '서비스환경 만족도 등록',
            text: `${data.length}개의 항목을 등록 하시겠습니까?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#767676',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if(result.isConfirmed){

                callApi("/insertForm/serviceInsert", {data  , deleteRow}).then(r=> {
                    if(r.data.result){
                        Swal.fire({
                            icon: 'success',
                            title: '확인',
                            text: "정상등록 되었습니다.",
                            }).then(()=>{
                                downloadExcel()
                                dispatch(actions.getPreviousServiceListAfterSave({data : searchInfo}))
                            });  
                    }
                })
            }
        })

    }


    const onSearch = ()=>{
        const {   AGENCY , OPENDAY , EVAL_DATE } = searchInfo;
        if([AGENCY , OPENDAY , EVAL_DATE ].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: '필수 조회조건(기관명, 시작일자, 실시일자)을 입력해 주십시오', });
            return;
        }
        dispatch(actions.getPreviousServiceList({data : searchInfo}))
    }

    return <>
        <MainCard style={{marginTop : "10px"}}>
            <SearchInfo/>
            <div style={{marginTop : "10px"}}>
                <Button variant="contained" size="small" color="secondary" onClick={onSearch}>조회</Button>
                <Button variant="contained" size="small" color="primary" onClick={onSave} style={{marginLeft : "5px"}}>전송</Button>
            </div>
        </MainCard>
        <MainCard style={{marginTop : "10px", minHeight: "400px"}}>
            <InsertForm/>
        </MainCard>
            
    </>

}
export default Service;