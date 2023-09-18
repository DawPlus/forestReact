import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';

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
                        <TableCell style={{height : "50px", padding : "0px"}}>
                            <TextField
                                id="outlined-textarea"
                                multiline
                                className="customTextArea"
                                InputProps={{
                                    readOnly: true,
                                    style: { outline: 'none' ,fontSize : "12px", background : "#FFF"},
                                }}
                                fullWidth
                                value={PROGRAM_OPINION}
                            />
                            
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center" >시설등소감</TableCell>                        
                    </TableRow>
                    <TableRow>
                        <TableCell style={{height : "50px", padding : "0px"}}>
                            
                            <TextField
                                id="outlined-textarea"
                                multiline
                                className="customTextArea"
                                InputProps={{
                                    readOnly: true,
                                    style: { outline: 'none' ,fontSize : "12px", background : "#FFF"},
                                }}
                                fullWidth
                                value={SERVICE_OPINION}
                            />
                            </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center" >프로그램효과서</TableCell>                        
                    </TableRow>
                    <TableRow>
                        <TableCell style={{height : "50px", padding : "0px"}}>
                            <TextField
                                id="outlined-textarea"
                                multiline
                                className="customTextArea"
                                InputProps={{
                                    readOnly: true,
                                    style: { outline: 'none' ,fontSize : "12px", background : "#FFF"},
                                }}
                                fullWidth
                                value={OVERALL_OPINION}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default RemarkContainer;