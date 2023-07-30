import React  from "react";
// project imports
import callApi from "utils/callApi";
import {Grid, Button,} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
import Swal from "sweetalert2";

const columnNames = {
    OPENDAY : "참여시작일",
    AGENCY : "단체명",
    OM : "OM",
    ENDDAY : "참여종료일",
    RESIDENCE : "거주지역",
    PART_MAN_CNT : "참여인원(참여자-남자)",
    PART_WOMAN_CNT : "참여인원(참여자-여자)",
    LEAD_MAN_CNT : "참여인원(인솔자-남자)",
    LEAD_WOMAN_CNT : "참여인원(인솔자-여자)",
    SUPPORT : "지원사항",
    INCOME_TYPE : "수입구분",
    PART_TYPE : "참가자유형",
    AGE_TYPE : "연령대",
    BIZ_PURPOSE : "사업목적",
    SERVICE_TYPE : "서비스유형",
    ROOM_PART_PEOPLE : "객실(참여자-인원)",
    ROOM_PART_ROOM : "객실(참여자-객실)",
    ROOM_LEAD_PEOPLE : "객실(인솔자-인원)",
    ROOM_LEAD_ROOM : "객실(인솔자-객실)",
    ROOM_ETC_PEOPLE : "객실(기타-인원)",
    ROOM_ETC_ROOM : "객실(기타-객실)",
    MEAL_TYPE : "식사횟수",
    MEAL_PART : "참여자인원",
    MEAL_LEAD : "인솔자인원",
    MEAL_ETC : "기타인원",
    PROGRAM_OPINION : "프로그램소감",
    SERVICE_OPINION : "시설서비스소감",
    OVERALL_OPINION : "종합의견 및 불편사항",
};

const InsertOperateResult = ()=>{

    const dispatch = useDispatch();

    const data = useSelector(s=> getState(s));


    const checkEmptyColumns = (data, excludeList = [], columnNames = {}) => {
        const emptyColumn = Object.entries(data).find(([column, value]) => {
        // 배열은 체크에서 제외
        if (Array.isArray(value)) {

            return false;
        }
        
        return !excludeList.includes(column) && !value;
        });
    
        if (emptyColumn) {
            const columnName = columnNames[emptyColumn[0]] || emptyColumn[0];
            Swal.fire(`[${columnName}] 항목이 비어있습니다.`);
        return false;
        }
    
        return true;
    };
    
    


    // 데이터 생성 및 임시저장
    const onPreSave = ()=>{

        // const excludeList = ["BASIC_INFO_SEQ", "REG_ID", "DAYS_TO_STAY", "PROGRESS_STATE", "PROGRAM_IN_OUT", "ISCLOSEMINE"];
        // // 기본값 체크 
        // const result = checkEmptyColumns(data, excludeList, columnNames);
        
        // if (!result) {
        //     return
        // }
        // // 프로그램 등록여부 체크 
        // if(data.programList.length === 0){
        //     Swal.fire(`프로그램을 입력해 주십시오.`);
        //     return;
        // }

        const expenseList = [...data.teacherList, ...data.teacherExtraList, ...data.customList , ...data.customExtraList].map(({TITLE, id, ...rest})=> ({...rest}));
        const incomeList = [...data.income, ...data.incomeExtraList].map(({TITLE, id, ...rest})=> ({...rest}));
        

            
        

        const params = {
            ...data.basicInfo, 
            PROGRAM_IN_OUT : data.programList.map(obj => {
                return Object.entries(obj)
                    .filter(([key, value]) => key !== 'id')
                    .map(([key, value]) => value)
                    .join(',');
            }).join(','),
            PROGRESS_STATE : "P",
            expenseList,
            incomeList,
        }


        callApi("/insertOperation/create", {data: params}).then(r=> {
            if(r.data.result){
                Swal.fire({
                    icon: 'success',
                    title: '확인',
                    text: "정상등록 되었습니다.",
                    }).then(()=>{




                    });  
            }
        })
    }




return(<>


            <Grid container spacing={2} style={{marginTop : "5px"}}>
                <Grid item xs={12}>
                    <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="primary" type="submit" onClick={onPreSave} style={{marginRight : "10px"}}>
                        임시저장
                        {/*  PROGRESS_STATE: P */}
                        </Button>

                        <Button variant="contained" color="primary" type="submit">
                        {/* PROGRESS_STATE : E */}
                        등록
                        </Button>
                    </div>
                </Grid>
            </Grid>
</>)


}
export default InsertOperateResult


