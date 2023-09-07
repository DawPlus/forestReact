import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/yearMonthResultReducer";
import { useSelector } from "react-redux";
import DynamicTableHead from "ui-component/DynamicTableHead";


const headerInfo =     [
    ["구분",'프로그램효과성','프로그램효과성','프로그램효과성','프로그램효과성','프로그램효과성','프로그램효과성','자율신경검사효과성','자율신경검사효과성','자율신경검사효과성','자율신경검사효과성','자율신경검사효과성'],
    ["",'예방효과(합계)','예방효과(평균)','상담치유효과(합계)','상담치유효과(평균)','힐링효과(합계)','힐링효과(평균)','자율신경활성도','자율신경균형도','스트레스저항도','스트레스지수','피로도'],
    
]

const ParticipationType = ()=>{
    
    const data = useSelector(s=> getState(s).programEffect)


    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle" style={{marginBottom:"0px"}}>효과성분석</h3>
            <Table className="report custom-table">
            <DynamicTableHead headerInfo={headerInfo}/>
                <TableBody>
                    {data.map((i, idx)=>
                        <TableRow key={idx}>
                            <TableCell style={{width: "150px"}}>{i.PV}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.preventSum}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.preventAvg}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.counselSum}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.counselAvg}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.healingTotalSum}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.healingAverageScore}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.hrvNum1}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.hrvNum2}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.hrvNum3}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.hrvNum4}</TableCell>
                            <TableCell style={{width: "150px"}}>{i.hrvNum5}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ParticipationType;