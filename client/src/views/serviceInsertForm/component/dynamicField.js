import React, {memo} from "react";
import { TextField, TableCell } from '@mui/material';


import Select from "ui-component/select"

const DynamicField = ({ type, label, name, onChange, value, idx }) => {


    const item = {
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

    return type === 'select'   ? 

    <TableCell>
        <Select items={item[name]} label={label} value={value} name={name} onChange={onChange(idx)} style={{minWidth: "100px"}}/>
    </TableCell>
    : 
    <TableCell>
        <TextField size="small" label={label} value={value} name={name} onChange={onChange(idx)} />
    </TableCell>
    
};
export default memo(DynamicField);