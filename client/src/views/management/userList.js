import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, InputLabel} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useDispatch, useSelector } from 'react-redux';
import {actions, getState} from "store/reducers/managementReducer"
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import { blue } from '@mui/material/colors';
import { client } from 'utils/callApi';

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
  const regUser = useSelector(s=>getState(s).regUser);
  const [user , setUser] = React.useState(null);

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
    dispatch(actions.setValue({
      key : "regUser", 
      value : regUser.map(i=> ({...i, chk : i.user_id === row.user_id ? true : false}))
    }))
    setUser(row)
  }

  // 변경 이벤트 
  const onChangeValue = (e)=>{
    if(user.value === "3"){
      Swal.fire({
          title: `[${user.user_name}] 권한변경`,
          text: `관리자의 권한은 변경 할 수 없습니다.` ,
          icon: 'warning',
      })
      return;
    }
    

    setUser({
      ...user, 
      value : e.target.value
    })
  }


  // 수정 
  const onSave = ()=>{




      Swal.fire({
        title: `[${user.user_name}] 권한변경`,
        text: `사용자의 권한을 변경하시겠습니까?` ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#767676',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
    }).then((result) => {
    
        if(result.isConfirmed){
            client({ url : "/management/updateRegUser", withCredentials : true, data : {
              userId : user.user_id, 
              value : user.value
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
        // 관리자 삭제 불가 
        if(user.value === "3"){
          Swal.fire({ title: `관리자 삭제 `, text: `관리자는 삭제 할 수 없습니다. ` , icon: 'error'});
          return ;
        }
        Swal.fire({
          title: `[${user.user_name}] 사용자 삭제`,
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
                userId : user.user_id, 
              } })
              .then(r => {
                  if(r.data?.result){
                      Swal.fire({
                          icon: 'success',
                          title: '확인',
                          text: "사용자가 삭제 되었습니다.",
                          }).then(()=>{
                            dispatch(actions.getRegUser());
                            setUser(null)
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
              {regUser.map((row, index) => (
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
          {user && 
          <Card sx={{ minWidth: 275 }} style={{  border: '1px solid #e1e1e1', borderRadius: '5px', padding: '10px', height : "100%" }}>
          <CardHeader 
            avatar={ <Avatar sx={{ bgcolor: blue[100] }} aria-label="recipe">{user.user_name.substring(0,1)}</Avatar> } 
            title={user.user_name}
            subheader={<>ID : {user.user_id}</>}
            style={{ textAlign: 'left' }}
          />
          <CardContent>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">권한</InputLabel>
              <Select labelId="demo-select-small-label" id="demo-select-small" value={user.value} label="권한" onChange={onChangeValue} >
                <MenuItem value={1}>승인대기</MenuItem>
                <MenuItem value={2}>직원</MenuItem>
                <MenuItem value={3}>관리자</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions style={{paddingLeft : "35px"}}>
            <Button variant="contained" color="primary" onClick={onSave} >변경사항저장</Button>
            <Button variant="contained" color="inherit" onClick={onDelete} >회원삭제</Button>
          </CardActions>
        </Card>

          }
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Member;


