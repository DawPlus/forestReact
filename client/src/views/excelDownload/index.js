import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import callApi from "utils/callApi";
import moment from "moment";
import XLSX from "xlsx-js-style"
import { defaultStyle, headerStyle } from "utils/utils";
import DatePicker from "ui-component/inputs/datePicker";
import { Button, Grid} from '@mui/material';
import { useState } from "react";
// 이 데이터를 변경해서  새로운 배열을 만드려해 
// ["구분", "건(사회공헌)", "실인원(사회공헌)", "연인원(사회공헌)", "건(수입구분)", "실인원(수입구분)", "연인원(수입구분)", "건(전체)", "실인원(전체)", "연인원(전체)"]

// 구분은 년도에 해당하고 1,2,3,4,5,.... 12월 까지 해서 만들꺼야  위 데이터에서 비어있는 달이 있다면 체워 넣어 0 을 입력하고싶어 

// 각 BIZ_PURPOSE 에 따라 순서대로 



// 프로그램목록명
const sheet1Header = [["분야", "프로그램명", "강사명", "내부강사", "외부강사"]];
const sheet2Header = [["순번", "년도", "월", "일", "사업구분", "목적구분", "단체명", "지역", "단체유형", "참여형태", "대상", "체류일", "참여인원", "연인원", "폐광지역", "OM", "지출금액"]];
const sheet3Header = [["순번", "년도", "월", "일", "단체명", "분야", "프로그램명", "강사명", "참가인원","항목1", "항목2", "항목3", "항목4", "항목5", "항목6", "항목7", "항목8", "항목9"]];
const sheet4Header = [ ['순번', '강사명', '프로그램명','횟수', '전문성',"성실성", "반응성", "평균", "체계성", "적합성", "흥미성", '평균', "학습성", "재참여", "추천", "평균", "총평균"] ];
//const sheet5Header = [["구분", "건(사회공헌)", "실인원(사회공헌)", "연인원(사회공헌)", "건(수입구분)", "실인원(수입구분)", "연인원(수입구분)", "건(전체)", "실인원(전체)", "연인원(전체)"]];

