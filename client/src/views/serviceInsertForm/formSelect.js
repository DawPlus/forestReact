import React from "react";
import Select from "ui-component/select";

import {actions, getState} from "store/reducers/serviceInsertReducer"
import { useDispatch, useSelector } from "react-redux";

const FormSelect = ()=>{


    const dispatch = useDispatch();

    const {type} = useSelector(s=> getState(s))

    const item = [
        {value : "serviceInsertForm" , label : "서비스환경 만족도"},
        {value : "programInsertForm" , label : "프로그램 만족도"},
        {value : "counselInsertForm" , label : "상담&치유서비스 효과평가"},
        {value : "preventInsertForm" , label : "예방서비스 효과평가"},
        {value : "healingInsertForm" , label : "힐링서비스 효과평가"},
        {value : "hrvInsertForm" , label : "HRV 측정 검사"},
        {value : "vibraInsertForm" , label : "바이브라 측정 검사"},
    ]

    const onChange = (e)=>{
        dispatch(actions.setValue({
            key : e.target.name,
            value : e.target.value
        }))
    }

    return <>
        <Select label="입력양식" name="type" value={type} onChange={onChange} items={item}/>
        
    </>


}
export default FormSelect;