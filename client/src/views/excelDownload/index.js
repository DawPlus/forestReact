import React ,{useState}from "react";
import MainCard from 'ui-component/cards/MainCard';
import callApi from "utils/callApi";
import moment from "moment";
import XLSX from "xlsx-js-style"
import { defaultStyle, headerStyle } from "utils/utils";

// 이 데이터를 변경해서  새로운 배열을 만드려해 
// ["구분", "건(사회공헌)", "실인원(사회공헌)", "연인원(사회공헌)", "건(수입구분)", "실인원(수입구분)", "연인원(수입구분)", "건(전체)", "실인원(전체)", "연인원(전체)"]

// 구분은 년도에 해당하고 1,2,3,4,5,.... 12월 까지 해서 만들꺼야  위 데이터에서 비어있는 달이 있다면 체워 넣어 0 을 입력하고싶어 

// 각 BIZ_PURPOSE 에 따라 순서대로 



// 프로그램목록명
const sheet1Header = [["분야", "프로그램명", "강사명", "내부강사", "외부강사"]];
const sheet2Header = [["순번", "년도", "월", "일", "사업구분", "목적구분", "단체명", "지역", "단체유형", "참여형태", "대상", "체류일", "참여인원", "연인원", "폐광지역", "OM", "지출금액"]];
const sheet3Header = [["순번", "년도", "월", "일", "단체명", "분야", "프로그램명", "강사명", "항목1", "항목2", "항목3", "항목4", "항목5", "항목6", "항목7", "항목8", "항목9"]];
const sheet4Header = [ ['순번', '강사명', '프로그램명','횟수', '전문성',"성실성", "반응성", "평균", "체계성", "적합성", "흥미성", '평균', "학습성", "재참여", "추천", "평균", "총평균"] ];
const sheet5Header = [["구분", "건(사회공헌)", "실인원(사회공헌)", "연인원(사회공헌)", "건(수입구분)", "실인원(수입구분)", "연인원(수입구분)", "건(전체)", "실인원(전체)", "연인원(전체)"]];

const ExcelDownload = ()=>{


    const onClick = ()=>{

        callApi("/excelData/programList").then(({data : {sheet1, sheet2,sheet3, sheet4}})=>{
            
            // Excel WorkBook 선언 
            const wb = XLSX.utils.book_new();
            const todayInfo = moment().format("YYYY-MM-DD");
            
            
            // 프로그램 목록
            const sheet1Data = sheet1.map(i=> i.PROGRAM_IN_OUT).filter((i, idx)=> idx <30);
            const sheet1Result = sheet1Data.flatMap(row => {
                const items = row.split(","); // 각 로우를 ,로 분리하여 배열로 변환
                const subResult = [];
                for (let i = 0; i < items.length; i += 5) {
                    subResult.push(items.slice(i, i + 5)); // 각 하위 배열을 추가
                }
                return subResult;
            });
            // 프로그램목록 탭 
            const _sheet1Header = sheet1Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet1Data = sheet1Result.map(values => values.map(value => ({ v: value, t: 's', s: defaultStyle })));
            // Create worksheet
            const sh1 = XLSX.utils.aoa_to_sheet([..._sheet1Header, ..._sheet1Data]);
            
            sh1['!cols'] = [ {wch:25}, {wch:20}, {wch:15}, {wch:15}, {wch:15}];
            sh1['!rows'] = Array(sheet1Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh1, "프로그램목록");
            // 프로그램 목록 끝 


            // 운영현황
            // 운영현황 탭 
            const sheet2Result = sheet2.map(obj => Object.values(obj))
            const _sheet2Header = sheet2Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet2Data = sheet2Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh2 = XLSX.utils.aoa_to_sheet([..._sheet2Header, ..._sheet2Data]);
            sh2['!cols'] =   [ {wch:8}, {wch:10}, {wch:7}, {wch:7}, {wch:15}, {wch:25}, {wch:20}, {wch:15}, {wch:15}, {wch:17}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:11}, {wch:11}, {wch:11}, {wch:13}, {wch:13}, {wch:11}, {wch:13} ];
            sh2['!rows'] = Array(sheet2Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh2, "운영현황");
            // 운영현황 끝 

            // 프로그램현황
            const sheet3Result = sheet3.map(obj => Object.values(obj))
            const _sheet3Header = sheet3Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet3Data = sheet3Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh3 = XLSX.utils.aoa_to_sheet([..._sheet3Header, ..._sheet3Data]);
            sh3['!cols'] =   [ {wch:8}, {wch:8}, {wch:8}, {wch:8}, {wch:30}, {wch:20}, {wch:20}, {wch:20}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10} ];
            sh3['!rows'] = Array(sheet3Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh3, "프로그램현황");
            // 프로그램현황


            // 강사현황
            const sheet4Result = sheet4.map(obj => Object.values(obj))
            const _sheet4Header = sheet4Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet4Data = sheet4Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh4 = XLSX.utils.aoa_to_sheet([..._sheet4Header, ..._sheet4Data]);
            sh4['!cols'] =   [ {wch:7}, {wch:10}, {wch:25}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}];
            sh4['!rows'] = Array(sheet4Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh4, "강사현황");
            // 강사현황


            
            // // 월실적
            // // 월실적
            // const sheet3Result = sheet3.map(obj => Object.values(obj))
            // const _sheet3Header = sheet3Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            // const _sheet3Data = sheet3Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // // Create worksheet
            // const sh3 = XLSX.utils.aoa_to_sheet([..._sheet2Header, ..._sheet2Data]);
            // sh3['!cols'] =   [ {wch:8}, {wch:10}, {wch:7}, {wch:7}, {wch:15}, {wch:15}, {wch:25}, {wch:10}, {wch:15}, {wch:15}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:11}, {wch:11}, {wch:11}, {wch:13}, {wch:13}, {wch:11}, {wch:13} ];
            // sh3['!rows'] = Array(sheet1Header.length).fill({ hpx: 23 }); 
            // XLSX.utils.book_append_sheet(wb, sh3, "운영현황");
            // // 운영현황 끝 



            XLSX.writeFile(wb, `통계서비스_${todayInfo}.xlsx`);


        })
    }



    




    return (<>
        <MainCard>
            <button onClick={onClick}>다운</button>


        </MainCard>
    
    </>)


}
export default ExcelDownload;
