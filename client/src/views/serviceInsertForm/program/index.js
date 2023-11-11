import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/program";
import useDownloadExcel from "utils/useDownloadExcel";
import { generateMergeInfo } from "utils/utils";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import ExcelUpload from "ui-component/excelUploader";

const Service = ()=>{
    // 1. useLocation 훅 취득
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch  = useDispatch();


    const {rows,  searchInfo, type} = useSelector(s=> getState(s));
    


    React.useEffect(()=>{


        dispatch(actions.getProgramList())
        dispatch(actions.getTeacherList())



        if(!location.state) return;

        const {data} = location.state;
      
        const [col1 , col2 , col3, col4, col5, col6, col7] = [data[6], data[3], data[4], data[8], data[9], data[10], data[11]]


        dispatch(actions.getPreviousProgramList({data : {
            AGENCY :col1,
            OPENDAY   :col2 ,
            EVAL_DATE :col3,
            PROGRAM_NAME :col4
        },type }))

        
        dispatch(actions.setValue({
            key : "searchInfo" , 
            value : {
                ...searchInfo, 
                AGENCY :col1,
                OPENDAY   :col2 ,
                EVAL_DATE :col3,
                PROGRAM_NAME :col4, 
                BUNYA : col5,
                TEACHER : col6,
                PLACE : col7,
            }
        }))

        return ()=>{
            dispatch(actions.initState())
        }
    },[location.state])

    React.useEffect(()=>{
        return ()=>{
            dispatch(actions.initState())
        }

    },[])


    const headerInfo = [
        [ '성별', '연령', '거주지', '직업', '참여구분', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성', '시작일자' , '기관명' , '실시일자' , '프로그램명' , '강사명' , '장소' , '분야' ],
        [ '', '', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '' , '' , '' , '' , '' , '' , ''  ]
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
       // ETC_OPINION : i.ETC_OPINION,
        OPENDAY : i.OPENDAY,
        AGENCY : i.AGENCY,
        EVAL_DATE : i.EVAL_DATE,
       // PTCPROGRAM : i.PTCPROGRAM,
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
        // const hasEmptyValues = Object.keys(searchInfo).some(key => key !== 'PTCPROGRAM' && !searchInfo[key]);

        // if (hasEmptyValues) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: '확인',
        //         text: "기본정보를 모두 입력해 주십시오.",
        //         })
        //     return;
        // } 
        // const excludeValues = ['PROGRAM_SEQ', 'chk']; // 비어있는지 체크에서 제외하고 싶은 값들

        
    // const isCheck = rows.some((row) => {
    //     return Object.entries(row).some(([key, value]) => {
    //     if (!excludeValues.includes(key)) {
    //         return !value || value.trim() === "";
    //     }
    //     return false;
    //     });
    // });
    //     if(isCheck){
    //         Swal.fire({
    //             icon: 'warning',
    //             title: '확인',
    //             text: "비어있는 항목이 있습니다.",
    //             })
    //         return;
    //     }


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
           
                const params =  {
                    data , 
                    openday :  searchInfo.OPENDAY, 
                    agency : searchInfo.AGENCY, 
                    evaldate : searchInfo.EVAL_DATE, 
                    program_name : searchInfo.PROGRAM_NAME
                }

                callApi("/insertForm/createProgram",params).then(r=> {
                    if(r.data.result){
                        if(location.state){
                            Swal.fire({
                                icon: 'success',
                                title: '확인',
                                text: "수정이 완료 되었습니다. 수정/삭제 페이지로 이동합니다. ",
                                }).then(()=>{
                                    navigate("/updateDelete", {
                                        state : {
                                            params : location.state.searchInfo
                                        }
                                    });
                            });
                        }else{
                        Swal.fire({
                            icon: 'success',
                            title: '확인',
                            text: "정상등록 되었습니다.",
                            }).then(()=>{
                                dispatch(actions.initState())
                                // downloadExcel()
                                // dispatch(actions.getPreviousProgramListAfterSave({data : searchInfo, type}))
                            });  
                        }
                    }
                })
            }
        })

    }


    const onSearch = ()=>{
        const {   AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME} = searchInfo;
        if([AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME].includes("")){
            Swal.fire({ icon: 'warning', title: '확인', text: '필수 조회조건(기관명, 시작일자, 실시일자, 프로그램명)을 입력해 주십시오', });
            return;
        }
        dispatch(actions.getPreviousProgramList({data : {
            AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME
        }, type }))
    }



    const onChangeExcel = value =>{
        dispatch(actions.setExcelData(value));
    }

    return <>
        <MainCard style={{marginTop : "10px"}}>
            <SearchInfo/>
            <div style={{marginTop : "10px"}}>
                <Button variant="contained" size="small" color="secondary" onClick={onSearch}>조회</Button>
                <Button variant="contained" size="small" color="primary" onClick={onSave} style={{marginLeft : "5px"}}>전송</Button>
                <ExcelUpload onDataProcessed={onChangeExcel} startRow={3} type="program"/>
            </div>
        </MainCard>
        <MainCard style={{marginTop : "10px", minHeight: "400px"}}>
            <InsertForm/>
        </MainCard>
            
    </>

}
export default Service;