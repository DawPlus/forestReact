import React ,{useState}from "react";

import MainCard from 'ui-component/cards/MainCard';
import Select from "ui-component/select";

import Program from "./program"
import Service from "./service"
import Counsel from "./counsel"
import Prevent from "./prevent"
import Healing from "./healing"
import Hrv from "./hrv"
import Vibra from "./vibra"
import { useLocation } from 'react-router-dom';


const ServiceInsertForm = ()=>{
    // 1. useLocation 훅 취득
    const location = useLocation();

    
    React.useEffect(()=>{
        
        if(!location.state) return; 
        const {type}= location.state;
        setType(s=> type);
    },[location.state])

    const [type  , setType] = useState("serviceInsertForm")

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
        setType(e.target.value)
    }
    
    return (<>
            <MainCard>
                <Select label="입력양식" name="type" value={type} onChange={onChange} items={item}/>
            </MainCard>
            {
                {
                    "serviceInsertForm" : <Service/>,
                    "programInsertForm" : <Program/>,
                    "counselInsertForm" : <Counsel/>,
                    "preventInsertForm" : <Prevent/>,
                    "healingInsertForm" : <Healing/>,


                    
                    "hrvInsertForm" : <Hrv/>,
                    "vibraInsertForm" : <Vibra/>,
                }[type]
            }
        </>);

}
export default ServiceInsertForm;