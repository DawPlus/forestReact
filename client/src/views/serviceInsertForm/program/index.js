import React from "react";


const Program = ()=>{

    React.useEffect(()=>{

        console.log("program")
        return ()=>{
            console.log("init program")
        }
    },[])
    return <>프로그램 </>

}
export default Program;