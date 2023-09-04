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


const keywordItem = [
    { value : "X" , label : "해당없음"},
    { value : "AGENCY" , label : "기관명"},
    { value : "OM" , label : "OM"},
    { value : "DAYS_TO_STAY" , label : "체류기간"},
    { value : "RESIDENCE" , label : "거주지역"},
    { value : "SUPPORT" , label : "지원사항"},
    { value : "BIZ_PURPOSE" , label : "사업구분"},
    { value : "PART_TYPE" , label : "참가자유형"},
    { value : "AGE_TYPE" , label : "연령대"},
    { value : "INCOME_TYPE" , label : "수입구분"},
    { value : "SERVICE_TYPE" , label : "서비스유형"},
]

const SearchPage = ()=>{

    const {keyword} = useSelector(s=> getState(s));

    const dispatch = useDispatch();


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
                                <TextField label="주제어" name="text" value={i.text} size="small" onChange={onChangeKeyword(idx)} variant="outlined" />
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
                <ResidenceList/>
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