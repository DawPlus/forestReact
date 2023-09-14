import React  from "react";
import MainCard from 'ui-component/cards/MainCard';

import Select from "ui-component/select";
// import Input from "ui-component/inputs/input";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import {  useDispatch, useSelector } from "react-redux";
import {actions,  getState} from "store/reducers/programResultReducer"
import Button from '@mui/material/Button';
import DatePicker from "ui-component/inputs/datePicker";

import ProgramResult from "./programResult"
import FacilityResult from "./facilityResult"
import PreventResult from "./preventResult";
import HealingResult from "./healingResult";
import Swal from "sweetalert2";

// import ProgramTable from "ui-component/programTable";
// import useUpdateEffect from "hooks/useUpdateEffect";

const itemObject = {
    SEX : [
        {label  :"남", value : "남"},
        {label  :"여", value : "여"},
        {label  :"미기재", value : "미기재"},
    ],
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
    JOB  : [
        {label : "학생", value : "학생"},
        {label : "자영업", value : "자영업"},
        {label : "서비스직", value : "서비스직"},
        {label : "판매영업직", value : "판매영업직"},
        {label : "기능", value : "기능"},
        {label : "단순노무직", value : "단순노무직"},
        {label : "고위공직/임직원", value : "고위공직/임직원"},
        {label : "임직원", value : "임직원"},
        {label : "전문직", value : "전문직"},
        {label : "일반사무직", value : "일반사무직"},
        {label : "농림어업축산직", value : "농림어업축산직"},
        {label : "주부", value : "주부"},
        {label : "무직", value : "무직"},
        {label : "기타", value : "기타"},
        {label : "미기재", value : "미기재"},
    ],
    TYPE : [
        {label : "인솔자", value : "인솔자"},
        {label : "참여자", value : "참여자"},
        {label : "미기재", value : "미기재"},
    ]

}
const SearchResult = ()=>{

    const dispatch = useDispatch();

    const {searchInfo, rows} = useSelector(s=> getState(s).searchResult);

    const {effect, keyword} = searchInfo;


    // const [params, setParams] = useState({
    //     openday : "",
    //     endday : "", 
    //     agency : "", 
    // })


    const effectItems = [
        {label : "프로그램 만족도", value : "program"},
        {label : "시설서비스 환경 만족도", value : "facility"},
        {label : "상담&치유 서비스", value : "counseling"},
        {label : "예방 서비스", value : "prevent"},
        {label : "힐링 서비스", value : "healing"},
    ]


    const keywordItem = [
        { value : "X" , label : "해당없음"},
        // { value : "AGENCY" , label : "기관명"},
        { value : "SEX" , label : "성별"},
        { value : "AGE" , label : "연령(만)"},
        { value : "RESIDENCE" , label : "거주지"},
        { value : "JOB" , label : "직업"},
        { value : "OPENDAY" , label : "시작일자"},
        { value : "PLACE" , label : "장소"},
        { value : "TEACHER" , label : "강사"},
        { value : "PROGRAM_NAME" , label : "프로그램이름"},
        { value : "BUNYA" , label : "분야"},
    ]

    const onChangeHandler = (e)=>{
        dispatch(actions.onChangeSearchResult(e.target.value));
    }

    const onChangeKeyword = index => e =>{
        dispatch(actions.onChangeSearchKeyword({
            index, 
            key : e.target.name, 
            value : e.target.value
        }));       
    }

    const onChangeKeywordDate = index => (key, value) =>{
        
        dispatch(actions.onChangeSearchKeyword({
            index, 
            key,
            value
        }));       
    }

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

        if(!searchInfo.effect){
            Swal.fire({
                title: `확인`,
                text: `입력양식을 선택해 주십시오` ,
                icon: 'warning',
            });
            return;
        }


        dispatch(actions.getSearchResult(searchInfo));
        // setParams(a=> ({
        //     openday  : searchInfo.openday, 
        //     endday : searchInfo.endday, 
        // }))

    }

    React.useEffect(()=>{
        return ()=>{
            dispatch(actions.initState())
        }

    },[])

    // useUpdateEffect(()=>{
    //     if(rows.length ===0){
    //         Swal.fire({
    //             title: `확인`,
    //             text: `조회된 검색결과가 없습니다.` ,
    //             icon: 'warning',
    //         });
    //         return;
    //     }

    // },[rows])

    // const onAgencyChange = (e)=>{
    //     const value = e.target.value;
    //     dispatch(actions.setSearchAgency(value))

    // }
    const setDate = (key, value)=>{
        dispatch(actions.setSearchData({key, value}))
    }


    
    return <>
            <MainCard>
                <Grid container  alignItems="center" spacing={2}>
                    <Grid item md={3} >
                        <DatePicker label="시작일"name="openday" value={searchInfo.openday} onChange={setDate}/>
                    </Grid>
                    <Grid item md={3}>
                        <DatePicker label="종료일" name="endday" value={searchInfo.endday} onChange={setDate}/>
                    </Grid>
                    <Grid item md={3}>
                        <Select value={effect} label="입력양식" name="effect" items={effectItems}onChange={onChangeHandler}/>
                    </Grid>
                    {/* <Grid item md={4}>
                        <Input label="기관명" name="AGENCY" value={searchInfo.AGENCY} size="small" onChange={onAgencyChange} variant="outlined" />
                    </Grid> */}
                    <Grid item md={3}>
                        <div style={{textAlign: "left"}}>
                            <Button variant="contained" color="primary" onClick={onSearch} >조회</Button>
                        </div>
                    </Grid>
                        {keyword.map((i, idx)=> 
                            <Grid item md={3} key={idx}>
                                <Grid container spacing={1}>
                                    <Grid item md={6}>
                                        <Select minWidth="50" value={i.type} label={`주제어${idx+1}`} name="type" items={keywordItem} onChange={onChangeKeyword(idx)}/>
                                    </Grid>
                                    <Grid item md={6}>
                                        {
                                        ["SEX", "RESIDENCE", "JOB"].includes(i.type) ? 
                                                <Select value={i.text} label="주제어" name="text" items={itemObject[i.type]}onChange={onChangeKeyword(idx)}/>
                                            : i.type === "OPENDAY" ?   <DatePicker label="주제어" name="text" value={i.type} onChange={onChangeKeywordDate(idx)}/> : 
                                                                        <TextField label="주제어" name="text" value={i.text} size="small" onChange={onChangeKeyword(idx)} variant="outlined" />

                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>            
            </MainCard>
            <MainCard style={{marginTop : "10px"}}>
                {rows.length > 0 && 
                <>
                    {/* <ProgramTable param={params}/> */}
                    {/* <ParticipationType/>
                    <ResidenceList/>
                    <ProgramManage/> */}
                    {  {
                        program : <ProgramResult/>,
                        facility : <FacilityResult/>,
                        prevent : <PreventResult/>,
                        healing : <HealingResult/>

                    }[effect]}
                    </>
                }
                
            </MainCard>
    </>


}
export default SearchResult;