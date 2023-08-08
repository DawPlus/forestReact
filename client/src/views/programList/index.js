import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from "ui-component/dataGrid"
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/programListReducer";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DatePicker from "ui-component/inputs/datePicker";

import Report from "./report"
import Swal from "sweetalert2";
import {Grid, Button,} from '@mui/material';
import { useState } from "react";

const ProgramList = () => {
  // Dispatch
  const dispatch = useDispatch();

  const rows = useSelector(s=> getState(s).rows);
  const tabIndex = useSelector(s=> getState(s).tabIndex);
  const AGENCY = useSelector(s=> getState(s).detailInfo.AGENCY);


  const onClick = (data)=>{
    dispatch(actions.getDetail({seq : data[0] , agency : data[2], openday : data[3]}))
  }

  const columns = [
    { name : "BASIC_INFO_SEQ" ,   options: {
      filter : false,
      display: false,
    }},
    { name: "index", label: "번호", options : {  filter : false} },
    { name: "AGENCY", label: "단체명"},
    { name: "OPENDAY", label: "시작일"},
    { name: "ENDDAY", label: "종료일"},
    { name: "SERVICE_TYPE", label: "서비스유형"},
    { name: "totalPeople", label: "인원수"},
    { name: "OM", label: "OM"},
    
    { name: "actions", label: " ", 
      options: {
        filter : false,
        customBodyRender: (_, tableMeta, _u) => {
          const data = tableMeta.rowData;
          return ( <button style={{ boxShadow: "none", }} onClick={()=>onClick(data)} >상세보기</button> );
        },
      },
    },
  ];
  React.useEffect(()=>{
    // 목록조회 
    dispatch(actions.getList());

    return ()=>{
      dispatch(actions.initState())
    }

  },[])
  

  const handleChange = (_, newValue) => {

    if(AGENCY === ""){
      Swal.fire({ icon: 'warning', title: '확인', text: "조회된 운영결과보고가 없습니다. [상세보기] 를 통해 조회해 주십시오." })
      return;
    }

    dispatch(actions.setValue({key : "tabIndex", value : newValue}))
  };


  const [openDay , setOpenDay] = useState("");
  const [endDay , setEndDay] = useState("");

  const onSearch = ()=>{
    // 목록조회 
    dispatch(actions.getList({openDay, endDay}));
  }
  const onReset = ()=>{
    
      Swal.fire({
        icon: 'warning',
        title: '조회조건 초기화',
        text: `조회조건을 초기화 하시겠습니까? ` ,
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText : "취소"
    }).then((result) => {    
        if (result.isConfirmed) {
          setOpenDay(s=> "")
          setEndDay(s=> "")
          dispatch(actions.getList());
        } 
    })
      
  }


  return (
    <>
      <MainCard>
          <Grid item container xs={12} spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
              <Grid item  xs={3} >
                  <DatePicker label="시작일"name="OPENDAY" value={openDay} onChange={(_, value)=>setOpenDay(value)}/>
              </Grid>
              <Grid item  xs={3}>
                  <DatePicker label="종료일" name="ENDDAY" value={endDay} onChange={(_, value)=> setEndDay(value)}/>
              </Grid>
              <Grid item  xs={6}>
                <div style={{textAlign:"right"}}>
                  <Button variant="contained" color="primary" type="submit" onClick={onSearch} style={{marginRight : "10px"}}>
                      조회        
                  </Button>
                  <Button variant="contained" color="warning" type="submit" onClick={onReset} >
                      초기화        
                  </Button>
                </div>
              </Grid>
          </Grid>
      </MainCard>
      <MainCard style={{marginTop : "10px"}}>
        <TabContext value={tabIndex}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="운영결과보고검색" value="1" />
              <Tab label="결과보고서" value="2" />
            </TabList>
          <TabPanel value="1">
              {rows.length >0 && <div>조회된 단체수 : {rows.length}</div>}
              <DataGrid  data={rows} columns={columns} />
          </TabPanel>
          <TabPanel value="2">
            <Report/>
          </TabPanel>
        </TabContext>
        
      </MainCard>
    </>
  );
};

export default ProgramList;
