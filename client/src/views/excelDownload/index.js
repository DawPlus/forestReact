import React from "react";
import MainCard from 'ui-component/cards/MainCard';
import callApi from "utils/callApi";
import moment from "moment";
import XLSX from "xlsx-js-style"
import { defaultStyle, headerStyle } from "utils/utils";
import DatePicker from "ui-component/inputs/datePicker";
import { Button, Grid} from '@mui/material';
import { useState } from "react";


// 프로그램목록명
//const sheet1Header = [["분야", "프로그램명", "강사명", "내부강사", "외부강사"]];
const sheet2Header = [["순번", "년도", "월", "일", "사업구분", "단체명", "지역", "단체유형", "참여형태", "연령대","참가자유형","서비스유형", "체류일", "참여인원", "연인원", "폐광지역", "OM", "지출금액"]];

const sheet3Header = [["순번", "년도", "월", "일", "단체명", "분야", "프로그램명", "강사명", "참가인원","항목1", "항목2", "항목3", "항목4", "항목5", "항목6", "항목7", "항목8", "항목9"]];
const sheet4Header = [ ['순번', '강사명', '프로그램명','횟수', '전문성',"성실성", "반응성", "평균", "체계성", "적합성", "흥미성", '평균', "학습성", "재참여", "추천", "평균", "총평균"] ];
//const sheet5Header = [["구분", "건(사회공헌)", "실인원(사회공헌)", "연인원(사회공헌)", "건(수입구분)", "실인원(수입구분)", "연인원(수입구분)", "건(전체)", "실인원(전체)", "연인원(전체)"]];

