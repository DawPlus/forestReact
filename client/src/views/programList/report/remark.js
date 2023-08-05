import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";



// 시설서비스 만족도 
const RemarkContainer = ()=>{
    
    
    const { PROGRAM_OPINION , SERVICE_OPINION, OVERALL_OPINION}  = useSelector(s=> getState(s).detailInfo)

    
    return <>
        <TableContainer style={{marginTop : "20px"}}>
            
            <Table className="report custom-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="table-header" align="center" >프로그램소감</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{height : "50px"}}>{PROGRAM_OPINION}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center" >시설등소감</TableCell>                        
                    </TableRow>
                    <TableRow>
                        <TableCell style={{height : "50px"}}>{SERVICE_OPINION}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center" >프로그램효과서</TableCell>                        
                    </TableRow>
                    <TableRow>
                        <TableCell style={{height : "50px"}}>{OVERALL_OPINION}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default RemarkContainer;