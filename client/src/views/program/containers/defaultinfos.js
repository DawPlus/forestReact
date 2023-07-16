import React  from "react";

import {Grid} from '@mui/material';
import {  Input, Select, CheckBox } from "ui-component/inputs";
import DatePicker from "ui-component/inputs/datePicker";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
import moment from "moment";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));


const DefaultInfos = ()=>{


    const dispatch =useDispatch();

    const {
        OPENDAY,
        AGENCY,
        OM,
        ENDDAY,
        DAYS_TO_STAY,
        RESIDENCE,
        PART_MAN_CNT,
        PART_WOMAN_CNT,
        LEAD_MAN_CNT,
        LEAD_WOMAN_CNT,
        SUPPORT,
        INCOME_TYPE,
        PART_TYPE,
        AGE_TYPE,
        BIZ_PURPOSE,
        PROGRAM_IN_OUT,
        SERVICE_TYPE,
        ROOM_PART_PEOPLE,
        ROOM_PART_ROOM,
        ROOM_LEAD_PEOPLE,
        ROOM_LEAD_ROOM,
        ROOM_ETC_PEOPLE,
        ROOM_ETC_ROOM,
        MEAL_TYPE,
        MEAL_PART,
        MEAL_LEAD,
        MEAL_ETC,
        PROGRAM_OPINION,
        SERVICE_OPINION,
        OVERALL_OPINION,
        PROGRESS_STATE,
        REG_ID,
        ISCLOSEMINE,
    } = useSelector(s=> getState(s));

    const diffDays = React.useMemo(() => {
        if (!OPENDAY || !ENDDAY) {
            return "체류기간(일) - 자동계산";
        }
    
        const startDate = moment(OPENDAY);
        const endDate = moment(ENDDAY);
        
        const isValidDates = endDate.isSameOrAfter(startDate);
        const diffInDays = isValidDates ? endDate.diff(startDate, 'days') + 1 : null;
        const errorMessage = !isValidDates ? '잘못된 선택입니다. 종료일은 시작일 이후여야 합니다.' : null;
    
        return errorMessage ? errorMessage : `${diffInDays} 일`;
    }, [OPENDAY, ENDDAY]);

    const onChange = e=> {
        dispatch(actions.setValue({
            key : e.target.name,
            value : e.target.value
        }))
    }

    const onDateChange = (key, value)=>{
        dispatch(actions.setValue({ key, value }))
    }


    const items = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '미기재', '폐광지역'];
    const onCheckChange = e=>{
        dispatch(actions.setValue({
            key : e.target.name,
            value : e.target.checked
        }))
    }
    return(
        <>  
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Div style={{  padding: "22px 0px 0px 8px"}}>기본정보</Div>
                </Grid>
                {/* 단체명 */}
                <Grid item xs={6}>
                    <Input name="AGENCY" label="단체명"  value={AGENCY} onChange={onChange}/>
                </Grid>
                {/* OM */}
                <Grid item xs={6}>
                    <Input name="OM" label="OM" value={OM} onChange={onChange}/>
                </Grid>
                {/* 참여일 */}
                <Grid item container xs={12} spacing={2}>
                    <Grid item  xs={6} >
                        <DatePicker label="참여시작일"name="OPENDAY" value={OPENDAY} onChange={onDateChange}/>
                    </Grid>
                    <Grid item  xs={6}>
                        <DatePicker label="참여종료일" name="ENDDAY" value={ENDDAY} onChange={onDateChange}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Input name="title"  readOnly={true} value={diffDays}/>
                </Grid>

                <Grid item container xs={12} spacing={2} alignItems="center">
                    <Grid item  xs={6} >
                        <Select label="거주지역" name="RESIDENCE" options={items} onChange={onChange}/>
                    </Grid>
                    <Grid item  xs={6}>
                        <CheckBox label="폐광지역" style={{ alignItems: 'center' }}value={ISCLOSEMINE} onChange={onCheckChange} name="isCloseMine"/>
                    </Grid>          
                </Grid>
            </Grid>
        </>



    );


}
export default DefaultInfos;