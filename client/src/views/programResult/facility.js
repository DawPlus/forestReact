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
import { Typography } from "@mui/material";
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
        ] = useMemo(()=>{
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
            "sum7"


        ].map(k => {
            const sum = facilityList.reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / facilityList.length).toFixed(2);
        });
    },[facilityList])
    return <>
            {facilityList.length > 0 ? 
            <>
            <Typography variant="h5" component="h2" gutterBottom>
                {agency}
            </Typography>
            <TableContainer component={Paper} className={classes.paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small" className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header" rowSpan={2} align="center">순번</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">실시일자</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">기관명</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">참여프로그램</TableCell>
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
                    </TableBody>
                </Table>
            </TableContainer>
            </>
            :<></>
        }
    </>

}
export default memo(Program)