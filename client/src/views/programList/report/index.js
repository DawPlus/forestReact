import React from "react";
import {PrintSection } from "ui-component/printButton"
import { useSelector } from "react-redux";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DefaultInfo from "./defaultInfo"
import ProgramOperate from "./programOperate"
import Facility from "./facility"
import Satisfaction from "./satisfaction"
import Effect from "./effect"
import Remark from "./remark"
import Expense from "./expense"
import Income from "./income"
import { getState } from "store/reducers/programListReducer";
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
const ReportContainer = ()=>{
        
    
    const {
        AGENCY,
        OM

    }  = useSelector(s=> getState(s).detailInfo)
    
    const onPrint = ()=>{
        window.print();
    }

    return (<>
        <div style={{textAlign : "right", marginBottom : "5px"}}>
            <Button variant="contained" color="primary" onClick={onPrint}><PrintIcon /></Button>
        </div>
        <PrintSection>
            <div style={{textAlign :"right" , marginBottom : "15px"}}>
                    {/* <div style={{width : "250px", display:"inline-block"}}>
                        <TableContainer>
                            <Table className="sighLine">
                            <TableHead>
                                <TableRow >
                                    <TableCell>담당</TableCell>
                                    <TableCell>팀장</TableCell>
                                    <TableCell>사무국장</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div> */}
                </div>
                <div style={{textAlign:"center",     margin: "60px 0px 30px 0px"}}>
                    <h1>하이힐링원 프로그램 실시 결과 보고</h1>
                </div>
                <div style={{textAlign: "right", fontSize: "12px"}}>
                    <span style={{marginRight :"40px"}}>{`단체명: ${AGENCY}`}</span> 
                    <span>{`OM: ${OM}`}</span> 
                </div>
            {/* 프로그램시행개요 */}
            <DefaultInfo/>
            {/* 프로그램운영 */}
            <ProgramOperate/>
            {/*시설서비스 만족도  */}
            <Facility/>
            {/* 프로그램만족도 */}
           
            <Satisfaction/>
           
            {/* 프로그램효과 */}
            <Effect/>
            {/* 소감 */}
            <Remark/>
            {/* 지출금액 */}
            <Expense/> 
            {/* 수입금액 */}
            <Income/>


        </PrintSection>


    </>)

}
export default ReportContainer;