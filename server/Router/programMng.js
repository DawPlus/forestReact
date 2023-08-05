const express = require('express');
const router = express.Router();
const maria = require("../maria");
const dbTable = require("../db/fields");
const { createHistory } = require('../util');




// 입력
router.post('/create', (req, res)=>{

    const {user_name} = req.session?.userInfo;
    const {data} = req.body; 

    const { program_seq, name, bunya, teacher } = data;
    const values = [ program_seq, name, bunya, teacher, user_name, user_name ]

    let sql = `
        INSERT INTO program_mng
            (program_seq, name, bunya, teacher, create_dtm, create_user, update_dtm, update_user)
        VALUES
            (?, ?, ?, ?, NOW(), ?, NOW(), ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            bunya = VALUES(bunya),
            teacher = VALUES(teacher),
            update_user = VALUES(update_user),
            update_dtm = NOW();
    `;  
    maria(sql, values)
    .then(() => {
        return createHistory(user_name, "프로그램 등록");        
    })
    .then(() => {
        res.json({ result: true });
    })


});


// 조회
router.post('/list', (req, res)=>{ 
    const sql = `SELECT * FROM program_mng`;
    maria(sql).then((rows) =>  res.json(rows) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});

// 조회
router.post('/delete', (req, res)=>{ 
    const {seq} = req.body;
    const sql = `delete FROM program_mng where program_seq = ? `;
    maria(sql,[seq]).then(() =>  res.json({result : true}) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});






module.exports = router;