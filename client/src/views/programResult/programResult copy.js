import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@material-ui/styles';
import Paper from '@mui/material/Paper';
import { getState} from "store/reducers/programResultReducer"
import {  useSelector } from "react-redux";
import useDownloadExcel from "utils/useDownloadExcel";
import Button from '@mui/material/Button';
import { generateMergeInfo } from "utils/utils";
import DynamicTableHead from "ui-component/DynamicTableHead";
import AverageRow from "ui-component/DynamicTableAvg";
const useStyles = makeStyles({
    paper: {
        borderRadius: 0
    }
    });

const ProgramResult = ()=>{ 

    const {rows } = useSelector(s=> getState(s).searchResult)
    
    const classes = useStyles();

    const [ TOTAL1, TOTAL2, TOTAL3, TOTAL4, TOTAL5, TOTAL6, TOTAL7, TOTAL8, TOTAL9, TOTAL10, TOTAL11, TOTAL12, TOTAL13] = React.useMemo(()=>{
        return [ "SCORE1", "SCORE2", "SCORE3", "SCORE4", "SCORE5", "SCORE6", "SCORE7", "SCORE8", "SCORE9", "avg1","avg2","avg3", "avg4"].map(k => {
            const sum = rows.reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / rows.length).toFixed(2);
        });
    },[rows])


    const headerInfo = [
        ['주제어1', '주제어2', '주제어3', '강사', '강사', '강사', '강사', '내용구성', '내용구성', '내용구성', '내용구성', '효과성', '효과성', '효과성', '효과성', '평균'],
        ['', '', '',  '전문성', '성실성', '반응성', '평균', '체계성', '적합성', '흥미성', '평균', '학습성', '재참여', '추천', '평균', '']
    ]
    const dataCell = ['keyword0', 'keyword1', 'keyword2', 'SCORE1', 'SCORE2', 'SCORE3', 'avg1', 'SCORE4', 'SCORE5', 'SCORE6', 'avg2', 'SCORE7', 'SCORE8', 'SCORE9', 'avg3', 'avg4'];
    const avgCell = [ "", "",  "통계", "SCORE1", "SCORE2", "SCORE3", "SCORE4", "SCORE5", "SCORE6", "SCORE7", "SCORE8", "SCORE9", "avg1","avg2","avg3", "avg4"]

    const avgData = [ "", "",  "통계", TOTAL1, TOTAL2, TOTAL3, TOTAL4, TOTAL5, TOTAL6, TOTAL7, TOTAL8, TOTAL9, TOTAL10, TOTAL11, TOTAL12, TOTAL13]
    
    const merges = generateMergeInfo(headerInfo);
    
    var wscols = [ {wch:20}, {wch:20}, {wch:20}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:15}, {wch:10}, {wch:15}, {wch:10}];
    
    const cellData = rows.map((item) => {
        let filteredData = [];
        dataCell.forEach((cellKey) => {
            filteredData.push(item[cellKey]);
        });
        return filteredData;
    });
    
    
    const downloadExcel = useDownloadExcel({headerInfo, cellData, avgData, merges, wscols});
    
    
    return <>
            <div style={{padding : "10px 0px", textAlign:"right"}}>
                <Button variant="contained" color="primary" size="small" onClick={downloadExcel} >Excel 다운로드</Button>
            </div>
            <TableContainer component={Paper} className={classes.paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small" className="custom-table">
                    <DynamicTableHead headerInfo={headerInfo}/>
                    <TableBody>
                        {rows.map((i, idx) =>
                            <TableRow key={idx}>
                                {dataCell.map((cellKey) => 
                                <TableCell className="table-cell" align="center" key={cellKey}>
                                    {i[cellKey]}
                                </TableCell>
                                )}
                            </TableRow>
                        )}
                        <AverageRow rows={rows} avgCell={avgCell}/>
                    </TableBody>
                </Table>
            </TableContainer>
    </>

}
export default ProgramResult; 