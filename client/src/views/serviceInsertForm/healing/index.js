import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/healing";
import Swal from "sweetalert2";
import useDownloadExcel from "utils/useDownloadExcel";
import { generateMergeInfo } from "utils/utils";
import { useLocation, useNavigate } from "react-router";


const Service = ()=>{
   // 1. useLocation 훅 취득
   const location = useLocation();
   const navigate = useNavigate();
    const dispatch  = useDispatch();

    React.useEffect(()=>{

        if(!location.state) return;
        
        const {data} = location.state;
        
        const [col1 , col2 , col3, col4] = [data[6], data[3], data[4], data[7]]
        dispatch(actions.getList({data : {
            AGENCY  : col1,
            OPENDAY  : col2,
            EVAL_DATE : col3,
            PV : col4
        }, type }))

        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const {rows,  searchInfo, type} = useSelector(s=> getState(s));
    
    const headerInfo = [
        [ '이름', '성별', '연령', '거주지', '직업', '스트레스해소 및 힐링 서비스 경험', 
            '욕구충족',
            '욕구충족',
            '긍정정서',
            '긍정정서',
            '긍정정서',
            '자기이해',
            '자기이해',
            '자기이해',
            '자기이해',
            '마음관리기술',
            '마음관리기술',
            '마음관리기술',
            '정서능력측면',
            '정서능력측면',
            '정서능력측면',
            '정서능력측면',
            '영성측면',
            '영성측면',
            '영성측면',
            '삶의조망측면',
            '삶의조망측면',
            '삶의조망측면',
        ],
        [ '', '', '', '', '', '',
            '문항1',
            '문항2',
            '문항3',
            '문항4',
            '문항5',
            '문항6',
            '문항7',
            '문항8',
            '문항9',
            '문항10',
            '문항11',
            '문항12',
            '문항1',
            '문항2',
            '문항3',
            '문항4',
            '문항5',
            '문항6',
            '문항7',
            '문항8',
            '문항9',
            '문항10'
        ],
    ]

    
    const cellData = rows.map((i,idx) => Object.values({
        NAME  : i.NAME,
        SEX  : i.SEX,
        AGE  : i.AGE,
        RESIDENCE  : i.RESIDENCE,
        JOB  : i.JOB,
        PAST_STRESS_EXPERIENCE  : i.PAST_STRESS_EXPERIENCE,
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
        SCORE11 : i.SCORE11,
        SCORE12 : i.SCORE12,
        SCORE13 : i.SCORE13,
        SCORE14 : i.SCORE14,
        SCORE15 : i.SCORE15,
        SCORE16 : i.SCORE16,
        SCORE17 : i.SCORE17,
        SCORE18 : i.SCORE18,
        SCORE19 : i.SCORE19,
        SCORE20 : i.SCORE20,
        SCORE21 : i.SCORE21,
        SCORE22 : i.SCORE22,
    }));
    const title = "힐링서비스 효과평가 ";

    const wscols = [ {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:20}, {wch:20}, {wch:20}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:25}, {wch:25}, ];
    
    // Merge Info 
    const merges = generateMergeInfo(headerInfo);
    const downloadExcel = useDownloadExcel({headerInfo, cellData, wscols,merges,  filename  : title});

    const onSave = ()=>{
        const hasEmptyValues = Object.keys(searchInfo).some(key => key !== 'PTCPROGRAM' && !searchInfo[key]);

        if (hasEmptyValues) {
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: "기본정보를 모두 입력해 주십시오.",
                })
            return;
        } 
        // const excludeValues = ['HEALING_SEQ', 'chk']; // 비어있는지 체크에서 제외하고 싶은 값들

        
    // const isCheck = rows.some((row) => {
    //     return Object.entries(row).some(([key, value]) => {
    //     if (!excludeValues.includes(key)) {
    //         console.log(value)
    //         return !value || (value+"").trim() === "";
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
            title,
            text: `${data.length}개의 항목을 등록 하시겠습니까?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#767676',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if(result.isConfirmed){


                const params = {
                    data, 
                    agency : searchInfo.AGENCY,
                    openday : searchInfo.OPENDAY,
                    evaldate : searchInfo.EVAL_DATE,
                    pv  : searchInfo.PV,
                }

                callApi("/insertForm/createHealing", params).then(r=> {
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
                                downloadExcel()
                                dispatch(actions.getListAfterSave({data : {
                                    AGENCY  : searchInfo.AGENCY,
                                    OPENDAY : searchInfo.OPENDAY,
                                    PV : searchInfo.PV
                                }, type}))
                            });  
                        }
                    }
                })
            }
        })

    }


    const onSearch = ()=>{
        const {   AGENCY , OPENDAY , EVAL_DATE,  PV} = searchInfo;

        if([AGENCY , OPENDAY , EVAL_DATE,  PV].includes("")){
            alert("조회조건을 선택하세요 ");
            return; 
        }

        dispatch(actions.getList({data : {
            AGENCY , OPENDAY , EVAL_DATE,  PV
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