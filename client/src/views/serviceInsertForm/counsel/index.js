import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import SearchInfo from "./searchInfo"
import Button from '@mui/material/Button';
import callApi from "utils/callApi";
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/serviceInsert/counsel";
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


    const {rows, searchInfo, type} = useSelector(s=> getState(s));
    const headerInfo = [
        [ '이름', '성별', '연령', '거주지', '직업', '스트레스해소 및 힐링 서비스 경험', 
        '변화동기', '변화동기', '신뢰(라포)', '신뢰(라포)', '신뢰(라포)', '서비스이해', '서비스이해', '조절실패', '조절실패', '조절실패', '현저성', '현저성', '현저성', '문제적결과', '문제적결과', '문제적결과', '문제적결과', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '낮은자기조절력', '부정정서', '부정정서', '부정정서', '편향된신념', '편향된신념', '편향된신념', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '역기능적자기도식', '대인관계기술부족', '대인관계기술부족', '대인관계기술부족', '대인민감성', '대인민감성', '대인민감성', '대인민감성', '관계/유능욕구충족', '관계/유능욕구충족', '긍정정서', '긍정정서', '긍정정서', '삶의만족', '삶의만족', '삶의만족', '자기이해', '자기이해', '자기이해', '자기이해', '자기수용', '자기수용', '자기수용', '마음관리기술/기회', '마음관리기술/기회', '마음관리기술/기회', '스마트폰활용역량', '스마트폰활용역량', ],
        [ '', '', '', '', '', '',
        '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '문항11', '문항12', '문항13', '문항14', '문항15', '문항16', '문항17', '문항18', '문항19', '문항20', '문항21', '문항22', '문항23', '문항24', '문항25', '문항26', '문항27', '문항28', '문항29', '문항30', '문항31', '문항32', '문항33', '문항34', '문항35', '문항36', '문항37', '문항38', '문항39', '문항40', '문항41', '문항42', '문항43', '문항44', '문항45', '문항46', '문항47', '문항48', '문항49', '문항50', '문항51', '문항52', '문항53', '문항54', '문항55', '문항56', '문항57', '문항58', '문항59', '문항60', '문항61', '문항62',
        ],
    ]

    
    const cellData = rows.map((i,idx) => Object.values({
        NAME  : i.NAME,
        SEX  : i.SEX,
        AGE  : i.AGE,
        RESIDENCE  : i.RESIDENCE, // 지역
        JOB  : i.JOB,
        PAST_STRESS_EXPERIENCE  : i.PAST_STRESS_EXPERIENCE, //과거 상담·치유서비스 경험
        SCORE1  : i.SCORE1,
        SCORE2  : i.SCORE2,
        SCORE3  : i.SCORE3,
        SCORE4  : i.SCORE4,
        SCORE5  : i.SCORE5,
        SCORE6  : i.SCORE6,
        SCORE7  : i.SCORE7,
        SCORE8  : i.SCORE8,
        SCORE9  : i.SCORE9,
        SCORE10  : i.SCORE10,
        SCORE11  : i.SCORE11,
        SCORE12  : i.SCORE12,
        SCORE13  : i.SCORE13,
        SCORE14  : i.SCORE14,
        SCORE15  : i.SCORE15,
        SCORE16  : i.SCORE16,
        SCORE17  : i.SCORE17,
        SCORE18  : i.SCORE18,
        SCORE19  : i.SCORE19,
        SCORE20  : i.SCORE20,
        SCORE21  : i.SCORE21,
        SCORE22  : i.SCORE22,
        SCORE23  : i.SCORE23,
        SCORE24  : i.SCORE24,
        SCORE25  : i.SCORE25,
        SCORE26  : i.SCORE26,
        SCORE27  : i.SCORE27,
        SCORE28  : i.SCORE28,
        SCORE29  : i.SCORE29,
        SCORE30  : i.SCORE30,
        SCORE31  : i.SCORE31,
        SCORE32  : i.SCORE32,
        SCORE33  : i.SCORE33,
        SCORE34  : i.SCORE34,
        SCORE35  : i.SCORE35,
        SCORE36  : i.SCORE36,
        SCORE37  : i.SCORE37,
        SCORE38  : i.SCORE38,
        SCORE39  : i.SCORE39,
        SCORE40  : i.SCORE40,
        SCORE41  : i.SCORE41,
        SCORE42  : i.SCORE42,
        SCORE43  : i.SCORE43,
        SCORE44  : i.SCORE44,
        SCORE45  : i.SCORE45,
        SCORE46  : i.SCORE46,
        SCORE47  : i.SCORE47,
        SCORE48  : i.SCORE48,
        SCORE49  : i.SCORE49,
        SCORE50  : i.SCORE50,
        SCORE51  : i.SCORE51,
        SCORE52  : i.SCORE52,
        SCORE53  : i.SCORE53,
        SCORE54  : i.SCORE54,
        SCORE55  : i.SCORE55,
        SCORE56  : i.SCORE56,
        SCORE57  : i.SCORE57,
        SCORE58  : i.SCORE58,
        SCORE59  : i.SCORE59,
        SCORE60  : i.SCORE60,
        SCORE61  : i.SCORE61,
        SCORE62  : i.SCORE62,
    }));
    // const cellData = rows.map(({id, chk, COUNSEL_SEQ , ...res}) => Object.values({
    //     ...res
    // }));
    // const cellData = rows.map(({id, chk, prevent_SEQ , ...res}) => Object.values({
    //     ...res
    // }));
   
    const title = "상담/치유서비스효과 효과평가 ";

    const wscols = [ {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:20}, {wch:20}, {wch:20}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:25}, {wch:25}, ];
    
    // Merge Info 
    const merges = generateMergeInfo(headerInfo);
    const downloadExcel = useDownloadExcel({headerInfo, cellData, wscols,merges,  filename  : title});

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
      //  const excludeValues = ['PREVENT_SEQ', 'chk']; // 비어있는지 체크에서 제외하고 싶은 값들

        
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

        const {SESSION1, SESSION2 , ...res}= searchInfo;

        const prefix= res.PV ==="시전" ? '시작' : res.PV ==="중간" ? '중간': '종결'

        const _searchInfo = {
            ...res, 
            SESSION : prefix+"회기/"+SESSION1+"/"+SESSION2
        }

    

        // 데이터 가공  
        const data = rows.map((row) => {
            const { chk, id, ...rest } = row;
            return { ...rest, ..._searchInfo };
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
                        evaldate  :searchInfo.EVAL_DATE,
                }

                callApi("/insertForm/createCounsel", params).then(r=> {
                    if(r.data.result){
                        Swal.fire({
                            icon: 'success',
                            title: '확인',
                            text: "정상등록 되었습니다.",
                            }).then(()=>{
                                downloadExcel()
                                dispatch(actions.getListAfterSave({data : {
                                    AGENCY  : searchInfo.AGENCY,
                                    OPENDAY : searchInfo.OPENDAY,
                                }, type}))
                            });  
                    }
                })
            }
        })

    }


    const onSearch = ()=>{
        const {   AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME} = searchInfo;
        if([AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME].includes("")){
            Swal.fire({ icon: 'warning', title: '조건확인', text: "조회조건을 입력해 주십시오", })
            return;
        }
        dispatch(actions.getList({data : {
            AGENCY , OPENDAY , EVAL_DATE, PROGRAM_NAME
        }, type }));        
        // Swal.fire({
        //     icon: 'warning',
        //     title: '확인',
        //     text: "조회된 데이터는 수정만 가능합니다. ",
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#767676',
        //     confirmButtonText: '확인',
        //     cancelButtonText: '취소'
        //     }).then((result)=>{
        //         if(result.isConfirmed){
                   
        //         }
        //     });  
        



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