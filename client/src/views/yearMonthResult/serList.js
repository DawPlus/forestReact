import React from "react";
import { Table,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/yearMonthResultReducer";
import { useSelector } from "react-redux";
import DynamicTableHead from "ui-component/DynamicTableHead";


const headerInfo =     [
    ["구분",'숙소','숙소','식당','식당','프로그램장소','프로그램장소','프로그램장소','숲(야외)','숲(야외)','숲(야외)','운영','운영','운영','식사','식사','식사', '평균'],
    ["",'편리성','청결도','편리성','청결도','편리성','청결도','적절성','편리성','청결도','적절성','운영방식','시간편성','직원친절','신선도','다양성','영양', ''],
]

const ParticipationType = ()=>{
    
    const data = useSelector(s=> getState(s).serList)


    return <>
        <TableContainer style={{marginTop : "20px"}}>
            <h3 className="tableTitle" style={{marginBottom:"0px"}}>시설서비스만족도</h3>
            <Table className="report custom-table">
            <DynamicTableHead headerInfo={headerInfo}/>
                <TableBody>
                <TableRow>
                    <TableCell>구분</TableCell>
                    <TableCell>{data.score1}</TableCell>
                    <TableCell>{data.score2}</TableCell>
                    <TableCell>{data.score3}</TableCell>
                    <TableCell>{data.score4}</TableCell>
                    <TableCell>{data.score5}</TableCell>
                    <TableCell>{data.score6}</TableCell>
                    <TableCell>{data.score7}</TableCell>
                    <TableCell>{data.score8}</TableCell>
                    <TableCell>{data.score9}</TableCell>
                    <TableCell>{data.score10}</TableCell>
                    <TableCell>{data.score11}</TableCell>
                    <TableCell>{data.score12}</TableCell>
                    <TableCell>{data.score13}</TableCell>
                    <TableCell>{data.score14}</TableCell>
                    <TableCell>{data.score15}</TableCell>
                    <TableCell>{data.score16}</TableCell>
                    <TableCell>{data.total}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ParticipationType;