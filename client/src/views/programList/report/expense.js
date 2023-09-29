import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";
import { decodeSpecialCharacters } from "utils/utils";


// 지출금액 
const ExpenseContainer = ()=>{
    
    
    const { expense}  = useSelector(s=> getState(s).inExpense);


    // 예정금액
    const teacherSchedule = expense.filter(i=> i.EXPENSE_TYPE.includes("강사예정")).sort((a, b) => a.EXPENSE_TYPE.localeCompare(b.EXPENSE_TYPE));
    const teacherExecution = expense.filter(i=> i.EXPENSE_TYPE.includes("강사집행")).sort((a, b) => a.EXPENSE_TYPE.localeCompare(b.EXPENSE_TYPE));
    const customSchedule = expense.filter(i=> i.EXPENSE_TYPE.includes("고객예정")).sort((a, b) => a.EXPENSE_TYPE.localeCompare(b.EXPENSE_TYPE));
    const customExecution = expense.filter(i=> i.EXPENSE_TYPE.includes("고객집행")).sort((a, b) => a.EXPENSE_TYPE.localeCompare(b.EXPENSE_TYPE));

    const sTotal = expense.filter(i=> i.EXPENSE_TYPE.includes("예정")).reduce((acc, cur)=> acc += +cur.EXPENSE_PRICE, 0)
    const eTotal = expense.filter(i=> i.EXPENSE_TYPE.includes("집행")).reduce((acc, cur)=> acc += +cur.EXPENSE_PRICE, 0)

    function formatNumberWithCommas(value) {
        const numberValue = parseInt(value, 10); // 형 변환 시도
        if (!isNaN(numberValue)) { // 형 변환이 성공한 경우
          return numberValue.toLocaleString();
        }
        return value; // 형 변환이 실패한 경우 그대로 반환
      }
      

    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle">지출금액</h3>
            <Table className="report custom-table">
                <TableBody>
                    <TableRow>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center" style={{ width: "15%" }} colSpan={2}>구분</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "10%" }}>분류</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "10%" }}>금액</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "55%" }}>세부내역</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "10%" }}>비고</TableCell>
                    </TableRow>
                    {teacherSchedule.map((i, idx, arr)=>
                        <TableRow key={idx}>
                            {idx === 0 && <TableCell rowSpan={expense.filter(i=> i.EXPENSE_TYPE.includes("강사")).length }className="table-header" >강사</TableCell>}
                            {idx === 0 && <TableCell rowSpan={arr.length}className="table-header" >예정금액(강사)</TableCell>}
                            <TableCell >{`${i.EXPENSE_TYPE.replace("강사예정","")}(천원)`}</TableCell>
                            <TableCell >{formatNumberWithCommas(i.EXPENSE_PRICE)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_DETAIL)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_NOTE)}</TableCell>
                        </TableRow>
                    )}
                    {teacherExecution.map((i, idx, arr)=>
                        <TableRow key={idx}>
                            {idx === 0 && <TableCell rowSpan={arr.length}className="table-header" >집행금액(강사)</TableCell>}
                            <TableCell >{`${i.EXPENSE_TYPE.replace("강사집행","")}(천원)`}</TableCell>
                            <TableCell >{formatNumberWithCommas(i.EXPENSE_PRICE)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_DETAIL)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_NOTE)}</TableCell>
                        </TableRow>
                    )}
                    {customSchedule.map((i, idx, arr)=>
                        <TableRow key={idx}>
                            {idx === 0 && <TableCell rowSpan={expense.filter(i=> i.EXPENSE_TYPE.includes("고객")).length}className="table-header" >참가자</TableCell>}
                            {idx === 0 && <TableCell rowSpan={arr.length}className="table-header" >예정금액(참가자)</TableCell>}
                            <TableCell >{`${i.EXPENSE_TYPE.replace("고객예정","")}(천원)`}</TableCell>
                            <TableCell >{formatNumberWithCommas(i.EXPENSE_PRICE)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_DETAIL)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_NOTE)}</TableCell>
                        </TableRow>
                    )}
                    {customExecution.map((i, idx, arr)=>
                        <TableRow key={idx}>
                            {idx === 0 && <TableCell rowSpan={arr.length}className="table-header" >집행금액(참가자)</TableCell>}
                            <TableCell >{`${i.EXPENSE_TYPE.replace("고객집행","")}(천원)`}</TableCell>
                            <TableCell >{formatNumberWithCommas(i.EXPENSE_PRICE)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_DETAIL)}</TableCell>
                            <TableCell >{decodeSpecialCharacters(i.EXPENSE_NOTE)}</TableCell>
                        </TableRow>
                    )}
                        <TableRow >
                            <TableCell rowSpan={2} colSpan={2} className="table-header">합계</TableCell>
                            <TableCell>예산금액</TableCell>
                            <TableCell colSpan={3}>{formatNumberWithCommas(sTotal)}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>집행금액 </TableCell>
                            <TableCell colSpan={3}>{formatNumberWithCommas(eTotal)}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ExpenseContainer;