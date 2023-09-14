import React, { useEffect } from 'react';

import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {  Input , SelectItems  } from "ui-component/inputs";
import { useDispatch, useSelector } from 'react-redux';
import {actions, getState} from "store/reducers/managementReducer"
import { makeStyles } from "@mui/styles";
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';


import { blue } from '@mui/material/colors';
import  callApi, { client } from 'utils/callApi';
import { Grid } from '@mui/material';


const items = [
  {label : "승인대기", value : "1"},
  {label : "직원", value : "2"},
  {label : "관리자", value : "3"},
]

const useStyles = makeStyles({
  tableContainer: {
    borderRadius : "5px"
  },
  table: {
    minWidth: 500,
    borderTop : "1px #e1e1e1 solid",
    borderBottom : "1px #e1e1e1 solid"
  },
  tableHead: {
    backgroundColor: '#d5d5d5',
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#eaf6ff',
    },
  },
});

const Member = () => {
  

  const classes = useStyles();
  const dispatch = useDispatch();
  const userMng = useSelector(s=>getState(s).userMng);
  
  const {
    displayName,
    user_id, 
    user_name, 
    user_pwd,
    user_pwd_check,
    value, 
  } = userMng.detail; 

  useEffect(()=>{
    dispatch(actions.getRegUser());
    return ()=>{
      dispatch(actions.initState())
    }
  },[])


  const roleMap = {
    1: "승인대기",
    2: "직원",
    3: "관리자"
  };


  const onRowClick= (row)=>{
    const _rows = userMng.rows.map(i=> ({...i, chk : i.user_id === row.user_id ? true : false}));
    dispatch(actions.setValue({
      key : "userMng", 
      value : {
        ...userMng, 
        rows : _rows, 
        detail : {
          ...userMng.detail,
          ...row,
          user_pwd_check : row.user_pwd,
          displayName : row.user_name,
        }
      }
    }))
    
  }

  // 변경 이벤트 
  const onChangeValue = (e)=>{
    // if(value === "3"){
    //   Swal.fire({
    //       title: `[${user_name}] 권한변경`,
    //       text: `관리자의 권한은 변경 할 수 없습니다.` ,
    //       icon: 'warning',
    //   })
    //   return;
    // }

    dispatch(actions.onChangeUserDetailInfo({
      key : "value", 
      value : e.target.value
    }))

  }

  const onChange= (e)=>{

    dispatch(actions.onChangeUserDetailInfo({
      key : e.target.name, 
      value : e.target.value
    }))
  }


  // 수정 
  const onSave = ()=>{
      if(!user_name){
        Swal.fire({ title: `확인`, text: `사용자를 선택해 주십시오` , icon: 'warning', })
        return;
      }
      if(user_pwd !== user_pwd_check){
        Swal.fire({ title: `확인`, text: `비밀번호를 확인해 주십시오.(확인과 다릅니다.)` , icon: 'warning' })
        return;
      }



      Swal.fire({
        title: `[${user_name}] 사용자 정보변경`,
        text: `사용자의 정보를 변경하시겠습니까?` ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#767676',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
    }).then((result) => {
    
        if(result.isConfirmed){
            client({ url : "/management/updateRegUser", withCredentials : true, data : {
              data : {...userMng.detail}
            } })
            .then(r => {
                if(r.data?.result){
                    Swal.fire({
                        icon: 'success',
                        title: '확인',
                        text: "정상 등록 되었습니다.",
                        }).then(()=>{
                          dispatch(actions.getRegUser());
                        })
                }
            })
        }
    })
  }


  // 회원 삭제
  const onDelete = ()=>{

        if(!user_name){
          Swal.fire({ title: `확인`, text: `사용자를 선택해 주십시오` , icon: 'warning', })
          return;
        }

        // 관리자 삭제 불가 
        if(value === "3"){
          Swal.fire({ title: `관리자 삭제 `, text: `관리자는 삭제 할 수 없습니다. ` , icon: 'error'});
          return ;
        }
        Swal.fire({
          title: `[${user_name}] 사용자 삭제`,
          text: `사용자를 삭제 하시겠습니까? ` ,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#767676',
          confirmButtonText: '확인',
          cancelButtonText: '취소'
      }).then((result) => {
      
          if(result.isConfirmed){
              client({ url : "/management/deleteRegUser", withCredentials : true, data : {
                userId : user_id, 
              } })
              .then(r => {
                  if(r.data?.result){
                      Swal.fire({
                          icon: 'success',
                          title: '확인',
                          text: "사용자가 삭제 되었습니다.",
                          }).then(()=>{
                            dispatch(actions.getRegUser());
                            
                          })
                  }
              })
          }
      })
  }

  const onReset = ()=>{
    if(!user_name){
      Swal.fire({ title: `확인`, text: `사용자를 선택해 주십시오` , icon: 'warning', })
      return;
    }


    Swal.fire({
      title: `[${user_name}] 비밀번호 초기화 `,
      text: `비밀번호를 초기화 하시겠습니까? ` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#767676',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
  }).then((result) => {
  
      if(result.isConfirmed){
            callApi("/management/resetPassword", {user_id}).then(({data})=>{
              if(data.result){
                Swal.fire({ title: `확인`, text: `비밀번호가 초기화 되었습니다. ` , icon: 'success'}).then(()=>{
                  dispatch(actions.getRegUser());
                })
              }
            })
          
      }
  })
  }

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
        <TableContainer className={classes.tableContainer} >
          <Table className={classes.table} sx={{ minWidth: 500 }} >
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>순서</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>권한</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userMng.rows.map((row, index) => (
                <TableRow key={row.user_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className={classes.tableRow} 
                        style={row.chk ? {backgroundColor: '#eaf6ff'} : {}}
                        onClick={ e=> onRowClick(row)}>
                  <TableCell  className={classes.tableCell} component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.user_id}</TableCell>
                  <TableCell className={classes.tableCell}>{row.user_name}</TableCell>
                  <TableCell className={classes.tableCell}>{roleMap[row.value]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>

        <Grid item xs={12} sm={4}>
          
          <Card sx={{ minWidth: 275 }} style={{  border: '1px solid #e1e1e1', borderRadius: '5px', padding: '10px', height : "100%" }}>
          <CardHeader 
            avatar={ <Avatar sx={{ bgcolor: blue[100] }} aria-label="recipe">{user_name.substring(0,1)}</Avatar> } 
            title={displayName}
            subheader={<>ID : {user_id}</>}
            style={{ textAlign: 'left' }}
          />
          <CardContent>
            <Grid container spacing={2}>
                <Grid item md={12}>
                  <SelectItems label="권한" name="value" items={items} value={value} onChange={onChangeValue}/>     
                </Grid>
                <Grid item md={12}>
                  <Input name="user_name" label="이름"  value={user_name} onChange={onChange}/>  
                </Grid>
                <Grid item md={12}>
                  <Input name="user_pwd"  type="password" label="비밀번호"   value={user_pwd} onChange={onChange}/>  
                </Grid>
                <Grid item md={12}>
                  <Input name="user_pwd_check"  type="password" label="확인"   value={user_pwd_check} onChange={onChange}/>  
                </Grid>
                
            </Grid>
            
          
            


          </CardContent>
          <CardActions style={{paddingLeft : "35px"}}>
            <Button variant="contained" color="primary" onClick={onSave} >변경사항저장</Button>
            <Button variant="contained" color="inherit" onClick={onDelete} >회원삭제</Button>
            <Button variant="contained" color="inherit" onClick={onReset} >비밀번호초기화</Button>
          </CardActions>
        </Card>

          
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Member;


