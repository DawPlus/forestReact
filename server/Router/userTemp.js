const express = require('express');
const router = express.Router();
const maria = require("../maria");

// 입력
router.post('/create', async (req, res) => {
    try {
        const { data, agency } = req.body;
        
        // Delete existing data in the table
        await maria(`DELETE FROM user_temp where agency = ?`, [agency]);

        // Insert new data
        const sql = `
            INSERT INTO user_temp
                (seq, id, name, age, sex, job, jumin, residence, agency)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const promises = data.map(async data => {
            const { seq, id, name, age, sex, job, jumin, residence } = data;
            const values = [seq, id, name, age, sex, job, jumin, residence, agency];
            await maria(sql, values);
        });

        await Promise.all(promises);

        res.json({ result: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요" });
    }
});


// 임시저장 조회
router.post('/agencyList', (req, res)=>{
    const sql = `SELECT agency FROM user_temp group by agency`;
    maria(sql).then((rows) =>  res.json(rows) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

});
// 임시저장 조회
router.post('/list', (req, res)=>{
    const {agency} = req.body;
    console.log(agency)
    const sql = `SELECT * FROM user_temp where agency = ? `;
    maria(sql,[agency]).then((rows) =>  res.json(rows) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

});
// 임시저장 삭제
router.post('/delete', (req, res)=>{
    const sql = `DELETE FROM user_temp`;
    maria(sql).then((rows) =>   res.json({ result: true }))
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
});







module.exports = router;