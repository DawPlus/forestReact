import React from "react";
import { Table, TableHead,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";



// 시설서비스 만족도 
const ProgramOperate = ()=>{
    
    
    const { counsel, healing, hrv, prevent, }  = useSelector(s=> getState(s).effect)

    
    return <>
        <TableContainer style={{marginTop : "20px"}}>
            <h3 className="tableTitle">프로그램효과</h3>
            <Table className="report custom-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header" align="center" colSpan={3}>예방효과</TableCell>
                        <TableCell className="table-header" align="center" colSpan={3}>상담치유효과</TableCell>
                        <TableCell className="table-header" align="center" colSpan={3}>힐링효과</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center">구분</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                        <TableCell className="table-header" align="center">구분</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                        <TableCell className="table-header" align="center">구분</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* 프로그램 운영 */}
                    <TableRow>
                        <TableCell>{prevent[0]?.type}</TableCell>
                        <TableCell>{prevent[0]?.sum1}</TableCell>
                        <TableCell>{prevent[0]?.avg1}</TableCell>
                        
                        <TableCell>{counsel[0]?.pv}</TableCell>
                        <TableCell>{counsel[0]?.sum1}</TableCell>
                        <TableCell>{counsel[0]?.avg1}</TableCell>

                        <TableCell>{healing[0]?.pv}</TableCell>
                        <TableCell>{healing[0]?.sum1}</TableCell>
                        <TableCell>{healing[0]?.avg1}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{prevent[1]?.type}</TableCell>
                        <TableCell>{prevent[1]?.sum1}</TableCell>
                        <TableCell>{prevent[1]?.avg1}</TableCell>
                        
                        <TableCell>{counsel[1]?.pv}</TableCell>
                        <TableCell>{counsel[1]?.sum1}</TableCell>
                        <TableCell>{counsel[1]?.avg1}</TableCell>

                        <TableCell>{healing[1]?.pv}</TableCell>
                        <TableCell>{healing[1]?.sum1}</TableCell>
                        <TableCell>{healing[1]?.avg1}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
            <h3 className="tableTitle">자율신경검사효과성</h3>
            <Table className="report custom-table" style={{marginTop : "5px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header" align="center" rowSpan={2}>구분</TableCell>
                        <TableCell className="table-header" align="center" colSpan={2}>자율신경활성도</TableCell>
                        <TableCell className="table-header" align="center" colSpan={2}>자율신경균형도</TableCell>
                        <TableCell className="table-header" align="center" colSpan={2}>스트레스저항도</TableCell>
                        <TableCell className="table-header" align="center" colSpan={2}>스트레스지수</TableCell>
                        <TableCell className="table-header" align="center" colSpan={2}>피로도</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                        <TableCell className="table-header" align="center">총점</TableCell>
                        <TableCell className="table-header" align="center">평점</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* 프로그램 운영 */}
                    {hrv.map((i, key) =>
                        <TableRow key={key}>
                            <TableCell>{i.pv}</TableCell>
                            <TableCell>{i.num1}</TableCell>
                            <TableCell>{i.num1}</TableCell>
                            <TableCell>{i.num2}</TableCell>
                            <TableCell>{i.num2}</TableCell>
                            <TableCell>{i.num3}</TableCell>
                            <TableCell>{i.num3}</TableCell>
                            <TableCell>{i.num4}</TableCell>
                            <TableCell>{i.num4}</TableCell>
                            <TableCell>{i.num5}</TableCell>
                            <TableCell>{i.num5}</TableCell>
                        </TableRow>                
                    )}
                    
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ProgramOperate;