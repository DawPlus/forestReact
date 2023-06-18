const express = require('express');
const router = express.Router();
const maria = require("../maria");


// 사용자 등록
router.post('/getProgramList', (req, res)=>{
    const sql = `SELECT * FROM BASIC_INFO WHERE PROGRESS_STATE ="E"`;

    maria(sql).then((rows) => {
        res.json(rows)
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

});



module.exports = router;