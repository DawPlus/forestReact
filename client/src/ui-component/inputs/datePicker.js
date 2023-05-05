import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'moment/locale/ko';
import { FormControl } from "@mui/material";

// Date Picker
const DatePickerComponent = (props)=>{
    const {label} = props;
    
    return (<>
        <FormControl fullWidth variant="outlined">
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ko">
                <DatePicker format="YYYY-MM-DD"  label={label}/>
            </LocalizationProvider>
        </FormControl>
    </>);

}
export default DatePickerComponent;