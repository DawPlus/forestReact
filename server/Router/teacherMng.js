const express = require('express');
const router = express.Router();
const maria = require("../maria");
const { createHistory } = require('../util');




// 입력
router.post('/create', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data} = req.body; 
    const { teacher_seq, name, phone} = data;
    const values = [ teacher_seq, name, phone, user_name, user_name ]
    let sql = `
        INSERT INTO teacher_mng
            (teacher_seq, name, phone, create_dtm, create_user, update_dtm, update_user)
        VALUES
            (?, ?, ?, NOW(), ?, NOW(), ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            phone = VALUES(phone),
            update_user = VALUES(update_user),
            update_dtm = NOW();
    `;  
    maria(sql, values)
    .then(() => {
        return createHistory(user_name, "강사등록 등록");        
    })
    .then(() => {
        res.json({ result: true });
    })
});


// 조회
router.post('/list', (req, res)=>{ 
    const sql = `SELECT * FROM teacher_mng`;
    maria(sql).then((rows) =>  res.json(rows) )
    .catch((err) => {console.log(err); res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })});
});

// 조회
router.post('/delete', (req, res)=>{ 
    const {seq} = req.body;
    const sql = `delete FROM teacher_mng where teacher_seq = ? `;
    maria(sql,[seq]).then(() =>  res.json({result : true}) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});






module.exports = router;