const ExcelDownload = ()=>{


    const onClick = ()=>{

        callApi("/excelData/programList", {openday, endday}).then(({data : {sheet1, sheet2,sheet3, sheet4}})=>{
            

          

            // Excel WorkBook 선언 
            const wb = XLSX.utils.book_new();
            const todayInfo = moment().format("YYYY-MM-DD");
            
            
            // 프로그램 목록
            // const sheet1Data = sheet1.map(i=> i.PROGRAM_IN_OUT).filter((i, idx)=> idx <30);
            // const sheet1Result = sheet1Data.flatMap(row => {
            //     const items = row.split(","); // 각 로우를 ,로 분리하여 배열로 변환
            //     const subResult = [];
            //     for (let i = 0; i < items.length; i += 5) {
            //         subResult.push(items.slice(i, i + 5)); // 각 하위 배열을 추가
            //     }
            //     return subResult;
            // });

     
            // 프로그램 목록
            const sheet1Data = sheet1.map(i=> {

                const dataArr = i.PROGRAM_IN_OUT.split(",")

                    // 결과를 저장할 배열 초기화
                    const result = [];

                    // 데이터를 5개씩 그룹화하여 배열에 추가
                    for (let j = 0; j < dataArr.length; j += 5) {
                        const program = {
                            openday : i.OPENDAY, 
                            agency : i.AGENCY, 
                            PROGRAM_NAME: dataArr[j],
                            BUNYA: dataArr[j + 1],
                            TEACHER: dataArr[j + 2],
                        };
                        result.push(program);
                    }


                return {openday : i.OPENDAY, agency : i.AGENCY, programs : result}


            })

                // 결과를 저장할 배열 초기화
                const mergedData = [];

                // data1을 기준으로 반복
                for (const item1 of sheet1Data) {
                    const matchingData2 = sheet3.find(item2 => item1.openday === item2.OPENDAY && item1.agency === item2.agency);

                    // 새로운 객체를 생성하여 programs 목록을 복제
                    const newItem = { ...item1, programs: [...item1.programs] };

                    if (matchingData2) {
                        // data2에서 일치하는 항목을 찾았을 때
                        // programs 목록을 업데이트
                        newItem.programs = newItem.programs.map(program => {
                            const matchingProgram2 = matchingData2.PROGRAM_NAME === program.PROGRAM_NAME &&
                                matchingData2.BUNYA === program.BUNYA &&
                                matchingData2.TEACHER === program.TEACHER;
                            
                            if (matchingProgram2) {
                                // data2에서 PROGRAM_NAME, BUNYA, TEACHER가 일치하는 경우
                                // avg_score 값을 추가

                                program.row_count = matchingData2.row_count || "";
                                program.avg_score1 = matchingData2.avg_score1 || "";
                                program.avg_score2 = matchingData2.avg_score2 || "";
                                program.avg_score3 = matchingData2.avg_score3 || "";
                                program.avg_score4 = matchingData2.avg_score4 || "";
                                program.avg_score5 = matchingData2.avg_score5 || "";
                                program.avg_score6 = matchingData2.avg_score6 || "";
                                program.avg_score7 = matchingData2.avg_score7 || "";
                                program.avg_score8 = matchingData2.avg_score8 || "";
                                program.avg_score9 = matchingData2.avg_score9 || "";
                            } else {
                                // data2에서 일치하지 않는 항목에는 빈 문자열을 추가
                                program.row_count = "";
                                program.avg_score1 = "";
                                program.avg_score2 = "";
                                program.avg_score3 = "";
                                program.avg_score4 = "";
                                program.avg_score5 = "";
                                program.avg_score6 = "";
                                program.avg_score7 = "";
                                program.avg_score8 = "";
                                program.avg_score9 = "";
                            }
                            return program;
                        });
                    } else {
                        // data2에서 일치하는 항목을 찾지 못한 경우
                        // programs 목록에 빈 문자열을 추가
                        newItem.programs.forEach(program => {
                            program.row_count = "";
                            program.avg_score1 = "";
                            program.avg_score2 = "";
                            program.avg_score3 = "";
                            program.avg_score4 = "";
                            program.avg_score5 = "";
                            program.avg_score6 = "";
                            program.avg_score7 = "";
                            program.avg_score8 = "";
                            program.avg_score9 = "";
                        });
                    }

                    // 결과 배열에 추가
                    mergedData.push(newItem);
                }

                const resultPrograms = [];

                for (const item of mergedData) {
                    resultPrograms.push(...item.programs);
                }
    

            // 중복된 항목을 제거하기 위해 Set을 사용
            const uniqueKeys = new Set();

            const deduplicatedData = resultPrograms.filter(item => {
                const key = `${item.OPENDAY}-${item.agency}-${item.PROGRAM_NAME}-${item.BUNYA}-${item.TEACHER}`;
                if (!uniqueKeys.has(key)) {
                    uniqueKeys.add(key);
                    return true;
                }
                return false;
            });


            const sheet3TestData = deduplicatedData.map(({openday, ...rest}, idx)=> ({
                순번 : idx +1, 
                년도: new Date(openday).getFullYear(),
                월: new Date(openday).getMonth() + 1,
                일: new Date(openday).getDate(),
                agency : rest.agency , 
                bunya : rest.BUNYA, 
                PROGRAM_NAME : rest.PROGRAM_NAME, 
                TEACHER : rest.TEACHER, 
                rowCount : rest.row_count,
                avg_score1 : rest.avg_score1,
                avg_score2 : rest.avg_score2,
                avg_score3 : rest.avg_score3,
                avg_score4 : rest.avg_score4,
                avg_score5 : rest.avg_score5,
                avg_score6 : rest.avg_score6,
                avg_score7 : rest.avg_score7,
                avg_score8 : rest.avg_score8,
                avg_score9 : rest.avg_score9,

            }));
            
            
            // // 프로그램목록 탭 
            // const _sheet1Header = sheet1Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            // const _sheet1Data = sheet1Result.map(values => values.map(value => ({ v: value, t: 's', s: defaultStyle })));
            // // Create worksheet
            // const sh1 = XLSX.utils.aoa_to_sheet([..._sheet1Header, ..._sheet1Data]);
            
            // sh1['!cols'] = [ {wch:25}, {wch:20}, {wch:15}, {wch:15}, {wch:15}];
            // sh1['!rows'] = Array(sheet1Header.length).fill({ hpx: 23 }); 
          // XLSX.utils.book_append_sheet(wb, sh1, "프로그램목록");
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
            //const sheet3Result = sheet3.map(obj => Object.values(obj))
            const sheet3Result = sheet3TestData.map(obj => Object.values(obj))
            const _sheet3Header = sheet3Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet3Data = sheet3Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh3 = XLSX.utils.aoa_to_sheet([..._sheet3Header, ..._sheet3Data]);
            sh3['!cols'] =   [ {wch:8}, {wch:8}, {wch:8}, {wch:8}, {wch:30}, {wch:20}, {wch:20}, {wch:20}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10} ];
            sh3['!rows'] = Array(sheet3Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh3, "프로그램현황");
            // 프로그램현황







            console.log(deduplicatedData)





            // 중복을 제거한 데이터를 기준으로 각 조합의 등장 횟수를 계산
            const countData = deduplicatedData.reduce((acc, item) => {
                const key = `${item.TEACHER}-${item.PROGRAM_NAME}-${item.BUNYA}`;
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});
            
     
            // 결과 데이터 생성
            const result = Object.entries(countData).map(([key, count]) => {
                const [TEACHER, PROGRAM_NAME, BUNYA] = key.split('-');
                return { TEACHER, PROGRAM_NAME, BUNYA, CNT: count };
            });
            
     


            const sheet4Merge = result.map((item, idx) => {
                const matchingItem = sheet4.find(data => data.TEACHER === item.TEACHER && data.PROGRAM_NAME === item.PROGRAM_NAME);
                    return {
                        idx : idx +1, 
                        TEACEHR : item.TEACHER, 
                        PROGRAM_NAME : item.PROGRAM_NAME, 
                        CNT : item.CNT,
                        avg_score1: matchingItem ? matchingItem.avg_score1 : "",
                        avg_score2: matchingItem ? matchingItem.avg_score2 : "",
                        avg_score3: matchingItem ? matchingItem.avg_score3 : "",
                        avg_avg1: matchingItem ? matchingItem.avg_avg1 : "",
                        avg_score4: matchingItem ? matchingItem.avg_score4 : "",
                        avg_score5: matchingItem ? matchingItem.avg_score5 : "",
                        avg_score6: matchingItem ? matchingItem.avg_score6 : "",
                        avg_avg2: matchingItem ? matchingItem.avg_avg2 : "",
                        avg_score7: matchingItem ? matchingItem.avg_score7 : "",
                        avg_score8: matchingItem ? matchingItem.avg_score8 : "",
                        avg_score9: matchingItem ? matchingItem.avg_score9 : "",
                        avg_avg3: matchingItem ? matchingItem.avg_avg3 : "",
                        total_avg: matchingItem ? matchingItem.total_avg : "",
                    };
            });
            
   




            // 강사현황
            //const sheet4Result = sheet4.map(obj => Object.values(obj))
            const sheet4Result = sheet4Merge.map(obj => Object.values(obj))
            
            
            
            // 표의 헤더를 정의합니다.
            const sheet4Header2 = [
                ['순번', '강사명', '프로그램명', '횟수', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도'],
                ['', '', '', '', '강사', '강사', '강사', '강사', '내용구성', '내용구성', '내용구성', '내용구성', '효과성','효과성','효과성','효과성',  '평균'],
                ['','','','', '전문성', '성실성', '반응성', '평균', '체계성', '적합성', '흥미성', '평균', '학습성', '재참여', '추천', '평균', '']
            ];
            const _sheet4Header = sheet4Header2.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )

            // 병합할 셀 범위를 지정합니다.
            const mergeRange = [
                { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // 순번
                { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // 강사명
                { s: { r: 0, c: 2 }, e: { r: 2, c: 2 } }, // 프로그램명
                { s: { r: 0, c: 3 }, e: { r: 2, c: 3 } }, // 횟수
                { s: { r: 0, c: 4 }, e: { r: 0, c: 16 } }, // 만족도

                { s: { r: 1, c: 4 }, e: { r: 1, c: 7 } }, // 강사
                { s: { r: 1, c: 8 }, e: { r: 1, c: 11 } }, // 내용구성
                { s: { r: 1, c: 12 }, e: { r: 1, c: 15 } }, // 내용구성
                { s: { r: 1, c: 16 }, e: { r: 2, c: 16 } }, // 평균
            ];



            const _sheet4Data = sheet4Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh4 = XLSX.utils.aoa_to_sheet([..._sheet4Header, ..._sheet4Data]);
            

            sh4['!merges'] = mergeRange;
            sh4['!cols'] =   [ {wch:7}, {wch:10}, {wch:25}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}];
            sh4['!rows'] = Array(sheet4Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh4, "강사현황");
            // 강사현황


            


            XLSX.writeFile(wb, `통계서비스_${todayInfo}.xlsx`);


        })
    }



    
    const onClick2 = ()=>{

        callApi("/excelData/programList", {openday, endday}).then(({data : {sheet1, sheet2,sheet3, sheet4}})=>{
            

          

            // Excel WorkBook 선언 
            const wb = XLSX.utils.book_new();
            const todayInfo = moment().format("YYYY-MM-DD");
            
            
            // 프로그램 목록
            // const sheet1Data = sheet1.map(i=> i.PROGRAM_IN_OUT).filter((i, idx)=> idx <30);
            // const sheet1Result = sheet1Data.flatMap(row => {
            //     const items = row.split(","); // 각 로우를 ,로 분리하여 배열로 변환
            //     const subResult = [];
            //     for (let i = 0; i < items.length; i += 5) {
            //         subResult.push(items.slice(i, i + 5)); // 각 하위 배열을 추가
            //     }
            //     return subResult;
            // });

     

            
            // // 프로그램목록 탭 
            // const _sheet1Header = sheet1Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            // const _sheet1Data = sheet1Result.map(values => values.map(value => ({ v: value, t: 's', s: defaultStyle })));
            // // Create worksheet
            // const sh1 = XLSX.utils.aoa_to_sheet([..._sheet1Header, ..._sheet1Data]);
            
            // sh1['!cols'] = [ {wch:25}, {wch:20}, {wch:15}, {wch:15}, {wch:15}];
            // sh1['!rows'] = Array(sheet1Header.length).fill({ hpx: 23 }); 
          // XLSX.utils.book_append_sheet(wb, sh1, "프로그램목록");
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
            //const sheet3Result = sheet3.map(obj => Object.values(obj))

            const removeOpenday = sheet3.map(({OPENDAY, ...rest})=> ({...rest}))

            const sheet3Result = removeOpenday.map(obj => Object.values(obj))
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
            
            
            
            
            // 표의 헤더를 정의합니다.
            const sheet4Header2 = [
                ['순번', '강사명', '프로그램명', '횟수', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도'],
                ['', '', '', '', '강사', '강사', '강사', '강사', '내용구성', '내용구성', '내용구성', '내용구성', '효과성','효과성','효과성','효과성',  '평균'],
                ['','','','', '전문성', '성실성', '반응성', '평균', '체계성', '적합성', '흥미성', '평균', '학습성', '재참여', '추천', '평균', '']
            ];
            const _sheet4Header = sheet4Header2.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )

            // 병합할 셀 범위를 지정합니다.
            const mergeRange = [
                { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // 순번
                { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // 강사명
                { s: { r: 0, c: 2 }, e: { r: 2, c: 2 } }, // 프로그램명
                { s: { r: 0, c: 3 }, e: { r: 2, c: 3 } }, // 횟수
                { s: { r: 0, c: 4 }, e: { r: 0, c: 16 } }, // 만족도

                { s: { r: 1, c: 4 }, e: { r: 1, c: 7 } }, // 강사
                { s: { r: 1, c: 8 }, e: { r: 1, c: 11 } }, // 내용구성
                { s: { r: 1, c: 12 }, e: { r: 1, c: 15 } }, // 내용구성
                { s: { r: 1, c: 16 }, e: { r: 2, c: 16 } }, // 평균
            ];



            const _sheet4Data = sheet4Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh4 = XLSX.utils.aoa_to_sheet([..._sheet4Header, ..._sheet4Data]);
            

            sh4['!merges'] = mergeRange;
            sh4['!cols'] =   [ {wch:7}, {wch:10}, {wch:25}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}];
            sh4['!rows'] = Array(sheet4Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh4, "강사현황");
            // 강사현황


            


            XLSX.writeFile(wb, `통계서비스_${todayInfo}.xlsx`);


        })
    }



    
    const [openday , setOpenday] = useState("");
    const [endday , setEndday] = useState("");


    return (<>
        <MainCard>
        <       Grid container spacing={2} justifyItems={"center"} alignItems="center">
                    <Grid item md={4}>
                        <DatePicker label="시작일"name="openday" value={openday} onChange={(_, value)=>setOpenday(value)}/>
                    </Grid>
                    <Grid item md={4}>
                        <DatePicker label="종료일"name="e" value={endday} onChange={(_, value)=>setEndday(value)}/>
                    </Grid>
                    <Grid item md={4}>
                        <Button variant="contained" size="small" color="primary" onClick={onClick}  >신규엑셀데이터 다운로드</Button>
                        <Button variant="contained" size="small" color="primary" onClick={onClick2} style={{marginLeft : "15px"}}>기존엑셀데이터 다운로드</Button>
                        
                    </Grid>
                
                </Grid>

        </MainCard>
    
    </>)


}
export default ExcelDownload;
