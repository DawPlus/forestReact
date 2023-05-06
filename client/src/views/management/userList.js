import { Grid } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/managementReducer"
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from 'ui-component/dataGrid';

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const UserHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const regUser = useSelector(s=>getState(s).regUser)

  useEffect(()=>{

    dispatch(actions.getRegUser());

  },[])

  const roleMap = {
    1: "승인대기",
    2: "직원",
    3: "관리자"
  };
  

  const columns = [
      {
        name: "index",
        label: "번호",
        options: {
          customBodyRender: (_, tableMeta, _updateValue) => {
            return ( <span>{tableMeta.rowIndex + 1}</span> );
          }
        }
      },
      { name: "user_id", label: "ID",},
      { name: "user_name", label: "이름", 
        options: {
          customBodyRender: (value, tableMeta) => {
            
          const butonStyle = {
              border: 0,
              background: 0,
              cursor: "pointer",
              color: "#000",
              "&:hover": {
                color: "tomato"
              }
          }
            return ( <button style={butonStyle}  onClick={()=>setSelectedRow(tableMeta.rowData)}>{value}</button> );
          }
        }
      },
      { name: "value", label: "권한", 
        options: {
          customBodyRender: (value, tableMeta) => roleMap[value] || value
      }
    }
  ];


  const [selectedRow, setSelectedRow] = useState({});

  
  console.log(selectedRow)
  return (
    <MainCard>
       <Grid container spacing={2}>
        <Grid item xs={3}>
          {selectedRow.username && (
            <div className={classes.paper}>
              <p>ID: {selectedRow.id}</p>
              <p>Username: {selectedRow.username}</p>
              <p>Role: {selectedRow.role}</p>
            </div>
          )}
        </Grid>
        <Grid item xs={9}>
          <DataGrid   data={regUser} columns={columns}  />
        </Grid>
      </Grid>
    </MainCard>
  );
}
export default UserHistory