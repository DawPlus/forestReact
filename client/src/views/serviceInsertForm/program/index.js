import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/program";
import Swal from "sweetalert2";
import useDownloadExcel from "utils/useDownloadExcel";
import { generateMergeInfo } from "utils/utils";


const Service = ()=>{

    const dispatch  = useDispatch();

    React.useEffect(()=>{
        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const {rows, deleteRow, searchInfo, type} = useSelector(s=> getState(s));
    
    const headerInfo = [
        [ '성별', '연령', '거주지', '직업', '참여구분', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성', '기타의견'
        , '시작일자' 
        , '기관명' 
        , '실시일자' 
        , '참여프로그램' 
        , '프로그램명' 
        , '강사명'         
        , '장소' 
        , '분야' 
        ],
        [ '', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '',
            '' , '' , '' , '' , '' , '' , '' , '' ]
    ]

    const cellData = rows.map((i,idx) => Object.values({
        SEX : i.SEX,
        AGE : i.AGE,
        RESIDENCE : i.RESIDENCE,
        JOB : i.JOB,
        TYPE : i.TYPE,
        SCORE1 : i.SCORE1,
        SCORE2 : i.SCORE2,
        SCORE3 : i.SCORE3,
        SCORE4 : i.SCORE4,
        SCORE5 : i.SCORE5,
        SCORE6 : i.SCORE6,
        SCORE7 : i.SCORE7,
        SCORE8 : i.SCORE8,
        SCORE9 : i.SCORE9,
        ETC_OPINION : i.ETC_OPINION,
        OPENDAY : i.OPENDAY,
        AGENCY : i.AGENCY,
        EVAL_DATE : i.EVAL_DATE,
        PTCPROGRAM : i.PTCPROGRAM,
        PROGRAM_NAME : i.PROGRAM_NAME,
        TEACHER : i.TEACHER,
        PLACE : i.PLACE,
        BUNYA : i.BUNYA,
    }));

    const wscols = [ {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:20}, {wch:20}, {wch:20}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:25}, {wch:25}, ];
    
    // Merge Info 
    const merges = generateMergeInfo(headerInfo);
    const downloadExcel = useDownloadExcel({headerInfo, cellData, wscols,merges,  filename  : "프로그램 만족도 "});

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
        const excludeValues = ['PROGRAM_SEQ', 'chk']; // 비어있는지 체크에서 제외하고 싶은 값들

        
    const isCheck = rows.some((row) => {
        return Object.entries(row).some(([key, value]) => {
        if (!excludeValues.includes(key)) {
            return !value || value.trim() === "";
        }
        return false;
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
        const data = rows.map((row) => {
            const { chk, id, ...rest } = row;
            return { ...rest, ...searchInfo };
        });


        Swal.fire({
            title: '프로그램 만족도 등록',
            text: `${data.length}개의 항목을 등록 하시겠습니까?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#767676',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if(result.isConfirmed){

                callApi("/insertForm/create", {data  , deleteRow, type}).then(r=> {
                    if(r.data.result){
                        Swal.fire({
                            icon: 'success',
                            title: '확인',
                            text: "정상등록 되었습니다.",
                            }).then(()=>{
                                downloadExcel()
                                dispatch(actions.getPreviousProgramListAfterSave({data : searchInfo, type}))
                            });  
                    }
                })
            }
        })

    }


    const onSearch = ()=>{
        const {   AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME} = searchInfo;
        dispatch(actions.getPreviousProgramList({data : {
            AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME
        }, type }))
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