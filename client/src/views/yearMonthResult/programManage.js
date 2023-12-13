import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getState } from "store/reducers/yearMonthResultReducer";
import { useSelector } from "react-redux";


const headerInfo =     
['구분', '산림교육', '예방교육', '산림치유', '아트','릴렉싱','에너제틱', '쿠킹', '이벤트', '합계'];


const ParticipationType = ()=>{
    
    const {manage_cnt, bunya, manage} = useSelector(s=> getState(s).programManage)

    const col1List = manage_cnt.filter(i=> i.BUNYA === '산림교육')
    const col2List = manage_cnt.filter(i=> i.BUNYA === '예방교육')
    const col3List = manage_cnt.filter(i=> i.BUNYA === '산림치유')
    const col4List = manage_cnt.filter(i=> i.BUNYA === '아트')
    const col5List = manage_cnt.filter(i=> i.BUNYA === '릴렉싱')
    const col6List = manage_cnt.filter(i=> i.BUNYA === '에너제틱')
    const col7List = manage_cnt.filter(i=> i.BUNYA === '쿠킹')
    const col8List = manage_cnt.filter(i=> i.BUNYA === '이벤트')

    const inCount = (accumulator, { inCnt }) =>  accumulator + (typeof inCnt === 'number' || !isNaN(Number(inCnt)) ? Number(inCnt) : 0);
    const outCount = (accumulator, { outCnt }) =>  accumulator + (typeof outCnt === 'number' || !isNaN(Number(outCnt)) ? Number(outCnt) : 0);
  

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
                        <TableRow >                        
                            <TableCell className="table-header" rowSpan={3}>프로그램<br/>운영</TableCell>
                            <TableCell>프로그램(개)</TableCell>
                            <TableCell>{col1List.length}</TableCell>
                            <TableCell>{col2List.length}</TableCell>
                            <TableCell>{col3List.length}</TableCell>
                            <TableCell>{col4List.length}</TableCell>
                            <TableCell>{col5List.length}</TableCell>
                            <TableCell>{col6List.length}</TableCell>
                            <TableCell>{col7List.length}</TableCell>
                            <TableCell>{col8List.length}</TableCell>
                            <TableCell>{col1List.length + col2List.length + col3List.length + col4List.length + col5List.length + col6List.length + col7List.length + col8List.length}</TableCell>
                        </TableRow>
                        <TableRow >                        
                            <TableCell>내부강사(명)</TableCell>
                            <TableCell>{col1List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col2List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col3List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col4List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col5List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col6List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col7List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{col8List.reduce(inCount, 0)}</TableCell>
                            <TableCell>{manage_cnt.reduce(inCount, 0)}</TableCell>
                        </TableRow>
                        <TableRow >                        
                            <TableCell>외부강사(명)</TableCell>
                            <TableCell>{col1List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col2List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col3List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col4List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col5List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col6List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col7List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{col8List.reduce(outCount, 0)}</TableCell>
                            <TableCell>{manage_cnt.reduce(outCount, 0)}</TableCell>
                        </TableRow>

                    {/* AS-is 데이터가 잘못됨 - 프로그램운영- 이벤트가 0 인데 사실 3건이 존재함 */}
                        {/* {manage.map((data, idx) => (
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
                                <TableCell>{data.합계}</TableCell>
                            </TableRow>
                        ))} */}
                        
                        {bunya.map((data, idx) => (
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
                                <TableCell>{data.합계}</TableCell>
                            </TableRow>
                        ))}
                        
                    
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ParticipationType;