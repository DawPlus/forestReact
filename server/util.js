// historyUtils.js
const moment = require("moment")

const maria = require('./maria'); // maria 모듈을 import 또는 require하여 가져옵니다.

    function createHistory(regId,  des) {
        const historyQuery = `INSERT INTO HISTORY (SEQ, REG_ID, DATE, DESCRIPTION) VALUES ((SELECT IFNULL(MAX(A.SEQ),0)+1 FROM HISTORY A), ?, ?, ?)`;

    
    
        const formattedDateTime = moment().format('YYYY.MM.DD HH:mm');
    
        return maria(historyQuery, [regId, formattedDateTime, des]);
    }

module.exports = {
    createHistory
};
