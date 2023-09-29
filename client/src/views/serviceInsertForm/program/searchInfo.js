import React from "react";
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState, actions } from "store/reducers/serviceInsert/program";
import {  Input, Select, DatePicker} from "ui-component/inputs";
import SelectItems from "ui-component/inputs/selectItems";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const SearchInfo = ()=>{


    const dispatch = useDispatch();

    const { 
        OPENDAY,
        AGENCY,
        EVAL_DATE,
       // PTCPROGRAM,
        PROGRAM_NAME,
        TEACHER,
        PLACE,
        BUNYA,
    } = useSelector(s=> getState(s).searchInfo);

  //  const programItem = useSelector(s=> getState(s).programItem);
    const programList = useSelector(s=> getState(s).programList);
    const teacherItem = useSelector(s=> getState(s).teacherItem);
    const onChangeTeacher= (e,value)=>{
        dispatch(actions.setSearchInfo({
            key :'TEACHER', 
            value : value
        }))        
        // setPageInfo(s=> ({
        //     ...s, 
        //     col2 : value
        // }))
    }

    const onChange = (e)=>{

        dispatch(actions.setSearchInfo({
            key : e.target.name, 
            value : e.target.value
        }))        
    }

    const onDateChange = (key, value)=>{
        dispatch(actions.setSearchInfo({ key, value }))
    }


    const bunyaItem = [... new Set(programList.map(i=> i.bunya))]
    const programItem = programList.map(i=> i.bunya === BUNYA  ? i.name  : null).filter(o=> o)

    //const item = [ "당일형", "1박2일형", "2박3일형", ]
    // const item2 = [ '산림교육', '예방교육', '산림치유', '아트', '릴렉싱', '에너제틱', '쿠킹', '이벤트' ]


    return <>
        <Grid container spacing={2} alignItems={"center"} style={{marginBottom : "15px"}}>
            <Grid item sm={2}>
                <DatePicker  value={OPENDAY} onChange={onDateChange} label="시작일자" name="OPENDAY" />
            </Grid>
            <Grid item sm={2}>
                <DatePicker label="실시일자" value={EVAL_DATE} onChange={onDateChange} name="EVAL_DATE"/>
            </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={2}>
                <Input  label="기관명" value={AGENCY} name="AGENCY" onChange={onChange}/> 
            </Grid>
            <Grid item sm={2}>
                <Select options={bunyaItem}label="분야"value={BUNYA} name="BUNYA" onChange={onChange} />
            </Grid>
            <Grid item sm={2}>
                <Select options={programItem} label="프로그램명" name="PROGRAM_NAME" value={PROGRAM_NAME}onChange={onChange}/>
            </Grid>
            {/* <Grid item sm={2}>
                <Select options={item}label="참여일정"value={PTCPROGRAM} name="PTCPROGRAM" onChange={onChange} />
            </Grid> */}
            <Grid item sm={2}>
                {/* <SelectItems items={teacherItem} label="강사명" name="TEACHER" value={TEACHER}onChange={onChange}/> */}
                <Autocomplete
                    size="small"
                    value={TEACHER}
                    disablePortal
                    id="combo-box-demo"
                    options={teacherItem}
                    onInputChange={onChangeTeacher}
                    fullWidth
                    noOptionsText={"조회된 강사가 없습니다."}
                    renderInput={(params) => <TextField {...params} label="강사" style={{height : "40px"}}/>}
                />
            </Grid>
            <Grid item sm={2}>
                <Input  label="장소" value={PLACE} name="PLACE" onChange={onChange}/> 
            </Grid>
        </Grid>
        
    </>

}
export default SearchInfo;