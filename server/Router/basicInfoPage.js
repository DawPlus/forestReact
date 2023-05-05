const express = require('express');
const router = express.Router();
const maria = require("../maria");


// 사용자 등록
router.post('/getBasicInfoPage', (req, res)=>{
    const sql = `SELECT * FROM BASIC_INFO_PAGE WHERE SEQ = (SELECT MAX(SEQ) FROM BASIC_INFO_page);`;
    maria(sql).then((rows) => {
        res.json({rows})
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

});



module.exports = router;