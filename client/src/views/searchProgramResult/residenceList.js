import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getState } from "store/reducers/searchProgramReducer";
import { useSelector } from "react-redux";


const headerInfo =     
["서울", '부산', '대구', '인천', '대전', '광주', '울산', '경기', '강원', '폐광지역', '충북', '충남', '세종', '경북', '경남', '전북', '전남', '제주']

const ParticipationType = ()=>{
    
    const data = useSelector(s=> getState(s).residenceList)

    // Calculate the sum of the count values
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);

    // Calculate the sum of the total values
    const totalSum = data.reduce((sum, item) => sum + item.total, 0);

    return <>
        <TableContainer style={{marginTop : "20px"}}>
            <Table className="report custom-table">
            <TableHead>
                <TableRow>
                    <TableCell className="table-header">지역</TableCell>
                    {headerInfo.map((i, idx)=> <TableCell className="table-header" key={idx}  align="center" > {i} </TableCell>)}
                    <TableCell className="table-header">계</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>유형(건)</TableCell>
                        {headerInfo.map((header) => (
                            <TableCell key={header}>{header !== '지역' && header !== '계' ? data.find((item) => item.RESIDENCE === header)?.count ||0: ''}</TableCell>
                            ))}
                        <TableCell>{totalCount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>인원(수)</TableCell>
                        {headerInfo.map((header) => (
                            <TableCell key={header}>{header !== '지역' && header !== '계' ? data.find((item) => item.RESIDENCE === header)?.total ||0 : ''}</TableCell>
                            ))}
                        <TableCell>{totalSum}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ParticipationType;