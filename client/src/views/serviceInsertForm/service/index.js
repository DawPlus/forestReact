import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import InsertForm from "./insertForm"
import { minHeight } from "@mui/system";
const Service = ()=>{


    React.useEffect(()=>{

        return ()=>{
            console.log("init service")
        }
    },[])

    return <>
        <MainCard style={{marginTop : "10px"}}>
            검색영역

        </MainCard>
        <MainCard style={{marginTop : "10px", minHeight: "400px"}}>
            <InsertForm/>
        </MainCard>
            
    </>

}
export default Service;