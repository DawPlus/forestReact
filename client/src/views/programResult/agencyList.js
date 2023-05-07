import React ,{useEffect}from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {actions, getState} from "store/reducers/programResultReducer"
import { useDispatch, useSelector } from "react-redux";
import MainCard from 'ui-component/cards/MainCard';

import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import Program from "./program"
import Facility from "./facility"
const AgencyList = ()=>{
    // Dispatch
    const dispatch = useDispatch();
    const {type, agency, agencyList} = useSelector(s=> getState(s))

    useEffect(()=>{
        return ()=>{
            dispatch(actions.initState())
        }

    },[])

    const onAgencyChange = (e, value)=>{
        dispatch(actions.setAgency(value));
    }

    const onSelectedChange = (e)=>{
        
        if(e.target.value ==="") {
            dispatch(actions.initProgramAgency());
            return;
        }

        dispatch(actions.getProgramAgency({type : e.target.value}))
    }



    const onSearch = ()=>{
        
        if(!agencyList.some(i=> i.value === agency)){
            Swal.fire({
                title: "확인",
                text: "단체명을 정확히 입력(선택)해 주십시오. " ,
                icon: 'warning',
            });
            return;
        }
        
        switch(type){
            case "1" : dispatch(actions.getProgramResult({ type , agency }))
                break;
            case "2" : dispatch(actions.getFaciltyList({ type , agency }))
                break;
            default : break;
        }
        
        
        

    }


    return <>
        <MainCard>
            <Grid container spacing={2}   alignItems="center">
                <Grid item sm={4}>
                    <FormControl fullWidth size="small" style={{ height: 40 }}>
                        <InputLabel id="forms">입력양식</InputLabel>
                        <Select labelId="forms" value={type} label="입력양식" onChange={onSelectedChange} >
                            <MenuItem value="">선택하세요</MenuItem>
                            <MenuItem value="1">프로그램 만족도</MenuItem>
                            <MenuItem value="2">시설서비스환경 만족도</MenuItem>
                            <MenuItem value="3">상담&치유서비스 효과평가</MenuItem>
                            <MenuItem value="4">예방서비스 효과평가</MenuItem>
                            <MenuItem value="5">힐링서비스 효과평가</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6}>       
                {type !== "" && <>
                    {agencyList.length === 0 && "입력된 만족도및 효과평가 가 없습니다."}
                    {agencyList.length > 0 &&
                        <Autocomplete
                            size="small"
                            value={agency}
                            disablePortal
                            id="combo-box-demo"
                            options={agencyList}
                            onInputChange={onAgencyChange}
                            fullWidth
                            noOptionsText={"조회된 단체가 없습니다."}
                            renderInput={(params) => <TextField {...params} label="단체선택" style={{height : "40px"}}/>}
                        />
                        }
                </>}       
                </Grid>
                <Grid item sm={2}>
                    <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="primary" onClick={onSearch} >조회</Button>
                    </div>
                </Grid>
            </Grid>
        </MainCard>
        <MainCard style={{marginTop : "10px"}}>
            {
                {
                    1 : <Program/>,
                    2 : <Facility/>
                }[type]
            }
        </MainCard>
    </>

}
export default AgencyList;