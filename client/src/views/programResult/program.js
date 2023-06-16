import React , {memo, useMemo}from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/styles';

import { getState} from "store/reducers/programResultReducer"
import {  useSelector } from "react-redux";
import Button from '@mui/material/Button';

import useDownloadExcel from "utils/useDownloadExcel";
import { generateMergeInfo } from "utils/utils";
const useStyles = makeStyles({
    paper: {
        borderRadius: 0
    }
    });

const Program = ()=>{

    const classes = useStyles();
    
    const {programResult, agency} = useSelector(s=> getState(s))
    
    const [ AVG1, AVG2, AVG3, AVG4, AVG5, AVG6, AVG7, AVG8, AVG9, AVG10, AVG11, AVG12] = useMemo(()=>{
        return [ "SCORE1", "SCORE2", "SCORE3", "SCORE4", "SCORE5", "SCORE6", "SCORE7", "SCORE8", "SCORE9", "sum1","sum2","sum3"].map(k => {
            const sum = programResult.reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / programResult.length).toFixed(2);
        });
    },[programResult])

    const headerInfo = [
        ['ID', '프로그램명', '강사명', '장소', '강사', '강사', '강사', '구성/품질', '구성/품질', '구성/품질', '효과성', '효과성', '효과성', '기타의견', '평균', '평균', '평균'],
        ['', '', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '', '강사', '구성품질', '효과성']
    ]
    const merges = generateMergeInfo(headerInfo);
    const cellData = programResult.map((item,idx) => Object.values({
        idx: idx + 1,
        PROGRAM_NAME: item.PROGRAM_NAME,
        TEACHER: item.TEACHER,
        PLACE: item.PLACE,
        SCORE1: item.SCORE1,
        SCORE2: item.SCORE2,
        SCORE3: item.SCORE3,
        SCORE4: item.SCORE4,
        SCORE5: item.SCORE5,
        SCORE6: item.SCORE6,
        SCORE7: item.SCORE7,
        SCORE8: item.SCORE8,
        SCORE9: item.SCORE9,
        ETC_OPINION: item.ETC_OPINION,
        sum1: item.sum1,
        sum2: item.sum2,
        sum3: item.sum3,
    }));

    const avgData = [ "", "", "", "통계", AVG1, AVG2, AVG3, AVG4, AVG5, AVG6, AVG7, AVG8, AVG9, "-", AVG10, AVG11, AVG12]

    // // Merge cells
    // const merges2 = [
    //     { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, 
    //     { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, 
    //     { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, 
    //     { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, 
    //     { s: { r: 0, c: 4 }, e: { r: 0, c: 6 } }, 
    //     { s: { r: 0, c: 7 }, e: { r: 0, c: 9 } }, 
    //     { s: { r: 0, c: 10 }, e: { r: 0, c: 12 } }, 
    //     { s: { r: 0, c: 13 }, e: { r: 1, c: 13 } }, 
    //     { s: { r: 0, c: 14 }, e: { r: 0, c: 16 } }, 
    // ];

    var wscols = [ {wch:8}, {wch:25}, {wch:15}, {wch:17}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:15}, {wch:10}, {wch:15}, {wch:10}];        
    
    const downloadExcel = useDownloadExcel({headerInfo, cellData, avgData, filename  : agency, merges, wscols});

    return <>
            {programResult.length > 0 ? 
            <>
            <div style={{padding : "10px 0px", textAlign:"right"}}>
                <Button variant="contained" color="primary" size="small" onClick={downloadExcel} >Excel 다운로드</Button>
            </div>
            <TableContainer component={Paper} className={classes.paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small" className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header" rowSpan={2} align="center">ID</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">프로그램명</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">강사명</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">장소</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">강사</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">구성/품질</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">효과성</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">기타의견</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">평균</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-header" align="center">문항1</TableCell>
                            <TableCell className="table-header" align="center">문항2</TableCell>
                            <TableCell className="table-header" align="center">문항3</TableCell>
                            <TableCell className="table-header" align="center">문항4</TableCell>
                            <TableCell className="table-header" align="center">문항5</TableCell>
                            <TableCell className="table-header" align="center">문항6</TableCell>
                            <TableCell className="table-header" align="center">문항7</TableCell>
                            <TableCell className="table-header" align="center">문항8</TableCell>
                            <TableCell className="table-header" align="center">문항9</TableCell>
                            <TableCell className="table-header" align="center">강사</TableCell>
                            <TableCell className="table-header" align="center">구성품질</TableCell>
                            <TableCell className="table-header" align="center">효과성</TableCell>
                        </TableRow>
                    </TableHead>
                        
                    <TableBody>
                    {programResult.map((row, index) => {
                        
                        return <TableRow key={index}>
                                <TableCell className="table-cell" align="center">{index + 1}</TableCell>
                                <TableCell className="table-cell" align="center">{row.PROGRAM_NAME}</TableCell>
                                <TableCell className="table-cell" align="center">{row.TEACHER}</TableCell>
                                <TableCell className="table-cell" align="center">{row.PLACE}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE1}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE2}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE3}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE4}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE5}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE6}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE7}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE8}</TableCell>
                                <TableCell className="table-cell" align="center">{row.SCORE9}</TableCell>
                                <TableCell className="table-cell" align="center">{row.ETC_OPINION}</TableCell>
                                <TableCell className="table-cell" align="center">{row.sum1}</TableCell>
                                <TableCell className="table-cell" align="center">{row.sum2}</TableCell>
                                <TableCell className="table-cell" align="center">{row.sum3}</TableCell>
                                
                            </TableRow>
                    })}

                            <TableRow>
                                <TableCell className="table-result" align="center" colSpan={4}>통계</TableCell>
                                <TableCell className="table-result" align="center">{AVG1}</TableCell>
                                <TableCell className="table-result" align="center">{AVG2}</TableCell>
                                <TableCell className="table-result" align="center">{AVG3}</TableCell>
                                <TableCell className="table-result" align="center">{AVG4}</TableCell>
                                <TableCell className="table-result" align="center">{AVG5}</TableCell>
                                <TableCell className="table-result" align="center">{AVG6}</TableCell>
                                <TableCell className="table-result" align="center">{AVG7}</TableCell>
                                <TableCell className="table-result" align="center">{AVG8}</TableCell>
                                <TableCell className="table-result" align="center">{AVG9}</TableCell>
                                <TableCell className="table-result" align="center">-</TableCell>
                                <TableCell className="table-result" align="center">{AVG10}</TableCell>
                                <TableCell className="table-result" align="center">{AVG11}</TableCell>
                                <TableCell className="table-result" align="center">{AVG12}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </>
            :<></>
        }
    </>

}
export default memo(Program)