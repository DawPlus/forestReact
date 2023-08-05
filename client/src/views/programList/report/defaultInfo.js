import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";
import DynamicTableHead from "ui-component/DynamicTableHead";


const headerInfo =     [
    ["참여일자 및 기간","참여일자 및 기간","지역","참여자(명)","참여자(명)","참여자(명)","인솔자(명)","인솔자(명)","인솔자(명)","실인원","연인원","지원사항","수입구분","연령대","참가자유형","사업구분"],
    ["참여일자","체유일자","","남","여","계","남","여","계","","","","","","",""],
    
    
]
// 기본 정보 
const ParticipationType = ()=>{
    
    
    const {
        OPENDAY, // 참여일자 
        DAYS_TO_STAY, // 체류일자
        RESIDENCE, // 지역
        PART_MAN_CNT, // 참여자(남)
        PART_WOMAN_CNT, // 참여자(여)
        LEAD_MAN_CNT, // 인솔자(남)
        LEAD_WOMAN_CNT, // 인솔자(여)
        SUPPORT, //지원사항
        INCOME_TYPE, // 수입구분
        PART_TYPE, // 참가자유형
        AGE_TYPE, // 연령대
        BIZ_PURPOSE, // 사업구분

    }  = useSelector(s=> getState(s).detailInfo)
    
    const sum1 = +PART_MAN_CNT + +PART_WOMAN_CNT;
    const sum2 = +LEAD_MAN_CNT + +LEAD_WOMAN_CNT;
    
    return <>
        <TableContainer>
            <h3 className="tableTitle" style={{marginTop:"0px"}}>프로그램시행개요</h3>
            <Table className="report custom-table">
                <DynamicTableHead headerInfo={headerInfo}/>
                <TableBody>
                    <TableRow>
                        <TableCell>{OPENDAY}</TableCell>       
                        <TableCell>{DAYS_TO_STAY}</TableCell>       
                        <TableCell>{RESIDENCE}</TableCell>       
                        <TableCell>{PART_MAN_CNT}</TableCell>       
                        <TableCell>{PART_WOMAN_CNT}</TableCell>       
                        <TableCell>{sum1 }</TableCell>       
                        <TableCell>{LEAD_MAN_CNT}</TableCell>       
                        <TableCell>{LEAD_WOMAN_CNT}</TableCell>       
                        <TableCell>{sum2}</TableCell>       
                        <TableCell>{sum1 + sum2}</TableCell>       
                        <TableCell>{(sum1 + sum2)* DAYS_TO_STAY}</TableCell>       
                        <TableCell>{SUPPORT}</TableCell>       
                        <TableCell>{INCOME_TYPE}</TableCell>       
                        <TableCell>{AGE_TYPE}</TableCell>       
                        <TableCell>{PART_TYPE}</TableCell>       
                        <TableCell>{BIZ_PURPOSE}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ParticipationType;