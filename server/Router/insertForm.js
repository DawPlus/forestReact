const express = require('express');
const router = express.Router();
const maria = require("../maria");


// 서비스환경 만족도
router.post('/serviceInsert', (req, res)=>{
    const {data} = req.body; 

    const fields = ['OPENDAY', 'SEX', 'AGE', 'RESIDENCE', 'JOB', 'PTCPROGRAM', 'AGENCY', 'EVAL_DATE', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'SCORE10', 'FACILITY_OPINION', 'SCORE11', 'SCORE12', 'SCORE13', 'SCORE14', 'SCORE15', 'SCORE16', 'OPERATION_OPINION', 'SCORE17', 'SCORE18'];
    const rows = data.map(item => {
        let values = fields.map(field => {
            if (typeof item[field] === 'number') {
                return item[field] || null;
            } else {
                return `'${item[field] || ''}'`;
            }
        });
        return `(${values.join(", ")})`;
    }).join(", ");
    const query = `INSERT INTO SERVICE_ENV_SATISFACTION (OPENDAY, SEX, AGE, RESIDENCE, JOB, PTCPROGRAM, AGENCY, EVAL_DATE, SCORE1, SCORE2, SCORE3, SCORE4, SCORE5, SCORE6, SCORE7, SCORE8, SCORE9, SCORE10, FACILITY_OPINION, SCORE11, SCORE12, SCORE13, SCORE14, SCORE15, SCORE16, OPERATION_OPINION, SCORE17, SCORE18) VALUES ${rows}`;

    maria(query)
    .then(() => {
        res.json({ result: true });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "등록중 오류가 발생했습니다. 관리자에게 문의하세요 " });
    });

});



module.exports = router;