const ExcelDownload = ()=>{


    const onClick = ()=>{

        callApi("/excelData/programList", {openday, endday}).then(({data : {sheet1, sheet2,sheet3, sheet4, sheet5 ,sheet6,sheet7 ,sheet8, sheet9, sheet10, sheet11}})=>{
            

          

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

            
            // // 프로그램목록 탭 
            // const  = sheet1Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            // const _sheet1Data = sheet1Result.map(values => values.map(value => ({ v: value, t: 's', s: defaultStyle })));
            // // Create worksheet
            // const sh1 = XLSX.utils.aoa_to_sheet([..._sheet1Header, ..._sheet1Data]);
            
            // sh1['!cols'] = [ {wch:25}, {wch:20}, {wch:15}, {wch:15}, {wch:15}];
            // sh1['!rows'] = Array(sheet1Header.length).fill({ hpx: 23 }); 
          // XLSX.utils.book_append_sheet(wb, sh1, "프로그램목록");
            // 프로그램 목록 끝 


            // 운영현황
            // 운영현황 탭 
            const sheet2Result = sheet2.map(({OPENDAY, ...rest})=> ({...rest})).map(obj => Object.values(obj))
            const _sheet2Header = sheet2Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet2Data = sheet2Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh2 = XLSX.utils.aoa_to_sheet([..._sheet2Header, ..._sheet2Data]);
            sh2['!cols'] =   [ {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:15}, {wch:45}, {wch:15},{wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}, {wch:15}];
            sh2['!rows'] = Array(sheet2Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh2, "운영현황");
            // 운영현황 끝 

  
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


            // 프로그램현황 - 기존꺼 바꿔달라하여 바꿈 
        //     const sheet3Result = sheet3.map(obj => Object.values(obj))
        //    // const sheet3Result = sheet3TestData.map(obj => Object.values(obj))  -- 기존거
        //     const _sheet3Header = sheet3Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
        //     const _sheet3Data = sheet3Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
        //     // Create worksheet
        //     const sh3 = XLSX.utils.aoa_to_sheet([..._sheet3Header, ..._sheet3Data]);
        //     sh3['!cols'] =   [ {wch:8}, {wch:8}, {wch:8}, {wch:8}, {wch:45}, {wch:16}, {wch:25}, {wch:15}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13} ];
        //     sh3['!rows'] = Array(sheet3Header.length).fill({ hpx: 23 }); 
        //     XLSX.utils.book_append_sheet(wb, sh3, "프로그램현황");
            // // 프로그램현황


                 // 프로그램현황
            // const sheet3Result = sheet3.map(obj => Object.values(obj))

            const removeOpenday = sheet3.map(({OPENDAY, ...rest})=> ({...rest}))

            const sheet3Result = removeOpenday.map(obj => Object.values(obj))
            const _sheet3Header = sheet3Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet3Data = sheet3Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh3 = XLSX.utils.aoa_to_sheet([..._sheet3Header, ..._sheet3Data]);
            sh3['!cols'] =   [ {wch:8}, {wch:8}, {wch:8}, {wch:8}, {wch:40}, {wch:20}, {wch:20}, {wch:20}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10} ];
            sh3['!rows'] = Array(sheet3Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh3, "프로그램현황");


            // 프로그램현황- 미실행 포함
            const removeOpenday_2 = sheet11.map(({OPENDAY, ...rest})=> ({...rest}))

            const sheet3Result_2 = removeOpenday_2.map(obj => Object.values(obj))
            const _sheet3Data_2 = sheet3Result_2.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh3_2 = XLSX.utils.aoa_to_sheet([..._sheet3Header, ..._sheet3Data_2]);
            sh3_2['!cols'] =   [ {wch:8}, {wch:8}, {wch:8}, {wch:8}, {wch:40}, {wch:20}, {wch:20}, {wch:20}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10}, {wch:10} ];
            sh3_2['!rows'] = Array(sheet3Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh3_2, "프로그램현황(미실행포함)");
            // 프로그램현황










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
                ['순번', '강사명', '프로그램명', '설문참가인원', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도', '만족도'],
                ['', '', '', '', '강사', '강사', '강사', '강사', '내용구성', '내용구성', '내용구성', '내용구성', '효과성','효과성','효과성','효과성',  '평균'],
                ['','','','', '전문성', '성실성', '반응성', '평균', '체계성', '적합성', '흥미성', '평균', '학습성', '재참여', '추천', '평균', '']
            ];
            const _sheet4Header = sheet4Header2.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )

            // 병합할 셀 범위를 지정합니다.
            const mergeRange = [
                { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // 순번
                { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // 강사명
                { s: { r: 0, c: 2 }, e: { r: 2, c: 2 } }, // 프로그램명
                { s: { r: 0, c: 3 }, e: { r: 2, c: 3 } }, // 설문참가인원
                { s: { r: 0, c: 4 }, e: { r: 0, c: 16 } }, // 만족도

                { s: { r: 1, c: 4 }, e: { r: 1, c: 7 } }, // 강사
                { s: { r: 1, c: 8 }, e: { r: 1, c: 11 } }, // 내용구성
                { s: { r: 1, c: 12 }, e: { r: 1, c: 15 } }, // 내용구성
                { s: { r: 1, c: 16 }, e: { r: 2, c: 16 } }, // 평균
            ];


            const sheet4Data = sheet4.map(obj => Object.values(obj))
            

            const _sheet4Data = sheet4Data.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            //const _sheet4Data = sheet4Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh4 = XLSX.utils.aoa_to_sheet([..._sheet4Header, ..._sheet4Data]);
            sh4['!merges'] = mergeRange;
            sh4['!cols'] =   [ {wch:7}, {wch:10}, {wch:25}, {wch:20}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}];
            sh4['!rows'] = Array(sheet4Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh4, "강사현황");


            // 강사현황
            //const sheet4Result = sheet4.map(obj => Object.values(obj))
            const sheet5Result = sheet5.map(obj => Object.values(obj))
            const sheet5Header =     [
                ['순번', '년도', '월', '일', '단체명','참가인원','숙소','숙소','식당','식당','프로그램장소','프로그램장소','프로그램장소','숲(야외)','숲(야외)','숲(야외)','운영','운영','운영','식사','식사','식사', '평균'],
                ['','','','','','','편리성','청결도','편리성','청결도','편리성','청결도','적절성','편리성','청결도','적절성','운영방식','시간편성','직원친절','신선도','다양성','영양', ''],
            ]
            const _sheet5Header = sheet5Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )

            // 병합할 셀 범위를 지정합니다.
            const mergeRangeSheet5 = [
                { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // 순번
                { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // 년도
                { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // 월
                { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // 일
                { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } }, // 단체명
                { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } }, // 참가인원
                { s: { r: 0, c: 6 }, e: { r: 0, c: 7 } }, // 숙소
                { s: { r: 0, c: 8 }, e: { r: 0, c: 9 } }, // 식당
                { s: { r: 0, c: 10 }, e: { r: 0, c: 12 } }, // 프로그램장소
                { s: { r: 0, c: 13 }, e: { r: 0, c: 15 } }, // 숲(야외)
                { s: { r: 0, c: 16 }, e: { r: 0, c: 18 } }, // 운영
                { s: { r: 0, c: 19 }, e: { r: 0, c: 21 } }, // 식사
                { s: { r: 0, c: 22 }, e: { r: 1, c: 22 } }, // 평균
            ];


            const _sheet5Data = sheet5Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh5 = XLSX.utils.aoa_to_sheet([..._sheet5Header, ..._sheet5Data]);
            sh5['!merges'] = mergeRangeSheet5;
            sh5['!cols'] =   [ {wch:8}, {wch:10}, {wch:10}, {wch:10}, {wch:45}, {wch:10}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}, {wch:13}];
            sh5['!rows'] = Array(sheet5Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh5, "시설서비스만족도");


            const sheet6Header =     [
                ['순번', '년도', '월', '일', '단체명','참가인원', '구분', '프로그램효과', '프로그램효과' ],
                ['', '', '', '', '' , '', '', '힐링효과(합계)', '힐링효과(평균)' ],
            ]
                // 병합할 셀 범위를 지정합니다.
                const mergeRangeSheet6 = [
                    { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // 순번
                    { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // 년도
                    { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // 월
                    { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // 일
                    { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } }, // 단체명
                    { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } }, // 참가인원

                    { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } }, // 구분
                    { s: { r: 0, c: 7 }, e: { r: 0, c: 8 } }, // 자율신경검사효과
                    
                ];
    
            const _sheet6Header = sheet6Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const sheet6Result = sheet6.map(obj => Object.values(obj))
            const _sheet6Data = sheet6Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh6 = XLSX.utils.aoa_to_sheet([..._sheet6Header, ..._sheet6Data]);
            sh6['!merges'] = mergeRangeSheet6;
            sh6['!cols'] =   [ {wch:7}, {wch:12}, {wch:8}, {wch:8}, {wch:45}, {wch:12}, {wch:12}, {wch:17}, {wch:17}];
            sh6['!rows'] = Array(sheet5Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh6, "효과성분석(힐링효과)");
            







            const sheet7Header =     [
                ['순번', '년도', '월', '일','단체명','참가인원' ,'구분', '프로그램효과', '프로그램효과' ],
                ['', '', '', '', '' , '', '', '예방효과(합계)', '예방효과(평균)' ],
            ]

            const _sheet7Header = sheet7Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const sheet7Result = sheet7.map(obj => Object.values(obj))
            const _sheet7Data = sheet7Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh7 = XLSX.utils.aoa_to_sheet([..._sheet7Header, ..._sheet7Data]);
            sh7['!merges'] = mergeRangeSheet6;
            sh7['!cols'] =   [ {wch:7}, {wch:12}, {wch:8}, {wch:8}, {wch:45}, {wch:12}, {wch:12}, {wch:17}, {wch:17}];
            sh7['!rows'] = Array(sheet5Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh7, "효과성분석(예방효과)");
            




            const sheet8Header =     [
                ['순번', '년도', '월', '일', '단체명', '참가인원', '구분', '프로그램효과', '프로그램효과' ],
                ['', '', '', '', '' , '', '', '상담치유효과(합계)', '상담치유효과(평균)' ],
            ]
            
            const _sheet8Header = sheet8Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const sheet8Result = sheet8.map(obj => Object.values(obj))
            const _sheet8Data = sheet8Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            const _s8data = _sheet8Data.length === 0 ? [['조회된 데이터가 없습니다']] : _sheet8Data;

            const sh8 = XLSX.utils.aoa_to_sheet([..._sheet8Header, ..._s8data]);
            sh8['!merges'] = mergeRangeSheet6;
            sh8['!cols'] =   [ {wch:7}, {wch:12}, {wch:8}, {wch:8}, {wch:45}, {wch:12}, {wch:12}, {wch:25}, {wch:25}];
            sh8['!rows'] = Array(sheet5Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh8, "효과성분석(상담치유)");


            const sheet9Header =     [
                ['순번', '년도', '월', '일', '단체명', '참가인원' , '구분', '자율신경검사효과성', '자율신경검사효과성', '자율신경검사효과성', '자율신경검사효과성', '자율신경검사효과성'],
                ['', '', '', '', '' , '', '', '자율신경활성도', '자율신경균형도', '스트레스저항도' , '스트레스지수', '피로도'],
            ]

            // 병합할 셀 범위를 지정합니다.
            const mergeRangeSheet9 = [
                { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // 순번
                { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // 년도
                { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // 월
                { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // 일
                { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } }, // 단체명
                
                { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } }, // 참가인원
                { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } }, // 구분
                { s: { r: 0, c: 7 }, e: { r: 0, c: 11 } }, // 자율신경검사효과
            ];


            const _sheet9Header = sheet9Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const sheet9Result = sheet9.map(obj => Object.values(obj))
            const _sheet9Data = sheet9Result.map(values => values.map(value => ({ v: value|| "0", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh9 = XLSX.utils.aoa_to_sheet([..._sheet9Header, ..._sheet9Data]);

            sh9['!merges'] = mergeRangeSheet9;
            sh9['!cols'] =   [ {wch:7}, {wch:12}, {wch:9}, {wch:9}, {wch:45}, {wch:12}, {wch:12}, {wch:17}, {wch:17}, {wch:17}, {wch:17}, {wch:17}];
            sh9['!rows'] = Array(sheet5Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh9, "효과성분석(자율신경효과성)");
            


            const sheet10Header = [["순번", "강사명", "프로그램명", "분야", "강의횟수"]];
            // 강사현황횟수추가
            // 강사현황횟수추가 탭 
            const sheet10Result = sheet10.map((i, index)=> ({index : index+1,  ...i, })).map(obj => Object.values(obj))
            const _sheet10Header = sheet10Header.map(item => item.map( i => ({v : i, t : 's', s : headerStyle})) )
            const _sheet10Data = sheet10Result.map(values => values.map(value => ({ v: value|| "", t: 's', s: defaultStyle })));
            // Create worksheet
            const sh10 = XLSX.utils.aoa_to_sheet([..._sheet10Header, ..._sheet10Data]);
            sh10['!cols'] =   [ {wch:8}, {wch:15}, {wch:45}, {wch:15}, {wch:15} ];
            sh10['!rows'] = Array(_sheet10Header.length).fill({ hpx: 23 }); 
            XLSX.utils.book_append_sheet(wb, sh10, "강의횟수");
            // 강사현황횟수추가 끝 


       


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
                    </Grid>
                
                </Grid>

        </MainCard>
    
    </>)


}
export default ExcelDownload;
