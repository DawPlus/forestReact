import React from "react";
import { useEffect } from "react";
import client from "utils/callApi"

const Code = ()=>{

    useEffect(()=>{
        client({ url : "/management/getBasicInfoPage", method : "POST", withCredentials : true })
        .then(r => {
            console.log(r)
        })


    },[])



    return "CODE";

}
export default Code;