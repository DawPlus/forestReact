import React  from "react";

import {Grid} from '@mui/material';
import {   Select,   NumberInput} from "ui-component/inputs";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));
const DefaultInfos = ()=>{

    const dispatch =useDispatch();
    const {
        PART_MAN_CNT,
        PART_WOMAN_CNT,
        LEAD_MAN_CNT,
        LEAD_WOMAN_CNT,
        DAYS_TO_STAY,
       // SUPPORT,
      //  INCOME_TYPE,
        PART_TYPE,
        AGE_TYPE,
        BIZ_PURPOSE,
        SERVICE_TYPE,
        ORG_NATURE ,// 단체성격
        PART_FORM , // 참여형태
    } = useSelector(s=> getState(s).basicInfo);


    const onNumberChange = (key ,value)=>{
        dispatch(actions.setBasicInfo({
            key,
            value
        }))
    }

    const onChange = e=> {
        
        dispatch(actions.setBasicInfo({
            key : e.target.name,
            value : e.target.value
        }))
    }
    

    function getTotal(arr, multiplier = 1) {
        const totalSum = arr.reduce((sum, currentValue) => {
            const num = parseFloat(currentValue);
            return !isNaN(num) ? sum + num : sum;
        }, 0);
    
        return totalSum * multiplier;
    }
    

    return(
        <>  
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Div style={{  padding: "22px 0px 0px 8px"}}>{`참여인원  (실인원  : ${getTotal([PART_MAN_CNT, PART_WOMAN_CNT, LEAD_MAN_CNT, LEAD_WOMAN_CNT])}명 / 실인원  : ${getTotal([PART_MAN_CNT, PART_WOMAN_CNT, LEAD_MAN_CNT, LEAD_WOMAN_CNT], DAYS_TO_STAY)}명)`}</Div>
                </Grid>
                <Grid item container xs={12} spacing={2} alignItems="center">
                    <Grid item  xs={2} justifyItems={'center'}>
                            <div style={{textAlign:"center"}}>참여자</div>
                    </Grid>
                    <Grid item  xs={5} >
                        <NumberInput name="PART_MAN_CNT" label="남자" value={PART_MAN_CNT} onChange={onNumberChange}/>
                    </Grid>
                    <Grid item  xs={5}>
                        <NumberInput name="PART_WOMAN_CNT" label="여자"value={PART_WOMAN_CNT} onChange={onNumberChange} />
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2} alignItems="center">
                    <Grid item  xs={2} justifyItems={'center'}>
                            <div style={{textAlign:"center"}}>인솔자</div>
                    </Grid>
                    <Grid item  xs={5} >
                        <NumberInput name="LEAD_MAN_CNT" label="남자" value={LEAD_MAN_CNT} type="number" onChange={onNumberChange}/>
                    </Grid>
                    <Grid item  xs={5}>
                        <NumberInput name="LEAD_WOMAN_CNT" label="여자" type="number" value={LEAD_WOMAN_CNT} onChange={onNumberChange}/>
                    </Grid>
                </Grid>
            
                {/* <Grid item xs={12} >
                    <MultiSelect label="지원사항" name="SUPPORT" options={["프로그램", "숙박", "식사", "해당없음"]} value={supportValue} onChange={onSupportChange}/>
                </Grid> */}
                    
                <Grid item container xs={12} spacing={2} alignItems="center">
                    <Grid item  xs={6} >  
                        <Select label="사업구분" name="BIZ_PURPOSE" value={BIZ_PURPOSE} options={["사회공헌", "수익사업"]} onChange={onChange}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="단체성격" name="ORG_NATURE" value={ORG_NATURE} options={["교육기관", "복지기관", "기업", "관공서", "강원랜드"]} onChange={onChange}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="참가자유형" name="PART_TYPE" value={PART_TYPE}options={["일반", "가족", "장애인","다문화"]} onChange={onChange}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="연령대" name="AGE_TYPE" value={AGE_TYPE}options={["아동청소년", "성인", "노인"]} onChange={onChange}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="참여형태" name="PART_FORM" value={PART_FORM} options={["단체","개인","기타"]} onChange={onChange}/>
                    </Grid>
                    <Grid item  xs={6} >  
                        <Select label="서비스유형" name="SERVICE_TYPE" value={SERVICE_TYPE}options={["산림교육", "산림치유", "행위중독치유", "행위중독예방", "힐링"]} onChange={onChange}/>
                    </Grid>
                </Grid>
                
                </Grid>
        </>



    );


}
export default DefaultInfos;