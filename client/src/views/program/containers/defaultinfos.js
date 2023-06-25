import React  from "react";

import {Grid} from '@mui/material';
import {  Input, Select, CheckBox } from "ui-component/inputs";



const DefaultInfos = ()=>{
    return(
        <>  
            <Grid container spacing={2}>
                {/* 단체명 */}
                <Grid item xs={6}>
                    <Input name="title" label="단체명"/>
                </Grid>
                {/* OM */}
                <Grid item xs={6}>
                <Input name="title" label="OM"/>
                </Grid>
                {/* 참여일 */}
                <Grid item container xs={6} spacing={2}>
                <Grid item  xs={6} >
                    {/* <DatePicker label="참여시작일"/> */}
                </Grid>
                <Grid item  xs={6}>
                    {/* <DatePicker label="참여종료일"/> */}
                </Grid>
                </Grid>

                <Grid item xs={6}>
                <Input name="title" label="체류기간(일) - 자동계산" readOnly={true} value="12일" />
                </Grid>

                <Grid item container xs={6} spacing={2} alignItems="center">
                <Grid item  xs={8} >
                    <Select label="거주지역" name="test" options={["서울", "부산"]}/>
                    </Grid>
                    <Grid item  xs={4}>
                        <CheckBox label="폐광지역" style={{ alignItems: 'center' }} />
                    </Grid>          
                </Grid>
            </Grid>
        </>



    );


}
export default DefaultInfos;