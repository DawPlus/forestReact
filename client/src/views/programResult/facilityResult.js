import React , {useMemo} from "react";
import { getState} from "store/reducers/programResultReducer"
import {  useSelector } from "react-redux";
import DynamicTable from "ui-component/DynamicTableNoRow";

const FacilityResult = ()=>{ 

    const {rows} = useSelector(s=> getState(s).searchResult)
    
    const headerInfo = useMemo(()=>[
        ['주제어1', '주제어2', '주제어3', '숙소', '숙소', '식당', '식당', '프로그램장소', '프로그램장소', '프로그램장소', '숲(야외)', '숲(야외)', '숲(야외)',  '운영', '운영', '운영', '식사', '식사', '식사',  '잠재적관광수요', '잠재적관광수요', '평균', '평균', '평균', '평균', '평균', '평균', '평균'],
        ['', '', '', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6', '문항7', '문항8', '문항9', '문항10', '문항1', '문항2', '문항3', '문항4', '문항5', '문항6','문항7','문항8','숙소','식당','프로그램장소','숲(야외)','운영','식당','잠재적관광수요']
    ], []) 
    
    const dataCell = useMemo(()=>['keyword0', 'keyword1', 'keyword2','SCORE1','SCORE2','SCORE3','SCORE4','SCORE5','SCORE6','SCORE7','SCORE8','SCORE9', 'SCORE10',   'SCORE11','SCORE12','SCORE13','SCORE14','SCORE15','SCORE16', 'SCORE17','SCORE18' , 'sum1', 'sum2', 'sum3', 'sum4', 'sum5', 'sum6', 'sum7'],[]);

    const avgCell = useMemo(()=>['', '', '통계', 'SCORE1','SCORE2','SCORE3','SCORE4','SCORE5','SCORE6','SCORE7','SCORE8','SCORE9', 'SCORE10',  'SCORE11','SCORE12','SCORE13','SCORE14','SCORE15','SCORE16',  'SCORE17','SCORE18' , 'sum1', 'sum2', 'sum3', 'sum4', 'sum5', 'sum6', 'sum7'],[]);
    
    var wscols = useMemo(()=>[ {wch:25}, {wch:25}, {wch:25}],[]);
    
    return <>
        <DynamicTable headerInfo={headerInfo} dataCellInfo={dataCell} avgCellInfo={avgCell} rows={rows} wscols={wscols}/>
    </>

}
export default FacilityResult; 