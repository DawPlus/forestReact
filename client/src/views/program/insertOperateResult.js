import React , {useState} from "react";
import { useTheme } from '@mui/material/styles';
import {  FormControl,  Grid,  OutlinedInput , InputLabel, Button,   Popover} from '@mui/material';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import koLocale from "date-fns/locale/ko";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import moment from "moment"
const InsertOperateResult = ()=>{
   
    const [dateRange, setDateRange] = useState([
        {
          start: moment().toDate(),
          end: moment().toDate(),
        },
      ]);
      const [anchorEl, setAnchorEl] = useState(null);
    
      const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
    
return(<>

    <MainCard title="Sample Card">

        <form onSubmit={()=>{}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-title">단체명</InputLabel>
            <OutlinedInput
              id="outlined-adornment-title"
              type="text"
              name="title"
              label="제목"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-content">OM</InputLabel>
            <OutlinedInput
              id="outlined-adornment-content"
              type="text"
              name="content"
              multiline
              rows={5}
              label="내용"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-author">작성자</InputLabel>
            <OutlinedInput
              id="outlined-adornment-author"
              type="text"
              name="author"
              label="작성자"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <div className="App">
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="date-range-picker">기간</InputLabel>
                    <OutlinedInput
                    id="date-range-picker"
                    type="text"
                    name="daterange"
                    label="기간"
                    onClick={handleOpen}
                    value={`${dateRange[0].start.toLocaleDateString()} - ${dateRange[0].end.toLocaleDateString()}`}
                    />
                </FormControl>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                    }}
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                    }}
                >
                     <DateRangePicker
                        onChange={(item) => {
                         
                         setDateRange([{
                            start : item.range1.startDate, 
                            end : item.range1.endDate
                        }])
                         
                        }}
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={dateRange}
                        direction="horizontal"
                        locale={koLocale}
                        />
                </Popover>
            </div>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            등록
          </Button>
        </Grid>
      </Grid>
    </form>
        
    </MainCard>

</>)


}
export default InsertOperateResult


