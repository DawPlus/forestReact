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



// 예방서비스 효과평가 
const Program = ()=>{
    const classes = useStyles();
    
    const {preventList, agency} = useSelector(s=> getState(s))
    
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
            const sum = preventList.filter(i=> i.PV ==="사전").reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / preventList.filter(i=> i.PV ==="사전").length).toFixed(2);
        });
    },[preventList])


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
            const sum = preventList.filter(i=> i.PV ==="사후").reduce((a, c) => a + (parseFloat(c[k]) || 0), 0);
            return (sum / preventList.filter(i=> i.PV ==="사후").length).toFixed(2);
        });
    },[preventList])


    const headerInfo = [
        [ "ID", "성명", "성별", "거주지", "직업", "참여프로그램", "과거스트레스\n해소및힐링\n서비스경험", "영역", "1.중독특징이해", "1.중독특징이해", "1.중독특징이해", "2.핵심증상이해", "2.핵심증상이해", "2.핵심증상이해", "3.문제대응방법이해", "3.문제대응방법이해", "3.문제대응방법이해", "3.문제대응방법이해", "4.활동역량", "4.활동역량", "5.심리적면역력강화법", "5.심리적면역력강화법", "5.심리적면역력강화법", "5.심리적면역력강화법", "5.심리적면역력강화법", "6.삶의길", "6.삶의길", "6.삶의길", "영역", "평균(0~6점)", "평균(0~6점)", "평균(0~6점)", "평균(0~6점)", "평균(0~6점)", "평균(0~6점)"],
        [ "", "", "", "", "", "", "", "평가시점", "문항1", "문항2", "문항3", "문항4", "문항5", "문항6", "문항7", "문항8", "문항9", "문항10", "문항11", "문항12", "문항13", "문항14", "문항15", "문항16", "문항17", "문항18", "문항19", "문항20",  "평가시점", "중독특징이해", "핵심증상이해", "문제대응방법", "활동역량", "심리적면역력강화법", "삶의질"],
    ];

    const cellData = preventList.map((item,idx) => Object.values({
        idx : idx % 2=== 0 ? (idx / 2) + 1  : "",
        NAME :  idx % 2=== 0 ?  item.NAME : "",
        SEX :  idx % 2=== 0 ? item.SEX : "",
        RESIDENCE : idx % 2=== 0 ?  item.RESIDENCE : "",
        JOB :  idx % 2=== 0 ? item.JOB : "",
        PTCPROGRAM : idx % 2=== 0 ?  item.PTCPROGRAM : "",
        PAST_STRESS_EXPERIENCE :  idx % 2=== 0 ? item.PAST_STRESS_EXPERIENCE : "",
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


    const merges = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
        { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
        { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } },
        { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } },
        { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } },
        { s: { r: 0, c: 8 }, e: { r: 0, c: 10 } },
        { s: { r: 0, c: 11 }, e: { r: 0, c: 13 } },
        { s: { r: 0, c: 14 }, e: { r: 0, c: 17 } },
        { s: { r: 0, c: 18 }, e: { r: 0, c: 19 } },
        { s: { r: 0, c: 20 }, e: { r: 0, c: 24 } },
        { s: { r: 0, c: 25 }, e: { r: 0, c: 27 } },
        { s: { r: 0, c: 29 }, e: { r: 0, c: 34 } }
    ];
    const wscols = [ {wch:8}, {wch:15}, {wch:10}, {wch:12}, {wch:12}, {wch:15}, {wch:12}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:11}, {wch:11}, {wch:11}, {wch:13}, {wch:13}, {wch:11}, {wch:13} ];

    const avgData = [
        ["","","","","","","", "사전", AVG1, AVG2, AVG3, AVG4, AVG5, AVG6, AVG7, AVG8, AVG9, AVG10, AVG11, AVG12, AVG13, AVG14, AVG15, AVG16, AVG17, AVG18, AVG19, AVG20, "사전", SUMAVG1, SUMAVG2, SUMAVG3, SUMAVG4, SUMAVG5, SUMAVG6],
        ["","","","통계","","","평균","사후", AVG1_A, AVG2_A, AVG3_A, AVG4_A, AVG5_A, AVG6_A, AVG7_A, AVG8_A, AVG9_A, AVG10_A, AVG11_A, AVG12_A, AVG13_A, AVG14_A, AVG15_A, AVG16_A, AVG17_A, AVG18_A, AVG19_A, AVG20_A, "사후", SUMAVG1_A, SUMAVG2_A, SUMAVG3_A, SUMAVG4_A, SUMAVG5_A, SUMAVG6_A],
        ["","","","","","","","차이값", (AVG1_A- AVG1).toFixed(2), (AVG2_A- AVG2).toFixed(2), (AVG3_A- AVG3).toFixed(2), (AVG4_A- AVG4).toFixed(2), (AVG5_A- AVG5).toFixed(2), (AVG6_A- AVG6).toFixed(2), (AVG7_A- AVG7).toFixed(2), (AVG8_A- AVG8).toFixed(2), (AVG9_A- AVG9).toFixed(2), (AVG10_A- AVG10).toFixed(2), (AVG11_A- AVG11).toFixed(2), (AVG12_A- AVG12).toFixed(2), (AVG13_A- AVG13).toFixed(2), (AVG14_A- AVG14).toFixed(2), (AVG15_A- AVG15).toFixed(2), (AVG16_A- AVG16).toFixed(2), (AVG17_A- AVG17).toFixed(2), (AVG18_A- AVG18).toFixed(2), (AVG19_A- AVG19).toFixed(2), (AVG20_A- AVG20).toFixed(2), "차이값", (SUMAVG1_A - SUMAVG1).toFixed(2), (SUMAVG2_A - SUMAVG2).toFixed(2), (SUMAVG3_A - SUMAVG3).toFixed(2), (SUMAVG4_A - SUMAVG4).toFixed(2), (SUMAVG5_A - SUMAVG5).toFixed(2), (SUMAVG6_A - SUMAVG6).toFixed(2)]
]

    const downloadExcel = useDownloadExcel({headerInfo, cellData, avgData, filename  : agency, merges, wscols, type : "type2"});


    return <>
            {preventList.length > 0 ? 
            <>
            <div style={{padding : "10px 0px", textAlign:"right"}}>
                <Button variant="contained" color="primary" size="small" onClick={downloadExcel} >Excel 다운로드</Button>
            </div>
            <TableContainer component={Paper} className={classes.paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small" className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header" rowSpan={2} align="center">ID</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">성명</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">성별</TableCell>
                            <TableCell className="table-header" rowSpan={2} align="center">거주지</TableCell>
                            <TableCell className="table-header" rowSpan={3} align="center">직업</TableCell>
                            <TableCell className="table-header" rowSpan={3} align="center">참여프로그램</TableCell>
                            <TableCell className="table-header" rowSpan={3} align="center">과거스트레스<br/>해소및힐링<br/>서비스경험</TableCell>
                            <TableCell className="table-header" align="center">영역</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">1.중독특징이해</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">2.핵심증상이해</TableCell>
                            <TableCell className="table-header" colSpan={4} align="center">3.문제대응방법이해</TableCell>
                            <TableCell className="table-header" colSpan={2} align="center">4.활동역량</TableCell>
                            <TableCell className="table-header" colSpan={5} align="center">5.심리적면역력강화법</TableCell>
                            <TableCell className="table-header" colSpan={3} align="center">6.삶의길</TableCell>
                            <TableCell className="table-header" align="center">영역</TableCell>
                            <TableCell className="table-header" colSpan={6} align="center">평균(0~6점)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-header" align="center">평가시점</TableCell>
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
                            <TableCell className="table-header" align="center">문항11</TableCell>
                            <TableCell className="table-header" align="center">문항12</TableCell>
                            <TableCell className="table-header" align="center">문항13</TableCell>
                            <TableCell className="table-header" align="center">문항14</TableCell>
                            <TableCell className="table-header" align="center">문항15</TableCell>
                            <TableCell className="table-header" align="center">문항16</TableCell>
                            <TableCell className="table-header" align="center">문항17</TableCell>
                            <TableCell className="table-header" align="center">문항18</TableCell>
                            <TableCell className="table-header" align="center">문항19</TableCell>
                            <TableCell className="table-header" align="center">문항20</TableCell>
                            <TableCell className="table-header" align="center">평가시점</TableCell>
                            <TableCell className="table-header" align="center">중독<br/>특징이해</TableCell>
                            <TableCell className="table-header" align="center">핵짐<br/>증상이해</TableCell>
                            <TableCell className="table-header" align="center">문제<br/>대응방법</TableCell>
                            <TableCell className="table-header" align="center">활동역량</TableCell>
                            <TableCell className="table-header" align="center">심리적<br/>면역력강화법</TableCell>
                            <TableCell className="table-header" align="center">삶의질</TableCell>
                        </TableRow>
                    </TableHead>      
                    <TableBody>
                        {preventList.map((row, index) => {

                            const cnt = index % 2;

                            return cnt === 0 ? 
                            
                                    <TableRow key={index}>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{(index / 2) + 1}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.NAME}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.SEX}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.RESIDENCE}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.JOB}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.PTCPROGRAM}</TableCell>
                                        <TableCell className="table-cell" rowSpan={2} align="center">{row.PAST_STRESS_EXPERIENCE}</TableCell>
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
                          
                        })}
                        {/* 통계 */}
                        <TableRow>
                            <TableCell className="table-result" align="center" colSpan={6} rowSpan={3}>통계</TableCell>
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
                    </TableBody>
                </Table>
            </TableContainer>
            </>
            :<></>
        }
    </>

}
export default memo(Program)