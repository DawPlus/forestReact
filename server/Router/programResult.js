const express = require('express');
const router = express.Router();
const maria = require("../maria");


// 사용자 등록
router.post('/getProgramAgency', (req, res)=>{
    const {type} = req.body;
    
    // 1 : 프로그램 만족도 Program
    // 2 : 시설서비스환경 만족도
    // 3 : 상담&치유서비스 효과평가
    // 4 : 예방서비스 효과평가
    // 5 : 힐링서비스 효과평가
    const sql = [
        'select distinct agency FROM PROGRAM_SATISFACTION', // 프로그램 만족도 
        'select distinct agency FROM SERVICE_ENV_SATISFACTION',// 시설서비스환경 만족도
        'select distinct agency FROM COUNSEL_SERVICE',// 상담&치유서비스
        'select distinct agency FROM PREVENT_SERVICE',// 예방서비스
        'select distinct agency FROM HEALING_SERVICE'// 힐링서비스
    ];

    const selectedSql = sql[type - 1];
    console.log(selectedSql)
    maria(selectedSql).then((rows) => {
        res.json(rows)
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});



// 만족도 / 효과평가 조회 
router.post('/getProgramResult', (req, res)=>{
    const {type, agency} = req.body;
        console.log(type, agency)
    // 1 : 프로그램 만족도 Program
    // 2 : 시설서비스환경 만족도
    // 3 : 상담&치유서비스 효과평가
    // 4 : 예방서비스 효과평가
    // 5 : 힐링서비스 효과평가
    const sql = [
        'select * FROM PROGRAM_SATISFACTION WHERE AGENCY = ? ', // 프로그램 만족도 
        'select * FROM SERVICE_ENV_SATISFACTION WHERE AGENCY = ? ',// 시설서비스환경 만족도
        'select * FROM COUNSEL_SERVICE WHERE AGENCY = ?',// 상담&치유서비스
        'select * FROM PREVENT_SERVICE WHERE AGENCY = ? ',// 예방서비스
        'select * FROM HEALING_SERVICE WHERE AGENCY = ?'// 힐링서비스
    ];

    const selectedSql = sql[type - 1];
    
    maria(selectedSql, [agency]).then((rows) => {
        res.json(rows)
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});



module.exports = router;