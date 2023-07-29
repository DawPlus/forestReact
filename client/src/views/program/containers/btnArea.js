import React  from "react";
// project imports
import callApi from "utils/callApi";
import {Grid, Button,} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";
import Swal from "sweetalert2";
const InsertOperateResult = ()=>{

    const dispatch = useDispatch();

    const data = useSelector(s=> getState(s));



    const onPreSave = ()=>{
        console.log(data)
        const params = {
            ...data, 
            PROGRAM_IN_OUT : data.programList.map(obj => {
                return Object.entries(obj)
                    .filter(([key, value]) => key !== 'id')
                    .map(([key, value]) => value)
                    .join(',');
            }).join(','),
            PROGRESS_STATE : "P"
        }

        callApi("/insertOperation/create", {data: params}).then(r=> {
            if(r.data.result){
                Swal.fire({
                    icon: 'success',
                    title: '확인',
                    text: "정상등록 되었습니다.",
                    }).then(()=>{




                    });  
            }
        })
    }




return(<>


            <Grid container spacing={2} style={{marginTop : "5px"}}>
                <Grid item xs={12}>
                    <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="primary" type="submit" onClick={onPreSave} style={{marginRight : "10px"}}>
                        임시저장
                        {/*  PROGRESS_STATE: P */}
                        </Button>

                        <Button variant="contained" color="primary" type="submit">
                        {/* PROGRESS_STATE : E */}
                        등록
                        </Button>
                    </div>
                </Grid>
            </Grid>
</>)


}
export default InsertOperateResult


