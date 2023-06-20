import React from "react";


const Service = ()=>{


    React.useEffect(()=>{

        console.log("service")
        return ()=>{
            console.log("init service")
        }
    },[])

    return <>서비수 </>

}
export default Service;