import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import DynamicTableHead from "ui-component/DynamicTableHead";
import {  getState } from "store/reducers/yearMonthResultReducer";
import { useSelector } from "react-redux";

const ParticipationType = ()=>{

    const {
        
        count_adult,
        count_benefit,
        count_boy,
        count_etc,

        count_general, 
        count_family,
        count_handicap,
        count_multicultural,
        
        count_income_etc,
        count_income_green,
        count_income_voucher,
        count_kidboy,
        
        count_old,
        count_society,
        

        
        part_adult,
        part_benefit,
        part_boy,
        
        
        part_general, 
        part_family,
        part_handicap,
        part_multicultural,
        
        part_income_etc,
        part_income_green,
        part_income_voucher,
        part_kidboy,
        
        part_old,
        part_society,
        
        org_1,
        org_2,
        org_3,
        org_4,
        org_5,
        org_part_1,
        org_part_2,
        org_part_3,
        org_part_4,
        org_part_5,
        

    } = useSelector(s=> getState(s).partTypeList)

    const headerInfo = [
        ["참가유형", "연령대",  "연령대", "연령대", "연령대", "참가자유형", "참가자유형", "참가자유형", "참가자유형", "참가자유형", "참여형태", "참여형태", "참여형태", "참여형태", "사업구분", "사업구분", "사업구분", "단체성격", "단체성격", "단체성격", "단체성격", "단체성격", "단체성격"],
        ["", "아동ㆍ청소년",  "성인", "노인", "계", "일반", "가족", "장애인", "다문화", "계", "단체", "개인", "기타", "계", "사회공헌", "수입사업", "계", "교육기관", "복지기관", "기업", "관공서", "강원랜드", "계" ],
    ]

    
    return <>
        <TableContainer>
        <Table className="report custom-table">
            <DynamicTableHead headerInfo={headerInfo}/>
            <TableBody>
                <TableRow>
                    <TableCell style={{width : "170px"}}>유형(건)</TableCell>
                    <TableCell style={{width : "170px"}}>{count_kidboy}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_adult}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_old}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_kidboy+count_old+count_boy +count_adult}</TableCell>
                    
                    <TableCell style={{width : "170px"}}>{count_general}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_family}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_handicap}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_multicultural}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_general+ count_family+ count_handicap+ count_multicultural}</TableCell>

                    <TableCell style={{width : "170px"}}>{count_income_green}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_income_voucher}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_income_etc}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_income_green+ count_income_voucher+count_income_etc}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_society}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_benefit}</TableCell>
                    <TableCell style={{width : "170px"}}>{count_benefit+ count_society}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_1}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_2}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_3}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_4}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_5}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_1+org_2+org_3+org_4+org_5}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>인원(수)</TableCell>
                    <TableCell>{part_kidboy}</TableCell>
                    <TableCell>{part_adult}</TableCell>
                    <TableCell>{part_old}</TableCell>
                    <TableCell>{part_kidboy+part_old+part_boy +part_adult}</TableCell>

                    <TableCell>{part_general}</TableCell>
                    <TableCell>{part_family}</TableCell>
                    <TableCell>{part_handicap}</TableCell>
                    <TableCell>{part_multicultural}</TableCell>
                    
                    
                    <TableCell>{part_general+ part_family+ part_handicap+ part_multicultural}</TableCell>
                    <TableCell>{part_income_green}</TableCell>
                    <TableCell>{part_income_voucher}</TableCell>
                    <TableCell>{part_income_etc}</TableCell>
                    <TableCell>{part_income_green+ part_income_voucher+part_income_etc}</TableCell>
                    <TableCell>{part_society}</TableCell>
                    <TableCell>{part_benefit}</TableCell>
                    <TableCell>{part_benefit+ part_society}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_part_1}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_part_2}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_part_3}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_part_4}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_part_5}</TableCell>
                    <TableCell style={{width : "170px"}}>{org_part_1+org_part_2+org_part_3+org_part_4+org_part_5}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    
    </>

}
export default ParticipationType;