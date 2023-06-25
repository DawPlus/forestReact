import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ko";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment"
dayjs.locale("ko");
dayjs.extend(localizedFormat);

// Date Picker
const DatePickerComponent = (props) => {
    const { label, onChange, name, value } = props;

    const onDateChange = (name) => (value) => {
        const _val = value.format("YYYY-MM-DD");
        onChange(name, _val);
    };

    return (
        <>
            <FormControl fullWidth variant="outlined" required={false} className="noneRed">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format="YYYY-MM-DD" value={moment(value)} label={label} onChange={onDateChange(name)} />
            </LocalizationProvider>
            </FormControl>
        </>
    );
};

export default React.memo(DatePickerComponent);
