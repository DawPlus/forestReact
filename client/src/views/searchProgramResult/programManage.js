import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getState } from "store/reducers/searchProgramReducer";
import { useSelector } from "react-redux";


const headerInfo = ['구분', '산림교육', '예방교육', '산림치유', '아트','릴렉싱','에너제틱', '쿠킹', '이벤트', '합계'];


const ParticipationType = ()=>{
    
    const {manage, bunya} = useSelector(s=> getState(s).programManage)


    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle" style={{marginBottom:"0px"}}>프로그램운영/만족도</h3>
            <Table className="report custom-table">
            <TableHead>
                <TableRow>
                    <TableCell className="table-header"></TableCell>
                    {headerInfo.map((i, idx)=> <TableCell className="table-header" key={idx}  align="center" > {i} </TableCell>)}
                </TableRow>
            </TableHead>
                <TableBody>
                    {/* AS-is 데이터가 잘못됨 - 프로그램운영- 이벤트가 0 인데 사실 3건이 존재함 */}
                        {manage.map((data, idx) => (
                            <TableRow key={idx}>                        
                                {idx ===  0 ? <TableCell className="table-header" rowSpan={3}>프로그램<br/>운영</TableCell> : null}
                                <TableCell>{data.type}</TableCell>
                                <TableCell>{data.산림교육}</TableCell>
                                <TableCell>{data.예방교육}</TableCell>
                                <TableCell>{data.산림치유}</TableCell>
                                <TableCell>{data.아트}</TableCell>
                                <TableCell>{data.릴렉싱}</TableCell>
                                <TableCell>{data.에너제틱}</TableCell>
                                <TableCell>{data.쿠킹}</TableCell>
                                <TableCell>{data.이벤트}</TableCell>
                                <TableCell>{isNaN(data.합계)  ? 0  : data.합계}</TableCell>
                            </TableRow>
                        ))}
                        
                        {bunya.map((data, idx) => data.type !=="참여인원" &&
                            <TableRow key={idx}>                        
                                {idx ===  0 ? <TableCell className="table-header" rowSpan={4}>프로그램<br/>만족도</TableCell> : null}
                                <TableCell>{data.type}</TableCell>
                                <TableCell>{data.산림교육}</TableCell>
                                <TableCell>{data.예방교육}</TableCell>
                                <TableCell>{data.산림치유}</TableCell>
                                <TableCell>{data.아트}</TableCell>
                                <TableCell>{data.릴렉싱}</TableCell>
                                <TableCell>{data.에너제틱}</TableCell>
                                <TableCell>{data.쿠킹}</TableCell>
                                <TableCell>{data.이벤트}</TableCell>
                                <TableCell>{isNaN(data.합계)  ? 0  : data.합계}</TableCell>
                            </TableRow>           
                        )}
                        
                        {/* {bunya.map((data, idx) => data.type ==="참여인원" &&
                            <TableRow key={idx}>                        
                                <TableCell className="table-header" colSpan={2}>참여인원</TableCell>
                                <TableCell>{data.산림교육}</TableCell>
                                <TableCell>{data.예방교육}</TableCell>
                                <TableCell>{data.산림치유}</TableCell>
                                <TableCell>{data.아트}</TableCell>
                                <TableCell>{data.릴렉싱}</TableCell>
                                <TableCell>{data.에너제틱}</TableCell>
                                <TableCell>{data.쿠킹}</TableCell>
                                <TableCell>{data.이벤트}</TableCell>
                                <TableCell>{isNaN(data.합계)  ? 0  : data.합계}</TableCell>
                            </TableRow>
                        )}
                         */}

                    
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ParticipationType;