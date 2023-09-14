import React , {useMemo}from "react";
import { getState} from "store/reducers/programResultReducer"
import {  useSelector } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from "@mui/styles";
import Paper from '@mui/material/Paper';
import {useAvgDownloadExcel} from "utils/useDownloadExcel";
import Button from '@mui/material/Button';
import { generateMergeInfo } from "utils/utils";
import DynamicTableHead from "ui-component/DynamicTableHead";

const useStyles = makeStyles({
    paper: {
        borderRadius: 0
    }
});
const ProgramResult = ()=>{ 

    const {rows} = useSelector(s=> getState(s).searchResult)
    
    const headerInfo = [
        ['주제어1', '주제어2', '주제어3', '영역', '1.중독특징이해', '1.중독특징이해', '1.중독특징이해', '2.핵심증상이해', '2.핵심증상이해', '2.핵심증상이해', '3.문제대응방법이해', '3.문제대응방법이해', '3.문제대응방법이해', '3.문제대응방법이해', '4.활동역량', '4.활동역량', '5.심리적면역력강화법', '5.심리적면역력강화법', '5.심리적면역력강화법', '5.심리적면역력강화법', '5.심리적면역력강화법', '6.삶의질', '6.삶의질', '6.삶의질', '영역', '평균(0~6점)', '평균(0~6점)', '평균(0~6점)', '평균(0~6점)', '평균(0~6점)', '평균(0~6점)'],
        ['', '', '',  '평가시점', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '문항11', '문항12', '문항13', '문항14', '문항15', '문항16', '문항17', '문항18', '문항19', '문항20','평가시점', '중독특징이해','핵심증상이해', '문제대응방법', '활동역량', '심리적면역력강화법', '삶의질']
    ]
    const classes = useStyles();
    const [ AVG1, AVG2, AVG3, AVG4, AVG5, AVG6, AVG7, AVG8, AVG9, AVG10, AVG11, AVG12, AVG13, AVG14, AVG15, AVG16, AVG17, AVG18, AVG19, AVG20, SUMAVG1, SUMAVG2, SUMAVG3, SUMAVG4, SUMAVG5, SUMAVG6]=useMemo(
        ()=>{
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
            "SCORE19",
            "SCORE20",
            "sum1",
            "sum2",
            "sum3",
            "sum4",
            "sum5",
            "sum6"
        ].map(k => {
            const sum = rows.filter(i=> i.PV ==="사전").reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / rows.filter(i=> i.PV ==="사전").length).toFixed(2);
        });
    },[rows])


    const [ AVG1_A, AVG2_A, AVG3_A, AVG4_A, AVG5_A, AVG6_A, AVG7_A, AVG8_A, AVG9_A, AVG10_A, AVG11_A, AVG12_A, AVG13_A, AVG14_A, AVG15_A, AVG16_A, AVG17_A, AVG18_A, AVG19_A, AVG20_A, SUMAVG1_A, SUMAVG2_A, SUMAVG3_A, SUMAVG4_A, SUMAVG5_A, SUMAVG6_A]=useMemo(
        ()=>{
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
            "SCORE19",
            "SCORE20",
            "sum1",
            "sum2",
            "sum3",
            "sum4",
            "sum5",
            "sum6"
        ].map(k => {
            const sum = rows.filter(i=> i.PV ==="사후").reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / rows.filter(i=> i.PV ==="사후").length).toFixed(2);
        });
    },[rows])



    const cellData = rows.map((item,idx) => Object.values({
        keyword0 :  idx % 2=== 0 ?  item.keyword0  : "", 
        keyword1 :   idx % 2=== 0 ? item.keyword1 : "",
        keyword2 :   idx % 2=== 0 ? item.keyword2 : "",
        PV : item.PV,
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
        SCORE11 : item.SCORE11,
        SCORE12 : item.SCORE12,
        SCORE13 : item.SCORE13,
        SCORE14 : item.SCORE14,
        SCORE15 : item.SCORE15,
        SCORE16 : item.SCORE16,
        SCORE17 : item.SCORE17,
        SCORE18 : item.SCORE18,
        SCORE19 : item.SCORE19,
        SCORE20 : item.SCORE20,
        PVs : item.PV,
        sum1 : item.sum1,
        sum2 : item.sum2,
        sum3 : item.sum3,
        sum4 : item.sum4,
        sum5 : item.sum5,
        sum6 : item.sum6,
    }));
    

    // Merge Info 
    const merges = generateMergeInfo(headerInfo);
    const wscols = [ {wch:25}, {wch:20}, {wch:20}, {wch:12}, {wch:12}, {wch:15}, {wch:12}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:11}, {wch:11}, {wch:11}, {wch:13}, {wch:13}, {wch:11}, {wch:13} ];

    const avgData = [
        ["","","", "사전", AVG1, AVG2, AVG3, AVG4, AVG5, AVG6, AVG7, AVG8, AVG9, AVG10, AVG11, AVG12, AVG13, AVG14, AVG15, AVG16, AVG17, AVG18, AVG19, AVG20, "사전", SUMAVG1, SUMAVG2, SUMAVG3, SUMAVG4, SUMAVG5, SUMAVG6],
        ["통계","","평균","사후", AVG1_A, AVG2_A, AVG3_A, AVG4_A, AVG5_A, AVG6_A, AVG7_A, AVG8_A, AVG9_A, AVG10_A, AVG11_A, AVG12_A, AVG13_A, AVG14_A, AVG15_A, AVG16_A, AVG17_A, AVG18_A, AVG19_A, AVG20_A, "사후", SUMAVG1_A, SUMAVG2_A, SUMAVG3_A, SUMAVG4_A, SUMAVG5_A, SUMAVG6_A],
        ["","","","차이값", (AVG1_A- AVG1).toFixed(2), (AVG2_A- AVG2).toFixed(2), (AVG3_A- AVG3).toFixed(2), (AVG4_A- AVG4).toFixed(2), (AVG5_A- AVG5).toFixed(2), (AVG6_A- AVG6).toFixed(2), (AVG7_A- AVG7).toFixed(2), (AVG8_A- AVG8).toFixed(2), (AVG9_A- AVG9).toFixed(2), (AVG10_A- AVG10).toFixed(2), (AVG11_A- AVG11).toFixed(2), (AVG12_A- AVG12).toFixed(2), (AVG13_A- AVG13).toFixed(2), (AVG14_A- AVG14).toFixed(2), (AVG15_A- AVG15).toFixed(2), (AVG16_A- AVG16).toFixed(2), (AVG17_A- AVG17).toFixed(2), (AVG18_A- AVG18).toFixed(2), (AVG19_A- AVG19).toFixed(2), (AVG20_A- AVG20).toFixed(2), "차이값", (SUMAVG1_A - SUMAVG1).toFixed(2), (SUMAVG2_A - SUMAVG2).toFixed(2), (SUMAVG3_A - SUMAVG3).toFixed(2), (SUMAVG4_A - SUMAVG4).toFixed(2), (SUMAVG5_A - SUMAVG5).toFixed(2), (SUMAVG6_A - SUMAVG6).toFixed(2)]
]

    const downloadExcel = useAvgDownloadExcel({headerInfo, cellData, avgData, merges, wscols, type : "type2"});


    return <>
            <div style={{padding : "10px 0px", textAlign:"right"}}>
                <Button variant="contained" color="primary" size="small" onClick={downloadExcel} >Excel 다운로드</Button>
            </div>
            <TableContainer component={Paper} className={classes.paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small" className="custom-table">
                    <DynamicTableHead headerInfo={headerInfo}/> 
                    <TableBody>
                         {/* 통계 */}
                        <TableRow>
                            <TableCell className="table-result" align="center" colSpan={2} rowSpan={3}>통계</TableCell>
                            <TableCell className="table-result" align="center" rowSpan={3}>평균</TableCell>
                            <TableCell className="table-result" align="center">사전</TableCell>
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
                            <TableCell className="table-result" align="center">{AVG11}</TableCell>
                            <TableCell className="table-result" align="center">{AVG12}</TableCell>
                            <TableCell className="table-result" align="center">{AVG13}</TableCell>
                            <TableCell className="table-result" align="center">{AVG14}</TableCell>
                            <TableCell className="table-result" align="center">{AVG15}</TableCell>
                            <TableCell className="table-result" align="center">{AVG16}</TableCell>
                            <TableCell className="table-result" align="center">{AVG17}</TableCell>
                            <TableCell className="table-result" align="center">{AVG18}</TableCell>
                            <TableCell className="table-result" align="center">{AVG19}</TableCell>
                            <TableCell className="table-result" align="center">{AVG20}</TableCell>
                            <TableCell className="table-result" align="center">사전</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG1}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG2}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG3}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG4}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG5}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG6}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-result" align="center">사후</TableCell>
                            <TableCell className="table-result" align="center">{AVG1_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG2_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG3_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG4_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG5_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG6_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG7_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG8_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG9_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG10_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG11_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG12_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG13_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG14_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG15_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG16_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG17_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG18_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG19_A}</TableCell>
                            <TableCell className="table-result" align="center">{AVG20_A}</TableCell>
                            <TableCell className="table-result" align="center">사후</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG1_A}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG2_A}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG3_A}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG4_A}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG5_A}</TableCell>
                            <TableCell className="table-result" align="center">{SUMAVG6_A}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-result" align="center">차이값</TableCell>
                            <TableCell className="table-result" align="center">{(AVG1_A- AVG1).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG2_A- AVG2).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG3_A- AVG3).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG4_A- AVG4).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG5_A- AVG5).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG6_A- AVG6).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG7_A- AVG7).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG8_A- AVG8).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG9_A- AVG9).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG10_A- AVG10).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG11_A- AVG11).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG12_A- AVG12).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG13_A- AVG13).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG14_A- AVG14).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG15_A- AVG15).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG16_A- AVG16).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG17_A- AVG17).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG18_A- AVG18).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG19_A- AVG19).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(AVG20_A- AVG20).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">차이값</TableCell>
                            <TableCell className="table-result" align="center">{(SUMAVG1_A - SUMAVG1).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(SUMAVG2_A - SUMAVG2).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(SUMAVG3_A - SUMAVG3).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(SUMAVG4_A - SUMAVG4).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(SUMAVG5_A - SUMAVG5).toFixed(2)}</TableCell>
                            <TableCell className="table-result" align="center">{(SUMAVG6_A - SUMAVG6).toFixed(2)}</TableCell>
                        </TableRow>
                        {/* {rows.map((row, index) => {

                            const cnt = index % 2;

                            return cnt === 0 ? 
                            
                                    <TableRow key={index}>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.keyword0}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.keyword1}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.keyword2}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.PV}</TableCell>
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
                                        <TableCell className="table-cell" align="center">{row.SCORE11}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE12}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE13}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE14}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE15}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE16}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE17}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE18}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE19}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.SCORE20}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.PV}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum1}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum2}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum3}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum4}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum5}</TableCell>
                                        <TableCell className="table-cell" align="center">{row.sum6}</TableCell>                                        
                                    </TableRow>
                            :
                                <TableRow key={index}>
                                    <TableCell className="table-cell" align="center">{row.PV}</TableCell>
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
                                    <TableCell className="table-cell" align="center">{row.SCORE11}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE12}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE13}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE14}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE15}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE16}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE17}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE18}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE19}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.SCORE20}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.PV}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.sum1}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.sum2}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.sum3}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.sum4}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.sum5}</TableCell>
                                    <TableCell className="table-cell" align="center">{row.sum6}</TableCell>                                        
                                </TableRow>
                        })} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
}
export default ProgramResult; 