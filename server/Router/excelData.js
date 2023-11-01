const express = require('express');
const router = express.Router();
const maria = require("../maria");




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

    const {openday, endday} = req.body;





    // 프로그램목록
    const sheet1Sql = `SELECT * FROM basic_info  WHERE 1=1 ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}`;
    // 운영현황
    const sheet2Sql = `
        SELECT
            ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) DESC, 
                                    MONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) DESC, 
                                    DAYOFMONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
            YEAR(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) AS 년도,
            MONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) AS 월,
            DAYOFMONTH(STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d')) AS 일,
            bi.OPENDAY,
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
            CASE
                WHEN bi.ISCLOSEMINE = 1 THEN '1'
                ELSE ''
            END AS ISCLOSEMINE,
            bi.OM,
            ROUND(COALESCE(SUM(e.EXPENSE_PRICE), 0), 2) AS TOTAL_EXPENSE
        FROM
            dbstatistics.basic_info AS bi
        LEFT JOIN
            dbstatistics.expense AS e ON bi.BASIC_INFO_SEQ = e.BASIC_INFO_SEQ
        WHERE 1=1
            ${openday ? `AND STR_TO_DATE(bi.OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
        GROUP BY
            년도, 월, 일, bi.BASIC_INFO_SEQ
        ORDER BY
            순번;

    `

    // const sheet3Sql = `

    //     SELECT
    //         ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC, 
    //                             MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
    //                             DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
    //         YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
    //         MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
    //         DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 일,
    //         OPENDAY, 
    //         agency,
    //         BUNYA,
    //         PROGRAM_NAME,
    //         TEACHER,
    //         (
    //             SELECT COUNT(*)
    //             FROM dbstatistics.program_satisfaction AS sub
    //             WHERE 1=1
    //                 ${openday ? `AND STR_TO_DATE(sub.OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
    //             AND sub.agency = main.agency
    //             AND sub.OPENDAY = main.OPENDAY
    //             AND sub.BUNYA = main.BUNYA
    //             AND sub.PROGRAM_NAME = main.PROGRAM_NAME
    //             AND sub.TEACHER = main.TEACHER
    //         ) AS row_count,
    //         ROUND(AVG(CASE WHEN SCORE1 > 0 THEN SCORE1 ELSE NULL END), 2) AS avg_score1,
    //         ROUND(AVG(CASE WHEN SCORE2 > 0 THEN SCORE2 ELSE NULL END), 2) AS avg_score2,
    //         ROUND(AVG(CASE WHEN SCORE3 > 0 THEN SCORE3 ELSE NULL END), 2) AS avg_score3,
    //         ROUND(AVG(CASE WHEN SCORE4 > 0 THEN SCORE4 ELSE NULL END), 2) AS avg_score4,
    //         ROUND(AVG(CASE WHEN SCORE5 > 0 THEN SCORE5 ELSE NULL END), 2) AS avg_score5,
    //         ROUND(AVG(CASE WHEN SCORE6 > 0 THEN SCORE6 ELSE NULL END), 2) AS avg_score6,
    //         ROUND(AVG(CASE WHEN SCORE7 > 0 THEN SCORE7 ELSE NULL END), 2) AS avg_score7,
    //         ROUND(AVG(CASE WHEN SCORE8 > 0 THEN SCORE8 ELSE NULL END), 2) AS avg_score8,
    //         ROUND(AVG(CASE WHEN SCORE9 > 0 THEN SCORE9 ELSE NULL END), 2) AS avg_score9
    //         FROM
    //         dbstatistics.program_satisfaction
    //         WHERE 1=1
    //             ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
    //         GROUP BY
    //         agency,
    //         openday,
    //         BUNYA,
    //         PROGRAM_NAME,
    //         TEACHER;


    // `;

    // const sheet3Sql = `

    // SELECT
    //     ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) DESC, 
    //                                 MONTH(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) DESC,
    //                                 DAY(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
    //     YEAR(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) AS 년도,
    //     MONTH(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) AS 월,
    //     DAY(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) AS 일,
    //     main.OPENDAY, 
    //     main.agency,
    //     main.BUNYA,
    //     main.PROGRAM_NAME,
    //     main.TEACHER,
    //     (
    //         SELECT COUNT(*)
    //         FROM dbstatistics.program_satisfaction AS sub
    //         WHERE 1=1
    //         ${openday ? `AND STR_TO_DATE(sub.OPENDAY, '%Y-%m-%d') BETWEEN ? AND ? ` : ''}
    //         AND sub.agency = main.agency
    //         AND sub.OPENDAY = main.OPENDAY
    //         AND sub.BUNYA = main.BUNYA
    //         AND sub.PROGRAM_NAME = main.PROGRAM_NAME
    //         AND sub.TEACHER = main.TEACHER
    //     ) AS row_count,   
    //     main.SCORE1,
    //     main.SCORE2,
    //     main.SCORE3,
    //     main.SCORE4,
    //     main.SCORE5,
    //     main.SCORE6,
    //     main.SCORE7,
    //     main.SCORE8,
    //     main.SCORE9
    // FROM
    //     dbstatistics.program_satisfaction AS main
    // WHERE 1=1
    //     ${openday ? `AND STR_TO_DATE(main.OPENDAY, '%Y-%m-%d') BETWEEN ? AND ? ` : ''}
    // GROUP BY
    //     main.agency,
    //     main.OPENDAY,
    //     main.BUNYA,
    //     main.PROGRAM_NAME,
    //     main.TEACHER;
    // `;
    // 평균나오는거 수정 - 
    const sheet3Sql = `
    SELECT
        ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) DESC, 
                                    MONTH(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) DESC,
                                    DAY(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
        YEAR(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) AS 년도,
        MONTH(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) AS 월,
        DAY(STR_TO_DATE(main.OPENDAY, '%Y-%m-%d')) AS 일,
        main.OPENDAY, 
        main.agency,
        main.BUNYA,
        main.PROGRAM_NAME,
        main.TEACHER,
        (
            SELECT COUNT(*)
            FROM dbstatistics.program_satisfaction AS sub
            WHERE 1=1
            ${openday ? `AND STR_TO_DATE(sub.OPENDAY, '%Y-%m-%d') BETWEEN ? AND ? ` : ''}
            AND sub.agency = main.agency
            AND sub.OPENDAY = main.OPENDAY
            AND sub.BUNYA = main.BUNYA
            AND sub.PROGRAM_NAME = main.PROGRAM_NAME
            AND sub.TEACHER = main.TEACHER
        ) AS row_count,   
        ROUND(AVG(CASE WHEN main.SCORE1 > 0 THEN main.SCORE1 ELSE NULL END), 2) AS avg_score1,
        ROUND(AVG(CASE WHEN main.SCORE2 > 0 THEN main.SCORE2 ELSE NULL END), 2) AS avg_score2,
        ROUND(AVG(CASE WHEN main.SCORE3 > 0 THEN main.SCORE3 ELSE NULL END), 2) AS avg_score3,
        ROUND(AVG(CASE WHEN main.SCORE4 > 0 THEN main.SCORE4 ELSE NULL END), 2) AS avg_score4,
        ROUND(AVG(CASE WHEN main.SCORE5 > 0 THEN main.SCORE5 ELSE NULL END), 2) AS avg_score5,
        ROUND(AVG(CASE WHEN main.SCORE6 > 0 THEN main.SCORE6 ELSE NULL END), 2) AS avg_score6,
        ROUND(AVG(CASE WHEN main.SCORE7 > 0 THEN main.SCORE7 ELSE NULL END), 2) AS avg_score7,
        ROUND(AVG(CASE WHEN main.SCORE8 > 0 THEN main.SCORE8 ELSE NULL END), 2) AS avg_score8,
        ROUND(AVG(CASE WHEN main.SCORE9 > 0 THEN main.SCORE9 ELSE NULL END), 2) AS avg_score9
    FROM
        dbstatistics.program_satisfaction AS main
    WHERE 1=1
        ${openday ? `AND STR_TO_DATE(main.OPENDAY, '%Y-%m-%d') BETWEEN ? AND ? ` : ''}
    GROUP BY
        main.agency,
        main.OPENDAY,
        main.BUNYA,
        main.PROGRAM_NAME,
        main.TEACHER;
        

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
        WHERE 1=1
            ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
        GROUP BY
            TEACHER,
            PROGRAM_NAME
    `
    //  시설 서비스 만족도
    // const sheet5Sql = `
    //     SELECT 
    //         '구분',
    //         ifnull(ROUND(AVG(nullif(score1,0)),2),0) as score1,    ifnull(ROUND(AVG(nullif(score2,0)),2),0) as score2,   ifnull(ROUND(AVG(nullif(score3,0)),2),0) as score3,   ifnull(ROUND(AVG(nullif(score4,0)),2),0) as score4,   ifnull(ROUND(AVG(nullif(score5,0)),2),0) as score5,
    //         ifnull(ROUND(AVG(nullif(score6,0)),2),0) as score6,    ifnull(ROUND(AVG(nullif(score7,0)),2),0) as score7,   ifnull(ROUND(AVG(nullif(score8,0)),2),0) as score8,   ifnull(ROUND(AVG(nullif(score9,0)),2),0) as score9,   ifnull(ROUND(AVG(nullif(score10,0)),2),0) as score10,
    //         ifnull(ROUND(AVG(nullif(score11,0)),2),0) as score11,  ifnull(ROUND(AVG(nullif(score12,0)),2),0) as score12, ifnull(ROUND(AVG(nullif(score13,0)),2),0) as score13, ifnull(ROUND(AVG(nullif(score14,0)),2),0) as score14, ifnull(ROUND(AVG(nullif(score15,0)),2),0) as score15, 
    //         ifnull(ROUND(AVG(nullif(score16,0)),2),0) as score16,
    //         ifnull(ROUND(
    //         (AVG(nullif(score1, 0)) +
    //             AVG(nullif(score2, 0)) +
    //             AVG(nullif(score3, 0)) +
    //             AVG(nullif(score4, 0)) +
    //             AVG(nullif(score5, 0)) +
    //             AVG(nullif(score6, 0)) +
    //             AVG(nullif(score7, 0)) +
    //             AVG(nullif(score8, 0)) +
    //             AVG(nullif(score9, 0)) +
    //             AVG(nullif(score10, 0)) +
    //             AVG(nullif(score11, 0)) +
    //             AVG(nullif(score12, 0)) +
    //             AVG(nullif(score13, 0)) +
    //             AVG(nullif(score14, 0)) +
    //             AVG(nullif(score15, 0)) +
    //             AVG(nullif(score16, 0))
    //         ) / 16, 2),0) as total_average
    //     FROM service_env_satisfaction
    //     WHERE 1=1
    //         ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
    // `

    const sheet5Sql = `
            SELECT 
                ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC, 
                                            MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
                YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
                MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
                DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 일,
                AGENCY,
                ifnull(ROUND(AVG(nullif(score1,0)),2),0) as score1,
                ifnull(ROUND(AVG(nullif(score2,0)),2),0) as score2,
                ifnull(ROUND(AVG(nullif(score3,0)),2),0) as score3,
                ifnull(ROUND(AVG(nullif(score4,0)),2),0) as score4,
                ifnull(ROUND(AVG(nullif(score5,0)),2),0) as score5,
                ifnull(ROUND(AVG(nullif(score6,0)),2),0) as score6,
                ifnull(ROUND(AVG(nullif(score7,0)),2),0) as score7,
                ifnull(ROUND(AVG(nullif(score8,0)),2),0) as score8,
                ifnull(ROUND(AVG(nullif(score9,0)),2),0) as score9,
                ifnull(ROUND(AVG(nullif(score10,0)),2),0) as score10,
                ifnull(ROUND(AVG(nullif(score11,0)),2),0) as score11,
                ifnull(ROUND(AVG(nullif(score12,0)),2),0) as score12,
                ifnull(ROUND(AVG(nullif(score13,0)),2),0) as score13,
                ifnull(ROUND(AVG(nullif(score14,0)),2),0) as score14,
                ifnull(ROUND(AVG(nullif(score15,0)),2),0) as score15,
                ifnull(ROUND(AVG(nullif(score16,0)),2),0) as score16,
                ifnull(ROUND(
                (AVG(nullif(score1, 0)) +
                    AVG(nullif(score2, 0)) +
                    AVG(nullif(score3, 0)) +
                    AVG(nullif(score4, 0)) +
                    AVG(nullif(score5, 0)) +
                    AVG(nullif(score6, 0)) +
                    AVG(nullif(score7, 0)) +
                    AVG(nullif(score8, 0)) +
                    AVG(nullif(score9, 0)) +
                    AVG(nullif(score10, 0)) +
                    AVG(nullif(score11, 0)) +
                    AVG(nullif(score12, 0)) +
                    AVG(nullif(score13, 0)) +
                    AVG(nullif(score14, 0)) +
                    AVG(nullif(score15, 0)) +
                    AVG(nullif(score16, 0))
                ) / 16, 2),0) as total_average
            FROM dbstatistics.service_env_satisfaction
            WHERE 1=1
            ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
            GROUP BY AGENCY, OPENDAY ;

    `



    //  효과성분석 - 힐링서비스
    const sheet6Sql = `
        SELECT 
            ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
                YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
                MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
                DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 일,
                AGENCY,
                PV,
                IFNULL(SUM(SCORE1 + SCORE2 + SCORE3 + SCORE4 + SCORE5 + SCORE6 + SCORE7 + SCORE8 + SCORE9 + SCORE10 +
                    SCORE11 + SCORE12 + SCORE13 + SCORE14 + SCORE15 + SCORE16 + SCORE17 + SCORE18 + SCORE19 + SCORE20 +
                    SCORE21 + SCORE22), 0) AS TotalSum,
                IFNULL(ROUND(AVG((SCORE1 + SCORE2 + SCORE3 + SCORE4 + SCORE5 + SCORE6 + SCORE7 + SCORE8 + SCORE9 + SCORE10 +
                    SCORE11 + SCORE12 + SCORE13 + SCORE14 + SCORE15 + SCORE16 + SCORE17 + SCORE18 + SCORE19 + SCORE20 +
                    SCORE21 + SCORE22) / 22), 2), 0) AS AverageScore
            FROM 
                dbstatistics.healing_service
            WHERE PV IN ('사전', '사후')
            ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
            GROUP BY AGENCY, PV;
    `;


    //  효과성분석 - 예방효과
    const sheet7Sql = `
        SELECT 
            ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
                YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
                MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
                DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 일,
                AGENCY,
                PV,
            IFNULL(SUM(SCORE1+ SCORE2+ SCORE3+ SCORE4+ SCORE5+ SCORE6+ SCORE7+ SCORE8+ SCORE9+ SCORE10+
                    SCORE11+ SCORE12+ SCORE13+ SCORE14+ SCORE15+ SCORE16+ SCORE17+ SCORE18),0) as sum,
            IFNULL(ROUND(AVG(SCORE1+ SCORE2+ SCORE3+ SCORE4+ SCORE5+ SCORE6+ SCORE7+ SCORE8+ SCORE9+ SCORE10+
                    SCORE11+ SCORE12+ SCORE13+ SCORE14+ SCORE15+ SCORE16+ SCORE17+ SCORE18+ SCORE18)/18,2),0) as avg
            FROM 
                dbstatistics.prevent_service
            WHERE PV IN ('사전', '사후')
            ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
            GROUP BY AGENCY, PV;
    `;


    //  효과성분석 - 상담치유
    const sheet8Sql = `
        SELECT 
            ROW_NUMBER() OVER (ORDER BY YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC,
                                            DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) DESC) AS 순번,
                YEAR(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 년도,
                MONTH(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 월,
                DAY(STR_TO_DATE(OPENDAY, '%Y-%m-%d')) AS 일,
                AGENCY,
                PV,
            IFNULL(SUM(SCORE1+ SCORE2+ SCORE3+ SCORE4+ SCORE5+ SCORE6+ SCORE7+ SCORE8+ SCORE9+ SCORE10+
                    SCORE11+ SCORE12+ SCORE13+ SCORE14+ SCORE15+ SCORE16+ SCORE17+ SCORE18+ SCORE18+
                    SCORE19+ SCORE20+ SCORE21+ SCORE22+ SCORE23+ SCORE24+ SCORE25+ SCORE26+ SCORE27+
                    SCORE28+ SCORE29+ SCORE30+ SCORE31+ SCORE32+ SCORE33+ SCORE34+ SCORE35+ SCORE36+ SCORE37+
                    SCORE38+ SCORE39+ SCORE40+ SCORE41+ SCORE42+ SCORE43+ SCORE44+ SCORE45+ SCORE46+ SCORE47+
                    SCORE48+ SCORE49+ SCORE50+ SCORE51+ SCORE52+ SCORE53+ SCORE54+ SCORE55+ SCORE56+ SCORE57+
                    SCORE58+ SCORE59+ SCORE60+ SCORE61+ SCORE62),0) as sum,
            IFNULL(ROUND(AVG(SCORE1+ SCORE2+ SCORE3+ SCORE4+ SCORE5+ SCORE6+ SCORE7+ SCORE8+ SCORE9+ SCORE10+
                    SCORE11+ SCORE12+ SCORE13+ SCORE14+ SCORE15+ SCORE16+ SCORE17+ SCORE18+ SCORE18+
                    SCORE19+ SCORE20+ SCORE21+ SCORE22+ SCORE23+ SCORE24+ SCORE25+ SCORE26+ SCORE27+
                    SCORE28+ SCORE29+ SCORE30+ SCORE31+ SCORE32+ SCORE33+ SCORE34+ SCORE35+ SCORE36+ SCORE37+
                    SCORE38+ SCORE39+ SCORE40+ SCORE41+ SCORE42+ SCORE43+ SCORE44+ SCORE45+ SCORE46+ SCORE47+
                    SCORE48+ SCORE49+ SCORE50+ SCORE51+ SCORE52+ SCORE53+ SCORE54+ SCORE55+ SCORE56+ SCORE57+
                    SCORE58+ SCORE59+ SCORE60+ SCORE61+ SCORE62)/62,2),0) as avg
            FROM 
                dbstatistics.counsel_service
            WHERE PV IN ('사전', '사후')
            ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
            GROUP BY AGENCY, PV;
    `;
    //  효과성분석 - 상담치유
    const sheet9Sql = `
        SELECT 
            ROW_NUMBER() OVER (ORDER BY AGENCY, PV) AS 순번,
            YEAR(STR_TO_DATE(DATE, '%Y-%m-%d')) AS 년도,
            MONTH(STR_TO_DATE(DATE, '%Y-%m-%d')) AS 월,
            DAY(STR_TO_DATE(DATE, '%Y-%m-%d')) AS 일,
            AGENCY,
            PV,
            IFNULL(ROUND(AVG(nullif(num1,0)),2),0) as num1, 
            IFNULL(ROUND(AVG(nullif(num2,0)),2),0) as num2,
            IFNULL(ROUND(AVG(nullif(num3,0)),2),0) as num3, 
            IFNULL(ROUND(AVG(nullif(num4,0)),2),0) as num4, 
            IFNULL(ROUND(AVG(nullif(num5,0)),2),0) as num5
        FROM 
            dbstatistics.hrv_service
        WHERE PV IN ('사전', '사후')
        ${openday ? `AND STR_TO_DATE(DATE, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
        GROUP BY AGENCY, PV
        ORDER BY AGENCY, PV;

    `;

 
    // let sheet6Sql_3 = `
    //     select PV,  IFNULL(SUM(SCORE1+ SCORE2+ SCORE3+ SCORE4+ SCORE5+ SCORE6+ SCORE7+ SCORE8+ SCORE9+ SCORE10+
    //         SCORE11+ SCORE12+ SCORE13+ SCORE14+ SCORE15+ SCORE16+ SCORE17+ SCORE18),0) as sum,
    //         IFNULL(ROUND(AVG(SCORE1+ SCORE2+ SCORE3+ SCORE4+ SCORE5+ SCORE6+ SCORE7+ SCORE8+ SCORE9+ SCORE10+
    //         SCORE11+ SCORE12+ SCORE13+ SCORE14+ SCORE15+ SCORE16+ SCORE17+ SCORE18)/18,2),0) as avg 
    //     FROM prevent_service
    //     WHERE PV IN ("사전", "사후")
    //     ${openday ? `AND STR_TO_DATE(OPENDAY, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
    //     GROUP BY PV
    // `;
    // let sheet6Sql_4 = `
            // SELECT 
            //     '사전' as PV, 
            //     IFNULL(ROUND(AVG(nullif(num1,0)),2),0) as num1, 
            //     IFNULL(ROUND(AVG(nullif(num2,0)),2),0) as num2,
            //     IFNULL(ROUND(AVG(nullif(num3,0)),2),0) as num3, 
            //     IFNULL(ROUND(AVG(nullif(num4,0)),2),0) as num4, 
            //     IFNULL(ROUND(AVG(nullif(num5,0)),2),0) as num5
            // FROM hrv_service
            // WHERE 1=1
            // AND PV = '사전'
            // ${openday ? `AND STR_TO_DATE(DATE, '%Y-%m-%d') BETWEEN ? AND ?` : ''}

            // UNION ALL

            // SELECT 
            //     '사후' as PV, 
            //     IFNULL(ROUND(AVG(nullif(num1,0)),2),0) as num1, 
            //     IFNULL(ROUND(AVG(nullif(num2,0)),2),0) as num2,
            //     IFNULL(ROUND(AVG(nullif(num3,0)),2),0) as num3, 
            //     IFNULL(ROUND(AVG(nullif(num4,0)),2),0) as num4, 
            //     IFNULL(ROUND(AVG(nullif(num5,0)),2),0) as num5
            // FROM hrv_service
            // WHERE 1=1
            // AND PV = '사후'
            // ${openday ? `AND STR_TO_DATE(DATE, '%Y-%m-%d') BETWEEN ? AND ?` : ''}
    // `;




    const params = openday ? [openday, endday] : []; // 조건에 따라 파라미터 설정
    const params2 = openday ? [openday, endday, openday, endday] : []; // 조건에 따라 파라미터 설정

    Promise.all([
        maria(sheet1Sql, params),
        maria(sheet2Sql, params),
        maria(sheet3Sql,params2),
        maria(sheet4Sql,params),
        maria(sheet5Sql,params),


        maria(sheet6Sql,params),
        maria(sheet7Sql,params),
        maria(sheet8Sql,params),
        maria(sheet9Sql,params),
       
    
    ])
    .then((results) => {
        let sheet1 = results[0]; // the result from the first query
        let sheet2 = results[1]; // the result from the second query
        let sheet3 = results[2]; // the result from the second query
        let sheet4 = results[3]; // the result from the second query
        let sheet5 = results[4]; // the result from the second query
        
        
        let sheet6 = results[5]; 
        let sheet7 = results[6]; 
        let sheet8 = results[7]; 
        let sheet9 = results[8]; 
     
        





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
            sheet5, 
            sheet6, 
            sheet7, 
            sheet8, 
            sheet9
        });
    })
    .catch((err) => {console.log(err); res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })});
});


module.exports = router;