import React from "react";
import { Table, TableHead,  TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";



//프로그램 만족도
const ProgramSatisfaction = ()=>{
    
    
    const programSaf  = useSelector(s=> getState(s).programSaf)


    const calculateAverage = (inputObject) => {
        const values = Object.values(inputObject);
        //const validValues = values.filter((value) => typeof value === 'number');  // 0포함
        const validValues = values.filter((value) => typeof value === 'number' && value !== 0); // 0제외
        if (validValues.length === 0) {
            return 0;
        }
        const sum = validValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const average = sum / validValues.length;
        return average.toFixed(2);
    }    

    
    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle">프로그램만족도</h3>
            <Table className="report custom-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header" align="center" rowSpan={2}>프로그램명</TableCell>
                        <TableCell className="table-header" align="center" rowSpan={2}>분야</TableCell>
                        <TableCell className="table-header" align="center" rowSpan={2}>강사명</TableCell>
                        <TableCell className="table-header" align="center" rowSpan={2}>구분</TableCell>
                        <TableCell className="table-header" align="center" colSpan={4}>강사</TableCell>
                        <TableCell className="table-header" align="center" colSpan={4}>내용구성</TableCell>
                        <TableCell className="table-header" align="center" colSpan={4}>효과성</TableCell>
                        <TableCell className="table-header" align="center" rowSpan={2}>전체평균</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header" align="center">전문성</TableCell>
                        <TableCell className="table-header" align="center">성실성</TableCell>
                        <TableCell className="table-header" align="center">반응성</TableCell>
                        <TableCell className="table-header" align="center">평균</TableCell>
                        <TableCell className="table-header" align="center">체계성</TableCell>
                        <TableCell className="table-header" align="center">적합성</TableCell>
                        <TableCell className="table-header" align="center">흥미성</TableCell>
                        <TableCell className="table-header" align="center">평균</TableCell>
                        <TableCell className="table-header" align="center">학습성</TableCell>
                        <TableCell className="table-header" align="center">재참여</TableCell>
                        <TableCell className="table-header" align="center">추천</TableCell>
                        <TableCell className="table-header" align="center">평균</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {programSaf.length ===0 ?   <TableRow><TableCell colSpan={17}>조회된 정보가 없습니다.</TableCell></TableRow>: null}
                    {programSaf.map((i, key)=>
                    <TableRow key={key}>
                        {key %2 === 0 ? <TableCell rowSpan={2}>{i.PROGRAM_NAME}</TableCell> :null}
                        {key %2 === 0 ? <TableCell rowSpan={2}>{i.BUNYA}</TableCell> :null}
                        {key %2 === 0 ? <TableCell rowSpan={2}>{i.TEACHER}</TableCell> :null}                        
                        {/* <TableCell >{i.PROGRAM_NAME}</TableCell> 
                        <TableCell >{i.BUNYA}</TableCell> 
                        <TableCell >{i.TEACHER}</TableCell> 
                         */}
                        <TableCell>{i.type}</TableCell>
                        <TableCell>{i.score1}</TableCell>
                        <TableCell>{i.score2}</TableCell>
                        <TableCell>{i.score3}</TableCell>
                        <TableCell>{calculateAverage({
                                        score1 : i.score1,
                                        score2 : i.score2,
                                        score3 : i.score3,
                        })}</TableCell>
                        <TableCell>{i.score4}</TableCell>
                        <TableCell>{i.score5}</TableCell>
                        <TableCell>{i.score6}</TableCell>
                        <TableCell>{calculateAverage({
                                        score1 : i.score4,
                                        score2 : i.score5,
                                        score3 : i.score6,
                        })}</TableCell>
                        <TableCell>{i.score7}</TableCell>
                        <TableCell>{i.score8}</TableCell>
                        <TableCell>{i.score9}</TableCell>
                        <TableCell>{calculateAverage({
                                        score1 : i.score7,
                                        score2 : i.score8,
                                        score3 : i.score9,
                        })}</TableCell>
                        <TableCell>{calculateAverage({
                                        score1 : i.score1,
                                        score2 : i.score2,
                                        score3 : i.score3,
                                        score4 : i.score4,
                                        score5 : i.score5,
                                        score6 : i.score6,
                                        score7 : i.score7,
                                        score8 : i.score8,
                                        score9 : i.score9,
                        })}</TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default ProgramSatisfaction;