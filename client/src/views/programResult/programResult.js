import React from "react";
import { getState} from "store/reducers/programResultReducer"
import {  useSelector } from "react-redux";
import DynamicTable from "ui-component/DynamicTableNoRow";

const ProgramResult = ()=>{ 

    const {rows} = useSelector(s=> getState(s).searchResult)
    
    const headerInfo = [
        ['주제어1', '주제어2', '주제어3', '강사', '강사', '강사', '강사', '내용구성', '내용구성', '내용구성', '내용구성', '효과성', '효과성', '효과성', '효과성', '평균'],
        ['', '', '',  '전문성', '성실성', '반응성', '평균', '체계성', '적합성', '흥미성', '평균', '학습성', '재참여', '추천', '평균', '']
    ]
    const dataCell = ['keyword0', 'keyword1', 'keyword2', 'SCORE1', 'SCORE2', 'SCORE3', 'avg1', 'SCORE4', 'SCORE5', 'SCORE6', 'avg2', 'SCORE7', 'SCORE8', 'SCORE9', 'avg3', 'avg4'];
    const avgCell = ['', '', '통계', 'SCORE1', 'SCORE2', 'SCORE3', 'avg1', 'SCORE4', 'SCORE5', 'SCORE6', 'avg2', 'SCORE7', 'SCORE8', 'SCORE9', 'avg3', 'avg4'];
    
    var wscols = [ {wch:20}, {wch:20}, {wch:20}];
    
    return <>
        <DynamicTable headerInfo={headerInfo} dataCellInfo={dataCell} avgCellInfo={avgCell} rows={rows} wscols={wscols}/>
    </>

}
export default ProgramResult; 