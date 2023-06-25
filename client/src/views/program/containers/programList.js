import React , {useState }from "react";

import {Grid, Button} from '@mui/material';
import {  Input, Select, } from "ui-component/inputs";
import { styled } from '@mui/material/styles';

// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";


const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "17px"
}));


const ProgramListContainer = ()=>{
    

    const [list , setList] = useState([
        {id : "1" , programName : "", col1 : "", col2 : "", col3 : "", col4 : ""  }
    ]);

    const items = ["예방교육", "산림교육", "산림치유", "아트", "릴렉싱", "에너제틱", "쿠킹", "이벤트"];


    const onAdd = ()=>{
        if (list.length >= 7) {
            Swal.fire({
                icon: 'warning',
                title: '확인',
                text: "프로그램은 7개 까지만 추가 할 수 있습니다. ",
                });
            return;
        }

        setList([...list, 
            {id : uuidv4() , programName : "", col1 : "", col2 : "", col3 : "", col4 : ""  }
        ])
    }

    const onRemove = () =>{
        if (list.length === 1) {
            return;
        }

        setList(list.slice(0, list.length -1))

    }

    return(
        <>
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" style={{ marginTop: '50px' }}>
                <Grid item xs={8}>
                    <Div alignItems="center">프로그램</Div>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2}     justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onAdd}>
                        추가
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" startIcon={<RemoveIcon />} onClick={onRemove}>
                        삭제
                        </Button>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {list.map((i)=> 
                    <Grid item container xs={12} spacing={2} alignItems="center" key={i.id} >
                        <Grid item  xs={4} >  
                            <Input name="title" label="프로그램명" />
                        </Grid>
            
                        <Grid item  xs={2} >  
                            <Select label="분야" name="test" options={items}/>
                        </Grid>
                        <Grid item  xs={2} >  
                            <Input name="title" label="강사명" />
                        </Grid>
                        <Grid item  xs={2} >  
                            <Input name="title" label="내부강사" type="number"/>
                        </Grid>

                        <Grid item  xs={2} >  
                            <Input name="title" label="외부강사" type="number"/>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>



    );


}
export default ProgramListContainer;