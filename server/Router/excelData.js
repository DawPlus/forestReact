const express = require('express');
const router = express.Router();
const maria = require("../maria");




// 프로그램목록
const sheet1Sql = `SELECT * FROM basic_info`;
// 운영현황
const sheet2Sql = `
        SELECT
            ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) DESC, MONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) DESC, DAYOFMONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
            YEAR(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) AS 년도,
            MONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) AS 월,
            DAYOFMONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) AS 일,
            bi.BIZ_PURPOSE,
            bi.SERVICE_TYPE,
            bi.AGENCY,
            bi.RESIDENCE,
            bi.ORG_NATURE,
            bi.PART_FORM,
            bi.AGE_TYPE,
            bi.DAYS_TO_STAY,
            (bi.PART_MAN_CNT + bi.PART_WOMAN_CNT + bi.LEAD_MAN_CNT + bi.LEAD_WOMAN_CNT) AS CNT,
            (bi.PART_MAN_CNT + bi.PART_WOMAN_CNT + bi.LEAD_MAN_CNT + bi.LEAD_WOMAN_CNT) * bi.DAYS_TO_STAY AS REAL_CNT,
            bi.ISCLOSEMINE,
            bi.OM,
            ROUND(COALESCE(SUM(e.EXPENSE_PRICE), 0), 2) AS TOTAL_EXPENSE
        FROM
            dbstatistics.basic_info AS bi
        LEFT JOIN
            dbstatistics.expense AS e ON bi.BASIC_INFO_SEQ = e.BASIC_INFO_SEQ
        GROUP BY
            년도, 월, 일, bi.BASIC_INFO_SEQ
        ORDER BY
            순번;
`
const sheet3Sql = `

    SELECT
        RANK() OVER (ORDER BY YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC, 
                            MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                            DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
        YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
        MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
        DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 일,
        agency,
        BUNYA,
        PROGRAM_NAME,
        TEACHER,
        ROUND(AVG(CASE WHEN SCORE1 > 0 THEN SCORE1 ELSE NULL END), 2) AS avg_score1,
        ROUND(AVG(CASE WHEN SCORE2 > 0 THEN SCORE2 ELSE NULL END), 2) AS avg_score2,
        ROUND(AVG(CASE WHEN SCORE3 > 0 THEN SCORE3 ELSE NULL END), 2) AS avg_score3,
        ROUND(AVG(CASE WHEN SCORE4 > 0 THEN SCORE4 ELSE NULL END), 2) AS avg_score4,
        ROUND(AVG(CASE WHEN SCORE5 > 0 THEN SCORE5 ELSE NULL END), 2) AS avg_score5,
        ROUND(AVG(CASE WHEN SCORE6 > 0 THEN SCORE6 ELSE NULL END), 2) AS avg_score6,
        ROUND(AVG(CASE WHEN SCORE7 > 0 THEN SCORE7 ELSE NULL END), 2) AS avg_score7,
        ROUND(AVG(CASE WHEN SCORE8 > 0 THEN SCORE8 ELSE NULL END), 2) AS avg_score8,
        ROUND(AVG(CASE WHEN SCORE9 > 0 THEN SCORE9 ELSE NULL END), 2) AS avg_score9
    FROM
        dbstatistics.program_satisfaction

    GROUP BY
        agency,
        openday,
        BUNYA,
        PROGRAM_NAME,
        TEACHER;


`;
// TODO 평균 에 소수점 제외 , 0 제외 기능 추가 필요 
const sheet4Sql = `
    SELECT
        TEACHER,
        PROGRAM_NAME,
        COUNT(*) AS CNT,
        ROUND(AVG(CASE WHEN SCORE1 > 0 THEN SCORE1 ELSE NULL END), 2) AS avg_score1,
        ROUND(AVG(CASE WHEN SCORE2 > 0 THEN SCORE2 ELSE NULL END), 2) AS avg_score2,
        ROUND(AVG(CASE WHEN SCORE3 > 0 THEN SCORE3 ELSE NULL END), 2) AS avg_score3,
        ROUND(AVG(CASE WHEN SCORE4 > 0 THEN SCORE4 ELSE NULL END), 2) AS avg_score4,
        ROUND(AVG(CASE WHEN SCORE5 > 0 THEN SCORE5 ELSE NULL END), 2) AS avg_score5,
        ROUND(AVG(CASE WHEN SCORE6 > 0 THEN SCORE6 ELSE NULL END), 2) AS avg_score6,
        ROUND(AVG(CASE WHEN SCORE7 > 0 THEN SCORE7 ELSE NULL END), 2) AS avg_score7,
        ROUND(AVG(CASE WHEN SCORE8 > 0 THEN SCORE8 ELSE NULL END), 2) AS avg_score8,
        ROUND(AVG(CASE WHEN SCORE9 > 0 THEN SCORE9 ELSE NULL END), 2) AS avg_score9    
    FROM
        dbstatistics.program_satisfaction
    GROUP BY
        TEACHER,
        PROGRAM_NAME

`



