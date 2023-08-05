import React from "react";
import { Table, TableHead,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";



// 시설서비스 만족도 
const ProgramOperate = ()=>{
    
    
    const {
        score1,
        score2,
        score3,
        score4,
        score5,
        score6,
        score7,
        score8,
        score9,
        score10,
        score11,
        score12,
        score13,
        score14,
        score15,
        score16,
    }  = useSelector(s=> getState(s).serviceList)

    
    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle">시설서비스만족도</h3>
            <Table className="report custom-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header" align="center" colSpan={2}>숙소</TableCell>
                        <TableCell className="table-header" align="center" colSpan={2}>식당</TableCell>
                        <TableCell className="table-header" align="center" colSpan={3}>프로그램장소</TableCell>
                        <TableCell className="table-header" align="center" colSpan={3}>숲(야외)</TableCell>
                        <TableCell className="table-header" align="center" colSpan={3}>운영</TableCell>
                        <TableCell className="table-header" align="center" colSpan={3}>식사</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center">편리</TableCell>
                        <TableCell className="table-header" align="center">청결</TableCell>
                        <TableCell className="table-header" align="center">편리</TableCell>
                        <TableCell className="table-header" align="center">청결</TableCell>
                        <TableCell className="table-header" align="center">만족도</TableCell>
                        <TableCell className="table-header" align="center">청결도</TableCell>
                        <TableCell className="table-header" align="center">풍경</TableCell>
                        <TableCell className="table-header" align="center">만족도</TableCell>
                        <TableCell className="table-header" align="center">청결도</TableCell>
                        <TableCell className="table-header" align="center">풍경</TableCell>
                        <TableCell className="table-header" align="center">운영방식</TableCell>
                        <TableCell className="table-header" align="center">시간편성</TableCell>
                        <TableCell className="table-header" align="center">직원친절</TableCell>
                        <TableCell className="table-header" align="center">신선도</TableCell>
                        <TableCell className="table-header" align="center">다양성</TableCell>
                        <TableCell className="table-header" align="center">영양</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* 프로그램 운영 */}
                    <TableRow>
                        <TableCell>{score1}</TableCell>
                        <TableCell>{score2}</TableCell>
                        <TableCell>{score3}</TableCell>
                        <TableCell>{score4}</TableCell>
                        <TableCell>{score5}</TableCell>
                        <TableCell>{score6}</TableCell>
                        <TableCell>{score7}</TableCell>
                        <TableCell>{score8}</TableCell>
                        <TableCell>{score9}</TableCell>
                        <TableCell>{score10}</TableCell>
                        <TableCell>{score11}</TableCell>
                        <TableCell>{score12}</TableCell>
                        <TableCell>{score13}</TableCell>
                        <TableCell>{score14}</TableCell>
                        <TableCell>{score15}</TableCell>
                        <TableCell>{score16}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ProgramOperate;