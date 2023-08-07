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
        'select distinct agency FROM program_satisfaction', // 프로그램 만족도 
        'select distinct agency FROM service_env_satisfaction',// 시설서비스환경 만족도
        'select distinct agency FROM counsel_service',// 상담&치유서비스
        'select distinct agency FROM prevent_service',// 예방서비스
        'select distinct agency FROM healing_service'// 힐링서비스
    ];

    const selectedSql = sql[type - 1];
    
    maria(selectedSql).then((rows) => {
        res.json(rows)
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});



// 만족도 / 효과평가 조회 
router.post('/getProgramResult', (req, res)=>{
    const {type, agency} = req.body;
    
    // 1 : 프로그램 만족도 Program
    // 2 : 시설서비스환경 만족도
    // 3 : 상담&치유서비스 효과평가
    // 4 : 예방서비스 효과평가
    // 5 : 힐링서비스 효과평가
    const sql = [
        'select * FROM program_satisfaction WHERE AGENCY = ? ', // 프로그램 만족도 
        'select * FROM service_env_satisfaction WHERE AGENCY = ? ',// 시설서비스환경 만족도
        'select * FROM counsel_service WHERE AGENCY = ?',// 상담&치유서비스
        'select * FROM prevent_service WHERE AGENCY = ? ',// 예방서비스
        'select * FROM healing_service WHERE AGENCY = ?'// 힐링서비스
    ];

    const selectedSql = sql[type - 1];
    
    maria(selectedSql, [agency]).then((rows) => {
        res.json(rows)
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});



// 만족도 / 효과평가 조회 
router.post('/getSearchResult', (req, res)=>{
    const {effect, keyword} = req.body;
    
    const whereText = keyword.filter(obj => obj.text !== '' && obj.type !== "X")
                                .map(obj => `AND ${obj.type} LIKE '${obj.text}'`)
                                .join(' ');     
    
    

    // 1 : 프로그램 만족도 Program
    // 2 : 시설서비스환경 만족도
    // 3 : 상담&치유서비스 효과평가
    // 4 : 예방서비스 효과평가
    // 5 : 힐링서비스 효과평가
    const sql = {
        program : 'select * FROM program_satisfaction WHERE 1=1 '+whereText, // 프로그램 만족도 
        facility : 'SELECT * FROM service_env_satisfaction WHERE 1=1 '+ whereText,// 시설서비스환경만족도
        
        prevent : 'SELECT * FROM prevent_service WHERE 1=1 '+ whereText, // 예방서비스
        healing : 'SELECT * FROM healing_service WHERE 1=1 '+ whereText // 힐링서비스
    };

    
    maria(sql[effect]).then((rows) => {
        res.json(rows)
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});




module.exports = router;