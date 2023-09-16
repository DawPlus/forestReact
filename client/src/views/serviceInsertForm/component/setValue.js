import React ,{ useState}from "react";

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Grid } from "@mui/material";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';

import {   Select,   SelectItems,  NumberInput} from "ui-component/inputs";
import callApi from "utils/callApi";

const localeItems = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '미기재', '폐광지역'];
const jobItem = ["학생", "자영업", "서비스직", "판매영업직", "기능", "단순노무직", "고위공직/임직원", "임직원", "전문직", "일반사무직", "농림어업축산직", "주부", "무직", "기타", "미기재"]

const items =[
    {label : "성별", value : "SEX"},
    {label : "연령", value : "AGE"},
    {label : "거주지", value : "RESIDENCE"},
    {label : "직업", value : "JOB"},
]

const SetValueComponent = (props)=>{


    const {onAdd, onRemove, onSetData, getUserTemp} = props;

    const [setType, setSetType] = useState("");
    const [values, setValues] = useState("");

    const onSetValue = ()=>{
        if(setType ===""){
            Swal.fire({ icon: 'warning', title: '확인', text: "일괄입력 항목을 선택해 주세요 ", })
            return;
        }
        if(values ===""){
            Swal.fire({ icon: 'warning', title: '확인', text: "일괄입력 값을 입력/선택해 주세요 ", })
            return;
        }

        onSetData({type : setType, value : values+""})
    }



    const onChangeSelectItem = e=>{
        setSetType(s =>e.target.value)
        setValues(v => "");
    }

    const onGetTempData= ()=>{

        Swal.fire({
            icon: 'warning',
            title: '사용자정보 불러오기',
            text: `입력중이던 데이터가 삭제됩니다.`,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText : "취소"
        }).then((result) => {    
            if (result.isConfirmed) {
                getUserTemp(agency)
                
            } 
        })
    }
    const [agencyItem, setAgencyItem] = useState([])
    const [agency, setAgency] = useState("");
    
    React.useEffect(()=>{
        callApi("/userTemp/agencyList").then(({data})=> {
            
            setAgencyItem(data.map(i=> ({label : `${i.agency} [${i.openday}]`,  value : `${i.agency}/${i.openday}`})))
        });
    },[])



    return (<>
        <div style={{padding : "15px 5px"}}>
            <Grid container spacing={2}  direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item md={2}>
                    <IconButton color="primary" onClick={onAdd}>
                        <AddIcon color="primary" />
                    </IconButton>
                    <IconButton color="primary" onClick={onRemove} style={{margin : "0px 10px"}}>
                        <RemoveIcon color="primary" />
                    </IconButton>
                </Grid>
                <Grid item md={6}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2} >
                        <Grid item md={2}>
                            <SelectItems label="항목" value={setType} items={items} onChange={onChangeSelectItem}/>
                        </Grid>
                        {setType ===  "" ? null : 
                        <Grid item md={2}>
                            {
                                {
                                    "SEX"  : <Select label="성별" value={values} options={["남", "여", "미기재"]} onChange={(e)=>setValues(e.target.value)}/>,
                                    "AGE"  : <NumberInput label="연령" value={values} onChange={(name, value)=>setValues(value)}/>,
                                    "RESIDENCE"  : <Select label="거주지" value={values} options={localeItems} onChange={(e)=>setValues(e.target.value)}/>,
                                    "JOB"  : <Select label="직업" value={values} options={jobItem} onChange={(e)=>setValues(e.target.value)}/>,
                                }[setType]
                            }
                        </Grid>
                        }
                        <Grid item md={2}>
                            <Button variant="contained" size="small" color="secondary" onClick={onSetValue}>적용</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={2}>
                    <SelectItems label="기관명" items={agencyItem} value={agency} onChange={(e)=>setAgency(e.target.value)}/>
                </Grid>
                <Grid item md={2}>
                    <Button variant="contained" size="small" color="primary" onClick={onGetTempData} style={{marginLeft : "5px"}}>참가자명단 불러오기</Button>
                </Grid>
            </Grid>
        </div>
        <div>
        {props.children}
        </div>
    
    
    
    
    </>)


}
export default React.memo(SetValueComponent);