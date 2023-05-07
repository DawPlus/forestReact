const express = require('express');
const router = express.Router();
const maria = require("../maria");


    // 코드 조회 
    router.post('/getBasicInfoPage', (req, res)=>{
        const sql = `SELECT * FROM BASIC_INFO_PAGE WHERE SEQ = (SELECT MAX(SEQ) FROM BASIC_INFO_page) LIMIT 1`;
        maria(sql).then((rows) => {
            res.json(rows[0])
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

    });
    // 코드 등록
    router.post('/insertBasicInfoPage', (req, res)=>{
        const {SUPPORT, INCOME_TYPE, PART_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE, AGE_TYPE} = req.body;
        const sql = "INSERT INTO BASIC_INFO_PAGE ( SUPPORT, INCOME_TYPE, PART_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE, AGE_TYPE )"+
                    "VALUES (?, ?, ?, ?, ?, ?, ?)"
        maria(sql, [SUPPORT, INCOME_TYPE, PART_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE, AGE_TYPE])
            .then(() => {
                res.json({result : true})
            }).catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });



    // 등록된 사용자 조회 
    router.post('/getRegUser', (req, res)=>{
        const sql = `SELECT user_id, value, user_pwd, user_name FROM user_info`;
        maria(sql).then((rows) => {
            res.json(rows)
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });
    
    // 사용자 정보 수정  
    router.post('/updateRegUser', (req, res)=>{
        const {value, userId} = req.body;
        const sql = `UPDATE user_info SET value = ? WHERE user_id = ?`;
        maria(sql, [value, userId]) .then(() => {
            res.json({result : true})
        }).catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });
 
    // 사용자 정보 삭제  
    router.post('/deleteRegUser', (req, res)=>{
        const {userId} = req.body;
        const sql = `DELETE FROM user_info WHERE user_id = ?`;
        maria(sql, [userId]) .then(() => {
            res.json({result : true})
        }).catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });

    // 모든 히스토리 가져오기
    router.post('/getAllHistories', (req, res)=>{
        const sql = `SELECT * FROM HISTORY ORDER BY SEQ DESC`;
        maria(sql).then((rows) => {
            res.json(rows)
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });

    // 사용자 히스토리 가져오기
    router.post('/getHistory', (req, res)=>{
        const regId = req.body.regId;
        const sql = `SELECT * FROM HISTORY WHERE REG_ID=? ORDER BY SEQ DESC`;
        maria(sql,[regId]).then((rows) => {
            res.json(rows)
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });



module.exports = router;