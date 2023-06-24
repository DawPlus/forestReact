import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'moment/locale/ko';
import { FormControl } from "@mui/material";
import moment from "moment/moment";

// Date Picker
const DatePickerComponent = (props)=>{
    const {label, onChange, name, value} = props;
    

    const onDateChange = name => value =>{
        const _val = value.format("YYYY-MM-DD")
        onChange(name, _val)
    }

    const now = moment().format("YYYY-MM-DD");

    return (<>
        <FormControl fullWidth variant="outlined" required={false} className="noneRed">
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ko">
                <DatePicker format="YYYY-MM-DD" value={value} defaultValue={now} label={label} onChange={onDateChange(name)}/>
            </LocalizationProvider>
        </FormControl>
    </>);

}
export default DatePickerComponent;