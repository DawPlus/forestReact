import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from "ui-component/dataGrid"
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/programListReducer";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import Report from "./report"
import Swal from "sweetalert2";

const ProgramList = () => {
  // Dispatch
  const dispatch = useDispatch();

  const rows = useSelector(s=> getState(s).rows);
  const tabIndex = useSelector(s=> getState(s).tabIndex);
  const AGENCY = useSelector(s=> getState(s).detailInfo.AGENCY);


  const onClick = (data)=>{
    dispatch(actions.getDetail({seq : data[0] , agency : data[1], openday : data[2]}))
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

  return (

    <MainCard>
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
  );
};

export default ProgramList;
