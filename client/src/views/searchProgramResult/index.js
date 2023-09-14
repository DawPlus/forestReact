import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import PrintIcon from '@mui/icons-material/Print';
import Select from "ui-component/select";
import Grid from '@mui/material/Grid';
import {  useDispatch, useSelector } from "react-redux";
import {actions,  getState} from "store/reducers/searchProgramReducer"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import {PrintSection } from "ui-component/printButton"
import ProgramManage  from "./programManage";
import DatePicker from "ui-component/inputs/datePicker";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ParticipationType from "./participationType";
import ResidenceList from "./residenceList"
import SerList from "./serList"
import ProgramEffect from "./programEffect"
import { useEffect } from "react";
import callApi from "utils/callApi";


const itemObject = {
    RESIDENCE : [
        {label : "서울", value : "서울"},
        {label : "부산", value : "부산"},
        {label : "대구", value : "대구"},
        {label : "인천", value : "인천"},
        {label : "광주", value : "광주"},
        {label : "대전", value : "대전"},
        {label : "울산", value : "울산"},
        {label : "세종", value : "세종"},
        {label : "경기", value : "경기"},
        {label : "강원", value : "강원"},
        {label : "충북", value : "충북"},
        {label : "충남", value : "충남"},
        {label : "전북", value : "전북"},
        {label : "전남", value : "전남"},
        {label : "경북", value : "경북"},
        {label : "경남", value : "경남"},
        {label : "제주", value : "제주"},
        {label : "미기재", value : "미기재"}
    ],
    BIZ_PURPOSE : [
        {label  :"사회공헌", value : "사회공헌"},
        {label  :"수익사업", value : "수익사업"},
    ],
    AGE_TYPE : [
        {label  :"아동청소년", value : "아동청소년"},
        {label  :"성인", value : "성인"},
        {label  :"노인", value : "노인"},
    ],
    PART_FORM : [
        {label  :"단체", value : "단체"},
        {label  :"개인", value : "개인"},
        {label  :"기타", value : "기타"},
    ],
    ORG_NATURE : [
        {label  :"교육기관", value : "교육기관"},
        {label  :"복지기관", value : "복지기관"},
        {label  :"기업", value : "기업"},
        {label  :"관공서", value : "관공서"},
        {label  :"강원랜드", value : "강원랜드"},
    ],
    SERVICE_TYPE : [
        {label  :"산림교육", value : "산림교육"},
        {label  :"산림치유", value : "산림치유"},
        {label  :"행위중독치유", value : "행위중독치유"},
        {label  :"행위중독예방", value : "행위중독예방"},
        {label  :"힐링", value : "힐링"},
    ],
    PART_TYPE : [
        {label : "일반", value : "일반"},
        {label : "가족", value : "가족"},
        {label : "장애인", value : "장애인"},
        {label : "다문화", value : "다문화"},
    ]

}
const keywordItem = [
    { value : "X" , label : "해당없음"},
    { value : "AGENCY" , label : "기관명"},
    { value : "OM" , label : "OM"},
    { value : "DAYS_TO_STAY" , label : "체류기간"},
    { value : "RESIDENCE" , label : "거주지역"},
    //{ value : "SUPPORT" , label : "지원사항"},
    { value : "BIZ_PURPOSE" , label : "사업구분"},
    { value : "PART_TYPE" , label : "참가자유형"},
    { value : "AGE_TYPE" , label : "연령대"},
    { value : "PART_FORM" , label : "참여형태"},
    { value : "ORG_NATURE" , label : "단체성격"},
    // { value : "INCOME_TYPE" , label : "수입구분"},
    { value : "SERVICE_TYPE" , label : "서비스유형"},
]

const SearchPage = ()=>{

    const {keyword} = useSelector(s=> getState(s));

    const dispatch = useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const [isCloseMineCount, setIsMineCloseCount] = React.useState(0);
    const onSearch = ()=>{
        const isTextEmpty = keyword.every( i=> i.text === "");
        if(isTextEmpty){
            Swal.fire({
                title: `확인`,
                text: `하나 이상의 주제어를 입력해 주십시오` ,
                icon: 'warning',
            });
            return;
        }
        dispatch(actions.getPartTypeList({ keyword, openday, endday }));
        dispatch(actions.getResidenceList({ keyword, openday, endday }));
        dispatch(actions.programManage({ keyword, openday, endday }));
        dispatch(actions.getSerList({ keyword, openday, endday }));
        dispatch(actions.getProgramEffect({ keyword, openday, endday }));

        callApi("/searchProgram/getIsCloseMine", {keyword, openday, endday}).then(r=> setIsMineCloseCount(r.data.CNT))

        // dispatch(actions.getAllPrograms({ keyword }));
    }



    

    const onChangeKeyword = index => e =>{
        dispatch(actions.onChangeSearchKeyword({
            index, 
            key : e.target.name, 
            value : e.target.value
        }));       
    }

    
    const onPrint = ()=>{
        window.print();
    }


    const [openday, setOpenday] = React.useState("");
    const [endday, setEndday] = React.useState("");


    return <>
        <MainCard>
            <Grid container  alignItems="center" spacing={1}>
                <Grid item sm={3}><DatePicker label="시작일"name="openday" value={openday} onChange={(_, value)=>setOpenday(value)}/></Grid>
                <Grid item sm={3}><DatePicker label="종료일"name="endday" value={endday} onChange={(_, value)=>setEndday(value)}/></Grid>
                <Grid item sm={6}></Grid>
                {keyword.map((i, idx)=> 
                    <Grid item sm={3} key={idx}>
                        <Grid container  alignItems="center" spacing={1}>
                            <Grid item sm={6}>
                                <Select minWidth="50" value={i.type} label={`주제어${idx+1}`} name="type" items={keywordItem} onChange={onChangeKeyword(idx)}/>
                            </Grid>
                            <Grid item sm={6}>
                                {itemObject[i.type] ? 
                                <Select value={i.text} label="주제어" name="text" items={itemObject[i.type]}onChange={onChangeKeyword(idx)}/>
                                :<TextField label="주제어" name="text" value={i.text} size="small" onChange={onChangeKeyword(idx)} variant="outlined" />
                            }
                                
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                <Grid item sm={3}>
                    <div style={{textAlign: "right"}}>
                    <Button variant="contained" color="primary" onClick={onSearch} style={{margin : "0px 5px"}}>조회</Button>
                        <Button variant="contained" color="primary" onClick={onPrint}><PrintIcon /></Button>
                    </div>
                </Grid>
            </Grid>            
        </MainCard>
        <MainCard   id="print" style={{marginTop : "10px", minHeight: "400px"}}>
            <PrintSection>
            <div style={{textAlign :"right" , marginBottom : "15px"}}>
                </div>
                <div style={{textAlign:"center",     margin: "60px 0px 30px 0px"}}>
                    <h1>주제어별 프로그램 통계</h1>
                </div>
                <ParticipationType/>
                {/* 지역 */}
                <ResidenceList isCloseMineCount={isCloseMineCount}/>
                {/* 프로그램운영 */}
                <ProgramManage/>
                {/* 시설만족도 */}
                <SerList/>
                {/* 효과성분석 */}
                <ProgramEffect/>
                {/*                 
                <ProgramOverview/> */}
                
            </PrintSection>
        </MainCard>
    </>



}
export default SearchPage;