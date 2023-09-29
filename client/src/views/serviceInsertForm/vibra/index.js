import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/vibra";
import Swal from "sweetalert2";
import useDownloadExcel from "utils/useDownloadExcel";
import { generateMergeInfo } from "utils/utils";
import { useLocation, useNavigate } from "react-router";


const Service = ()=>{
 // 1. useLocation 훅 취득
 const location = useLocation();
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    React.useEffect(()=>{

        if(!location.state) return;
        
        const {data} = location.state;
        
        const [col1 , col2 , col3] = [data[6], data[3], data[7]]
        
        dispatch(actions.getList({data : {
            AGENCY  : col1 ,
            DATE : col2,
            PV : col3 
        }, type }))
        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const {rows,  searchInfo, type} = useSelector(s=> getState(s));
    const headerInfo = [
        ['ID', '이름', '주민등록번호', '성별', '연령', '적극공격성', '스트레스', '불안', '의심', '밸런스', '카리스마', '에너지', '자기조절', '억제','신경증'],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '','', '', ]
    ]

    
    const cellData = rows.map((i,idx) => Object.values({
        ID : i.ID,
        DATE : i.DATE,
        NAME : i.NAME,
        JUMIN : i.JUMIN,
        SEX : i.SEX,
        AGE : i.AGE,
        NUM1 : i.NUM1,
        NUM2 : i.NUM2,
        NUM3 : i.NUM3,
        NUM4 : i.NUM4,
        NUM5 : i.NUM5,
        NUM6 : i.NUM6,
        NUM7 : i.NUM7,
        NUM8 : i.NUM8,
    }));

    const title = "바이브라 측정검사";

    const wscols = [ {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:20}, {wch:20}, {wch:20}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:25}, {wch:25}, ];
    
    // Merge Info 
    const merges = generateMergeInfo(headerInfo);
    const downloadExcel = useDownloadExcel({headerInfo, cellData, wscols,merges,  filename  : title});

    const onSave = ()=>{
        const hasEmptyValues = Object.keys(searchInfo).some(key => key !== 'EQUIPMENT' && !searchInfo[key]);
        if (hasEmptyValues) {
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: "기본정보를 모두 입력해 주십시오.",
                })
            return;
        } 
       /// const excludeValues = ['VIBRA_SEQ', 'chk']; // 비어있는지 체크에서 제외하고 싶은 값들

        
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
            const { chk, idx, ...rest } = row;
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
                    date : searchInfo.DATE, 
                    agency : searchInfo.AGENCY,
                    pv : searchInfo.PV
                }

                callApi("/insertForm/createVibra",params).then(r=> {
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
                                    DATE : searchInfo.DATE,
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
        const {   AGENCY } = searchInfo;
        dispatch(actions.getList({data : {
            AGENCY ,
            DATE : searchInfo.DATE,
            PV : searchInfo.PV
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