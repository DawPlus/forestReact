import React  ,{useState} from "react";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {Grid, Button,} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getState , actions} from "store/reducers/programReducer";

import ProgramList from "./containers/programList"
import DefaultInfos from "./containers/defaultinfos"
import PersonInfos from "./containers/personInfos"


import RoomInfos from "./containers/roomInfos"
import MealInfos from "./containers/mealInfos"
import OpinionInfo from "./containers/opinionInfo"
import ExpenseAmount from "./containers/expenseAmount"
import Income from "./containers/income"
import BtnArea from "./containers/btnArea"
import Select from "ui-component/inputs/selectItems";
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";

const InsertOperateResult = ()=>{


  const dispatch= useDispatch();

  const tempList = useSelector(s=> getState(s).tempList);

  const [tempValue, setTempValue] = useState("");

  React.useEffect(()=>{
    dispatch(actions.getTempList());
    dispatch(actions.getProgramMngList());
    dispatch(actions.getTeacherMngList());

    

    return ()=>{
      dispatch(actions.initState())
    }
  },[])


  // 임시저장 불러오기 
  const getTempData = () =>{
    if(tempValue === ""){
      Swal.fire({ icon: 'warning', title: '확인', text: "불러올 임시저장을 선택해주세요 ", })
      return   
    }
    dispatch(actions.getTempData({seq : tempValue}))
  }

  // 초기화
  const onReset = () =>{
      Swal.fire({
        title: `초기화`,
        text: `입력내용을 초기화 하시겠습니까?` ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#767676',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
    }).then((result) => {
    
        if(result.isConfirmed){
          dispatch(actions.onReset())
          setTempValue(s=>"")
        }
    })

  }



  return(<>
      {tempList.length >0 ? 
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Grid item md={2}>
            <Select label="임시저장" items={tempList} onChange={e=>{ setTempValue(e.target.value) }} value={tempValue}/>
          </Grid>
          <Grid item md={4}>
            <Button variant="contained" color="primary"  onClick={getTempData} style={{marginRight:"10px"}}>
              임시저장불러오기
            </Button>
            <Button variant="contained" color="warning"  onClick={onReset}>
              초기화
            </Button>
          </Grid>
          <Grid item md={8}></Grid>
        </Grid> : null
      }
        <MainCard style={{marginBottom : "5px"}}>
            <Typography variant="body1">
              ※ 기본정보 및 프로그램정보 객실 식사 정보는 필수 입력값 입니다.
            </Typography>
        </MainCard>
        
        <Grid container spacing={2}>

          <Grid item sm={6}>
            {/* 기본정보 */}
            <MainCard>
              <DefaultInfos/>
            </MainCard>
          </Grid>
          <Grid item sm={6}>
            {/* 참여인력 정보 */}
            <MainCard>
            < PersonInfos/>
            </MainCard>
          </Grid>
        </Grid>
      

      {/* 프로그램목록 */}
      <MainCard style={{marginTop : "20px"}}>
        <ProgramList/>
      </MainCard>
    
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <MainCard style={{marginTop : "20px"}}>
              {/* 객실 */}
              <RoomInfos/>
            </MainCard>
          </Grid>
          <Grid item sm={6}>
            <MainCard style={{marginTop : "20px"}}>
              {/* 식사 */}
              <MealInfos/>    
            </MainCard>
          </Grid>
        </Grid>
        
        
        <MainCard style={{marginTop : "20px"}}>
          <OpinionInfo/>
        </MainCard>

        <MainCard style={{marginTop : "20px"}}>
            <Typography variant="body1">
              ※ 금액정보는 기본값 0원이 입력됩니다.
            </Typography>
        </MainCard>
        {/* 지출금액 */}
        <ExpenseAmount/>

        {/* 수입금액 */}
        <MainCard style={{marginTop : "20px"}}>
          <Income/>
        </MainCard>



      
        <BtnArea/>
  </>)


}
export default InsertOperateResult


