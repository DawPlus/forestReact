import React , {memo, useMemo}from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@mui/styles";

import { getState} from "store/reducers/programResultReducer"
import {  useSelector } from "react-redux";
import Button from '@mui/material/Button';
import useDownloadExcel from "utils/useDownloadExcel";
const useStyles = makeStyles({
    paper: {
        borderRadius: 0
    }
    });

const Program = ()=>{
    const classes = useStyles();
    
    const {facilityList, agency} = useSelector(s=> getState(s))
    const [
        AVG1,
        AVG2,
        AVG3,
        AVG4,
        AVG5,
        AVG6,
        AVG7,
        AVG8,
        AVG9,
        AVG10,
        AVG11,
        AVG12,
        AVG13,
        AVG14,
        AVG15,
        AVG16,
        AVG17,
        AVG18,
        SUMAVG1,
        SUMAVG2,
        SUMAVG3,
        SUMAVG4,
        SUMAVG5,
        SUMAVG6,
        SUMAVG7,
    ] = useMemo(() => {
        return [
            "SCORE1",
            "SCORE2",
            "SCORE3",
            "SCORE4",
            "SCORE5",
            "SCORE6",
            "SCORE7",
            "SCORE8",
            "SCORE9",
            "SCORE10",
            "SCORE11",
            "SCORE12",
            "SCORE13",
            "SCORE14",
            "SCORE15",
            "SCORE16",
            "SCORE17",
            "SCORE18",
            "sum1",
            "sum2",
            "sum3",
            "sum4",
            "sum5",
            "sum6",
            "sum7",
        ].map(k => {
            const nonEmptyValues = facilityList.filter(item => item[k] !== "");
            const sum = nonEmptyValues.reduce((a, c) => a + parseFloat(c[k] || 0), 0);
    
            const average = sum / nonEmptyValues.length;
            const formattedAverage = isNaN(average) ? "-" : average.toFixed(2);
            return formattedAverage;
        });
    }, [facilityList]);
    
    


    const headerInfo =[
            ["순번", "실시일자", "기관명", "참여일정", "성별", "연령", "거주지", "직업", "숙소","숙소", "식당","식당", "프로그램장소","프로그램장소","프로그램장소", "숲(야외)","숲(야외)","숲(야외)", "기타의견", "운영","운영","운영", "식사","식사","식사", "기타의견", "잠재적관광수요","잠재적관광수요", "평균","평균","평균","평균","평균","평균","평균"],
            ["","","","","","","","", "문항1", "문항2", "문항3", "문항4", "문항5", "문항6", "문항7", "문항8", "문항9", "문항10","", "문항1", "문항2", "문항3", "문항4", "문항5", "문항6","", "문항7", "문항8", "숙소", "식사", "프로그램장소", "숲(야외)", "운영", "식사", "잠재적관광수요"]
        ]
    const merges = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
        { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
        { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } },
        { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } },
        { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } },
        { s: { r: 0, c: 7 }, e: { r: 1, c: 7 } },
        { s: { r: 0, c: 8 }, e: { r: 0, c: 9 } },
        { s: { r: 0, c: 10 }, e: { r: 0, c: 11 } },
        { s: { r: 0, c: 12 }, e: { r: 0, c: 14 } },
        { s: { r: 0, c: 15 }, e: { r: 0, c: 17 } },
        { s: { r: 0, c: 18 }, e: { r: 0, c: 18 } },
        { s: { r: 0, c: 19 }, e: { r: 0, c: 21 } },
        { s: { r: 0, c: 22 }, e: { r: 0, c: 24 } },
        { s: { r: 0, c: 25 }, e: { r: 1, c: 25 } },
        { s: { r: 0, c: 26 }, e: { r: 0, c: 27 } },
        { s: { r: 0, c: 28 }, e: { r: 0, c: 34 } },
    ];
    
    const cellData = facilityList.map((item,idx) => Object.values({
        idx : idx + 1,
        OPENDAY : item.OPENDAY,
        AGENCY : item.AGENCY,
        PTCPROGRAM : item.PTCPROGRAM,
        SEX : item.SEX,
        AGE : item.AGE,
        RESIDENCE : item.RESIDENCE,
        JOB : item.JOB,
        SCORE1 : item.SCORE1,
        SCORE2 : item.SCORE2,
        SCORE3 : item.SCORE3,
        SCORE4 : item.SCORE4,
        SCORE5 : item.SCORE5,
        SCORE6 : item.SCORE6,
        SCORE7 : item.SCORE7,
        SCORE8 : item.SCORE8,
        SCORE9 : item.SCORE9,
        SCORE10 : item.SCORE10,
        FACILITY_OPINION : item.FACILITY_OPINION,
        SCORE11 : item.SCORE11,
        SCORE12 : item.SCORE12,
        SCORE13 : item.SCORE13,
        SCORE14 : item.SCORE14,
        SCORE15 : item.SCORE15,
        SCORE16 : item.SCORE16,
        OPERATION_OPINION : item.OPERATION_OPINION,
        SCORE17 : item.SCORE17,
        SCORE18 : item.SCORE18,
        sum1 : item.sum1,
        sum2 : item.sum2,
        sum3 : item.sum3,
        sum4 : item.sum4,
        sum5 : item.sum5,
        sum6 : item.sum6,
        sum7 : item.sum7
    }));

    const wscols = [ {wch:8}, {wch:15}, {wch:35}, {wch:17}, {wch:12}, {wch:12}, {wch:12}, {wch:15}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:25}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:15}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:13}, {wch:10}, {wch:10}, {wch:10}, {wch:15}, ];
    
    const avgData = ["","","통계","","","","", "평균", AVG1, AVG2, AVG3, AVG4, AVG5, AVG6, AVG7, AVG8, AVG9, AVG10, "-", AVG11, AVG12, AVG13, AVG14, AVG15, AVG16, "-", AVG17, AVG18, SUMAVG1, SUMAVG2, SUMAVG3, SUMAVG4, SUMAVG5, SUMAVG6, SUMAVG7];

    const downloadExcel = useDownloadExcel({headerInfo, cellData, avgData, filename  : agency, merges, wscols});


    return <>
            {facilityList.length > 0 ? 
            <>
            <div style={{padding : "10px 0px", textAlign:"right"}}>
                <Button variant="contained" color="primary" size="small" onClick={downloadExcel} >Excel 다운로드</Button>
            </div>
            <TableContainer component={Paper} className={classes.paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small" className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header" rowSpan={2} align="center">순번</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">실시일자</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">기관명</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">참여일정</TableCell>
                            <TableCell className="table-header" rowSpan={3} align="center">성별</TableCell>
                            <TableCell className="table-header" rowSpan={3} align="center">연령</TableCell>
                            <TableCell className="table-header" rowSpan={3} align="center">거주지</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">직업</TableCell>
                            <TableCell className="table-header" colSpan={2} align="center">숙소</TableCell>
                            <TableCell className="table-header" colSpan={2} align="center">식당</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">프로그램장소</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">숲(야외)</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">기타의견</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">운영</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">식사</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">기타의견</TableCell>
                            <TableCell className="table-header" colSpan={2} align="center">잠재적관광수요</TableCell>
                            <TableCell className="table-header" colSpan={7} align="center">평균</TableCell>
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
                            <TableCell className="table-header" align="center">문항10</TableCell>
                            <TableCell className="table-header" align="center">문항1</TableCell>
                            <TableCell className="table-header" align="center">문항2</TableCell>
                            <TableCell className="table-header" align="center">문항3</TableCell>
                            <TableCell className="table-header" align="center">문항4</TableCell>
                            <TableCell className="table-header" align="center">문항5</TableCell>
                            <TableCell className="table-header" align="center">문항6</TableCell>
                            <TableCell className="table-header" align="center">문항7</TableCell>
                            <TableCell className="table-header" align="center">문항8</TableCell>
                            <TableCell className="table-header" align="center">숙소</TableCell>
                            <TableCell className="table-header" align="center">식사</TableCell>
                            <TableCell className="table-header" align="center">프로그램장소</TableCell>
                            <TableCell className="table-header" align="center">숲(야외)</TableCell>
                            <TableCell className="table-header" align="center">운영</TableCell>
                            <TableCell className="table-header" align="center">식사</TableCell>
                            <TableCell className="table-header" align="center">잠재적관광수요</TableCell>
                        </TableRow>
                    </TableHead>      
                    <TableBody>
                        {/* 통계 */}
                        <TableRow>
                            <TableCell className="table-result" align="center" colSpan={7}>통계</TableCell>
                            <TableCell className="table-result" align="center" >평균</TableCell>
                            <TableCell className="table-result" align="center">{AVG1}</TableCell>
                            <TableCell className="table-result" align="center">{AVG2}</TableCell>
                            <TableCell className="table-result" align="center">{AVG3}</TableCell>
                            <TableCell className="table-result" align="center">{AVG4}</TableCell>
                            <TableCell className="table-result" align="center">{AVG5}</TableCell>
                            <TableCell className="table-result" align="center">{AVG6}</TableCell>
                            <TableCell className="table-result" align="center">{AVG7}</TableCell>
                            <TableCell className="table-result" align="center">{AVG8}</TableCell>
                            <TableCell className="table-result" align="center">{AVG9}</TableCell>
                            <TableCell className="table-result" align="center">{AVG10}</TableCell>
                            <TableCell className="table-result" align="center">-</TableCell>
                            <TableCell className="table-result" align="center">{AVG11}</TableCell>
                            <TableCell className="table-result" align="center">{AVG12}</TableCell>
                            <TableCell className="table-result" align="center">{AVG13}</TableCell>
                            <TableCell className="table-result" align="center">{AVG14}</TableCell>
                            <TableCell className="table-result" align="center">{AVG15}</TableCell>
                            <TableCell className="table-result" align="center">{AVG16}</TableCell>
                            <TableCell className="table-result" align="center">-</TableCell>
                            <TableCell className="table-result" align="center">{AVG17}</TableCell>
                            <TableCell className="table-result" align="center">{AVG18}</TableCell>

                            <TableCell className="table-result" align="center">{SUMAVG1}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG2}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG3}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG4}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG5}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG6}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG7}</TableCell>

                        </TableRow>
                        {facilityList.map((row, index) => {
                            return <TableRow key={index}>
                                        <TableCell className="table-cell" align="center">{index + 1}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.OPENDAY}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.AGENCY}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.PTCPROGRAM}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SEX}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.AGE}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.RESIDENCE}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.JOB}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE1}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE2}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE3}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE4}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE5}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE6}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE7}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE8}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE9}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE10}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.FACILITY_OPINION}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE11}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE12}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE13}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE14}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE15}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE16}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.OPERATION_OPINION}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE17}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE18}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum1}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum2}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum3}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum4}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum5}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum6}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum7}</TableCell>
                                </TableRow>
                        })}
                        
                    </TableBody>
                </Table>
            </TableContainer>
            </>
            :<></>
        }
    </>

}
export default memo(Program)