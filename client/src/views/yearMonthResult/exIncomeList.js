import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/yearMonthResultReducer";
import { useSelector } from "react-redux";
import DynamicTableHead from "ui-component/DynamicTableHead";


const headerInfo =     [
    ["지출및매출금액",'지출(천원)','지출(천원)','지출(천원)','지출(천원)','지출(천원)','지출(천원)','지출(천원)','지출(천원)','지출(천원)','지출(천원)','수입(천원)','수입(천원)','수입(천원)','수입(천원)','수입(천원)','수입(천원)','수입(천원)'],
    ["",'강사비','강사교통비','강사식비','보조강사비','참가자숙박','참가자식비','재료비','기타비','예비비','합계','프로그램','숙박비','식사비','재료비','기타비','합계','최종금액'],
    
]
// 수입지출
const ExIncomeList = ()=>{
    const {expend, income, incomeTotal}= useSelector(s=> getState(s).exIncomeList)
    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle" style={{marginBottom:"0px"}}>지출및매출금액</h3>
            <Table className="report custom-table">
            <DynamicTableHead headerInfo={headerInfo}/>
                <TableBody>
                <TableRow>
                    <TableCell>구분</TableCell>
                    <TableCell>{expend["강사집행강사비"]}</TableCell>
                    <TableCell>{expend["강사집행교통비"]}</TableCell>
                    <TableCell>{expend["강사집행식사비"]}</TableCell>
                    <TableCell>{expend["강사집행보조강사비"]}</TableCell>
                    <TableCell>{expend["고객예정숙박비"]}</TableCell>
                    <TableCell>{expend["고객집행식사비"]}</TableCell>
                    <TableCell>{expend["고객집행재료비"]}</TableCell>
                    <TableCell>{expend["고객집행기타비"]}</TableCell>
                    <TableCell>{expend["예비비"]}</TableCell>
                    <TableCell>{expend["합계"]}</TableCell>
                    <TableCell>{income["프로그램"]}</TableCell>
                    <TableCell>{income["숙박비"]}</TableCell>
                    <TableCell>{income["식사비"]}</TableCell>
                    <TableCell>{income["재료비"]}</TableCell>
                    <TableCell>{income["기타"]}</TableCell>
                    <TableCell>{income["합계"]}</TableCell>
                    <TableCell>{incomeTotal}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
export default ExIncomeList;