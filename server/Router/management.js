const express = require('express');
const router = express.Router();
const maria = require("../maria");


const { encrypt, decrypt } = require('../util');


    // 코드 조회 
    router.post('/getBasicInfoPage', (req, res)=>{
        const sql = `SELECT * FROM basic_info_page WHERE SEQ = (SELECT MAX(SEQ) FROM basic_info_page) LIMIT 1`;
        maria(sql).then((rows) => {
            res.json(rows[0])
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

    });
    // 코드 등록
    router.post('/insertBasicInfoPage', (req, res)=>{
        const {SUPPORT, INCOME_TYPE, PART_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE, AGE_TYPE} = req.body;
        const sql = "INSERT INTO basic_info_page ( SUPPORT, INCOME_TYPE, PART_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE, AGE_TYPE )"+
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

            res.json(rows.map(i=> ({...i, user_pwd  : decrypt(i.user_pwd)})))
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });
    
       // 비밀번호 초기화 
    router.post('/resetPassword', (req, res)=>{
        const {user_id} = req.body;
        
        const enc = encrypt("1111");

        const values = [  enc, user_id]

        const sqls = `
            UPDATE user_info
            SET user_pwd = ?
            WHERE user_id = ?;
        ` 
        maria(sqls, values).then(() => {
            res.json({result : true})
        }).catch((err) => {console.log(err); res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })});
    });
    // 사용자 정보 수정  
    router.post('/updateRegUser', (req, res)=>{
        const {data} = req.body;
        const { user_id, user_name, value , user_pwd} = data;
        const password  = encrypt(user_pwd);
        const values = [ user_id, user_name,  value , password]

        const sqls = `
                INSERT INTO user_info
                    (user_id, user_name, value, user_pwd)
                VALUES
                    (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    user_name = VALUES(user_name),
                    value = VALUES(value),
                    user_pwd = VALUES(user_pwd);
        ` 
        maria(sqls, values).then(() => {
            res.json({result : true})
        }).catch((err) => {console.log(err); res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })});
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
        const sql = `SELECT * FROM history ORDER BY SEQ DESC`;
        maria(sql).then((rows) => {
            res.json(rows)
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });

    // 사용자 히스토리 가져오기
    router.post('/getHistory', (req, res)=>{
        const regId = req.body.regId;
        const sql = `SELECT * FROM history WHERE REG_ID=? ORDER BY SEQ DESC`;
        maria(sql,[regId]).then((rows) => {
            res.json(rows)
        })
        .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
    });



module.exports = router;