const sheet5Sql = `
    SELECT
        YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
        MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
        BIZ_PURPOSE,
        COUNT(DISTINCT AGENCY) AS AGENCY_COUNT,
        SUM(
            CAST(bi.PART_MAN_CNT AS SIGNED) +
            CAST(bi.PART_WOMAN_CNT AS SIGNED) +
            CAST(bi.LEAD_MAN_CNT AS SIGNED) +
            CAST(bi.LEAD_WOMAN_CNT AS SIGNED)
        ) AS TOTAL_PEOPLE_COUNT,
        SUM(CAST(IF(bi.DAYS_TO_STAY = '', 0, bi.DAYS_TO_STAY) AS SIGNED)) AS TOTAL_DAYS_TO_STAY,
        SUM(
            (CAST(bi.PART_MAN_CNT AS SIGNED) +
            CAST(bi.PART_WOMAN_CNT AS SIGNED) +
            CAST(bi.LEAD_MAN_CNT AS SIGNED) +
            CAST(bi.LEAD_WOMAN_CNT AS SIGNED))
        ) * SUM(CAST(IF(bi.DAYS_TO_STAY = '', 0, bi.DAYS_TO_STAY) AS SIGNED)) AS TOTAL_PEOPLE_DAYS_MULTIPLIED
    FROM
        dbstatistics.basic_info bi
    GROUP BY
        년도, 월, BIZ_PURPOSE
    ORDER BY
        년도 DESC, 월 DESC, BIZ_PURPOSE;
`
//TODO 
//프로그램 목록조회
router.post('/programList', (req, res)=>{ 


    Promise.all([
        maria(sheet1Sql),
        maria(sheet2Sql),
        maria(sheet3Sql),
        maria(sheet4Sql),
    
    ])
    .then((results) => {
        let sheet1 = results[0]; // the result from the first query
        let sheet2 = results[1]; // the result from the second query
        let sheet3 = results[2]; // the result from the second query
        let sheet4 = results[3]; // the result from the second query
        sheet4 = sheet4.map((i, idx) => {
            const avgScore1 = i.avg_score1 !== null && i.avg_score1 !== 0 ? Number(i.avg_score1) : 0;
            const avgScore2 = i.avg_score2 !== null && i.avg_score2 !== 0 ? Number(i.avg_score2) : 0;
            const avgScore3 = i.avg_score3 !== null && i.avg_score3 !== 0 ? Number(i.avg_score3) : 0;
            const avgScore4 = i.avg_score4 !== null && i.avg_score4 !== 0 ? Number(i.avg_score4) : 0;
            const avgScore5 = i.avg_score5 !== null && i.avg_score5 !== 0 ? Number(i.avg_score5) : 0;
            const avgScore6 = i.avg_score6 !== null && i.avg_score6 !== 0 ? Number(i.avg_score6) : 0;
            const avgScore7 = i.avg_score7 !== null && i.avg_score7 !== 0 ? Number(i.avg_score7) : 0;
            const avgScore8 = i.avg_score8 !== null && i.avg_score8 !== 0 ? Number(i.avg_score8) : 0;
            const avgScore9 = i.avg_score9 !== null && i.avg_score9 !== 0 ? Number(i.avg_score9) : 0;
        
            const avg1Sum = avgScore1 + avgScore2 + avgScore3;
            const avg2Sum = avgScore4 + avgScore5 + avgScore6;
            const avg3Sum = avgScore7 + avgScore8 + avgScore9;
        
            let avg_avg1, avg_avg2, avg_avg3, total_avg;
        
            if (avg1Sum !== 0) {
                avg_avg1 = (avg1Sum / 3).toFixed(2);
            } else {
                avg_avg1 = 'N/A';
            }
        
            if (avg2Sum !== 0) {
                avg_avg2 = (avg2Sum / 3).toFixed(2);
            } else {
                avg_avg2 = 'N/A';
            }
        
            if (avg3Sum !== 0) {
                avg_avg3 = (avg3Sum / 3).toFixed(2);
            } else {
                avg_avg3 = 'N/A';
            }
        
            const totalSum = avg1Sum + avg2Sum + avg3Sum;
        
            if (totalSum !== 0) {
                total_avg = (totalSum / 9).toFixed(2);
            } else {
                total_avg = 'N/A';
            }
        
            return {
                idx: idx + 1,
                TEACHER: i.TEACHER,
                PROGRAM_NAME: i.PROGRAM_NAME,
                CNT: i.CNT,
                avg_score1: i.avg_score1,
                avg_score2: i.avg_score2,
                avg_score3: i.avg_score3,
                avg_avg1,
                avg_score4: i.avg_score4,
                avg_score5: i.avg_score5,
                avg_score6: i.avg_score6,
                avg_avg2,
                avg_score7: i.avg_score7,
                avg_score8: i.avg_score8,
                avg_score9: i.avg_score9,
                avg_avg3,
                total_avg,
            };
        });
        


        res.json({
            sheet1, 
            sheet2, 
            sheet3,
            sheet4,
        });
    })
    .catch((err) => {console.log(err); res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })});
});


module.exports = router;