import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from "ui-component/dataGrid"
import { useDispatch, useSelector } from "react-redux";
import { actions, getState } from "store/reducers/programReducer";


const ProgramList = () => {
  // Dispatch
  const dispatch = useDispatch();

  const {rows} = useSelector(s=> getState(s));


  const onClick = (data)=>{
    console.log(data)
  }

  const columns = [
    {
      name: "index",
      label: "번호",
      options: {
        customBodyRender: (_, tableMeta, _updateValue) => {
          return (
            <span>{tableMeta.rowIndex + 1}</span>
          );
        }
      }
    },
    { name: "AGENCY", label: "단체명"},
    { name: "OPENDAY", label: "시작일"},
    { name: "ENDDAY", label: "종료일"},
    { name: "ROOM_PART_PEOPLE", label: "인원수"},
    { name: "OM", label: "OM"},
    { name: "actions", label: " ", filter : false, 
      options: {
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
  },[])
  

  return (
    <MainCard>
      <DataGrid title="운영결과 보고검색" data={rows} columns={columns} />
    </MainCard>
  );
};

export default ProgramList;
