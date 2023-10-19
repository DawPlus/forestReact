const express = require('express');
const router = express.Router();
const maria = require("../maria");
const dbTable = require("../db/fields");
const { createHistory } = require('../util');

// 입력
router.post('/create', (req, res)=>{

    const {user_name} = req.session?.userInfo;
    const {data} = req.body; 

    const {
        BASIC_INFO_SEQ,
        AGENCY,
        AGE_TYPE,
        BIZ_PURPOSE,
        DAYS_TO_STAY,
        ENDDAY,
        INCOME_TYPE,
        LEAD_MAN_CNT,
        LEAD_WOMAN_CNT,
        MEAL_ETC,
        MEAL_LEAD,
        MEAL_PART,
        MEAL_TYPE,
        OM,
        OPENDAY,
        OVERALL_OPINION,
        PART_MAN_CNT,
        PART_TYPE,
        PART_WOMAN_CNT,
        PROGRAM_IN_OUT,
        PROGRAM_OPINION,
        PROGRESS_STATE,
        
        RESIDENCE,
        ROOM_ETC_PEOPLE,
        ROOM_ETC_ROOM,
        ROOM_LEAD_PEOPLE,
        ROOM_LEAD_ROOM,
        ROOM_PART_PEOPLE,
        ROOM_PART_ROOM,
        SERVICE_OPINION,
        SERVICE_TYPE,
        SUPPORT,
        PART_FORM,
        ORG_NATURE, 
        ISCLOSEMINE,
        expenseList, 
        incomeList,
    } = data;
    

    const values = [
        BASIC_INFO_SEQ,
        OPENDAY,
        AGENCY,
        OM,
        ENDDAY,
        DAYS_TO_STAY,
        RESIDENCE,
        PART_MAN_CNT,
        PART_WOMAN_CNT,
        LEAD_MAN_CNT,
        LEAD_WOMAN_CNT,
        SUPPORT,
        INCOME_TYPE,
        PART_TYPE,
        AGE_TYPE,
        BIZ_PURPOSE,
        PROGRAM_IN_OUT,
        SERVICE_TYPE,
        ROOM_PART_PEOPLE,
        ROOM_PART_ROOM,
        ROOM_LEAD_PEOPLE,
        ROOM_LEAD_ROOM,
        ROOM_ETC_PEOPLE,
        ROOM_ETC_ROOM,
        MEAL_TYPE,
        MEAL_PART,
        MEAL_LEAD,
        MEAL_ETC,
        PROGRAM_OPINION,
        SERVICE_OPINION,
        OVERALL_OPINION,
        PROGRESS_STATE,
        user_name,
        PART_FORM,
        ORG_NATURE, 
        ISCLOSEMINE
    ]


    let sql = `
        INSERT INTO basic_info
            (BASIC_INFO_SEQ, OPENDAY, AGENCY, OM, ENDDAY, DAYS_TO_STAY, RESIDENCE,
            PART_MAN_CNT, PART_WOMAN_CNT, LEAD_MAN_CNT, LEAD_WOMAN_CNT, SUPPORT,
            INCOME_TYPE, PART_TYPE, AGE_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE,
            ROOM_PART_PEOPLE, ROOM_PART_ROOM, ROOM_LEAD_PEOPLE, ROOM_LEAD_ROOM,
            ROOM_ETC_PEOPLE, ROOM_ETC_ROOM, MEAL_TYPE, MEAL_PART, MEAL_LEAD, MEAL_ETC,
            PROGRAM_OPINION, SERVICE_OPINION, OVERALL_OPINION, PROGRESS_STATE, REG_ID, PART_FORM, ORG_NATURE, ISCLOSEMINE)
        VALUES 
            (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            OPENDAY = VALUES(OPENDAY),
            AGENCY = VALUES(AGENCY),
            OM = VALUES(OM),
            ENDDAY = VALUES(ENDDAY),
            DAYS_TO_STAY = VALUES(DAYS_TO_STAY),
            RESIDENCE = VALUES(RESIDENCE),
            PART_MAN_CNT = VALUES(PART_MAN_CNT),
            PART_WOMAN_CNT = VALUES(PART_WOMAN_CNT),
            LEAD_MAN_CNT = VALUES(LEAD_MAN_CNT),
            LEAD_WOMAN_CNT = VALUES(LEAD_WOMAN_CNT),
            SUPPORT = VALUES(SUPPORT),
            INCOME_TYPE = VALUES(INCOME_TYPE),
            PART_TYPE = VALUES(PART_TYPE),
            AGE_TYPE = VALUES(AGE_TYPE),
            BIZ_PURPOSE = VALUES(BIZ_PURPOSE),
            PROGRAM_IN_OUT = VALUES(PROGRAM_IN_OUT),
            SERVICE_TYPE = VALUES(SERVICE_TYPE),
            ROOM_PART_PEOPLE = VALUES(ROOM_PART_PEOPLE),
            ROOM_PART_ROOM = VALUES(ROOM_PART_ROOM),
            ROOM_LEAD_PEOPLE = VALUES(ROOM_LEAD_PEOPLE),
            ROOM_LEAD_ROOM = VALUES(ROOM_LEAD_ROOM),
            ROOM_ETC_PEOPLE = VALUES(ROOM_ETC_PEOPLE),
            ROOM_ETC_ROOM = VALUES(ROOM_ETC_ROOM),
            MEAL_TYPE = VALUES(MEAL_TYPE),
            MEAL_PART = VALUES(MEAL_PART),
            MEAL_LEAD = VALUES(MEAL_LEAD),
            MEAL_ETC = VALUES(MEAL_ETC),
            PROGRAM_OPINION = VALUES(PROGRAM_OPINION),
            SERVICE_OPINION = VALUES(SERVICE_OPINION),
            OVERALL_OPINION = VALUES(OVERALL_OPINION),
            PROGRESS_STATE = VALUES(PROGRESS_STATE),
            REG_ID = VALUES(REG_ID),
            PART_FORM = VALUES(PART_FORM),
            ORG_NATURE = VALUES(ORG_NATURE),
            ISCLOSEMINE = VALUES(ISCLOSEMINE)
        
    `;  

    
    maria(sql, values).then((rows) => {
        const pk = BASIC_INFO_SEQ ? BASIC_INFO_SEQ : rows.insertId;
        return maria(`DELETE FROM expense WHERE BASIC_INFO_SEQ = ?`, [pk]).then(() => pk);
    })
    .then((pk) => {
        // JSON 데이터를 2차원 배열로 변환
        let expenseRows = expenseList.map(obj => [obj.EXPENSE_TYPE, obj.EXPENSE_PRICE || 0, obj.EXPENSE_DETAIL, obj.EXPENSE_NOTE, pk]);
        const expenseInsert = `INSERT INTO expense (EXPENSE_TYPE, EXPENSE_PRICE, EXPENSE_DETAIL, EXPENSE_NOTE, BASIC_INFO_SEQ) VALUES ?`;
        return maria(expenseInsert, [expenseRows]).then(()=>pk);
    })
    .then((pk) => {
        return maria(`DELETE FROM income WHERE BASIC_INFO_SEQ = ?`, [pk]).then(() => pk);
    })
    .then((pk) => {
        let incomeRows = incomeList.map(obj => [obj.INCOME_TYPE, obj.INCOME_PRICE || 0, obj.INCOME_DETAIL, obj.INCOME_NOTE, pk]);
        const incomeInsert = `INSERT INTO income (INCOME_TYPE, INCOME_PRICE, INCOME_DETAIL, INCOME_NOTE, BASIC_INFO_SEQ) VALUES ?`;
        return maria(incomeInsert, [incomeRows]);
    })
    .then(() => {
        res.json({result: true});
    })


});


// 임시저장 조회
router.post('/getTempList', (req, res)=>{
    
    const sql = `SELECT AGENCY, BASIC_INFO_SEQ, OPENDAY FROM basic_info WHERE PROGRESS_STATE='P'`;
    maria(sql).then((rows) =>  res.json(rows) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

});




// 임시저장 정보 조회
router.post('/getTempData', (req, res)=>{
    const {seq} = req.body; 

    const basicInfoSql = `SELECT * FROM basic_info WHERE BASIC_INFO_SEQ = ?`;
    const expenseSql = `SELECT * FROM expense WHERE BASIC_INFO_SEQ = ?`;
    const incomeSql = `SELECT * FROM income WHERE BASIC_INFO_SEQ = ?`;

    Promise.all([
        maria(basicInfoSql, [seq]),
        maria(expenseSql, [seq]),
        maria(incomeSql, [seq])
    ])
    .then(([basicInfoRows, expenseRows, incomeRows]) => {
        res.json({
            basicInfo: basicInfoRows,
            expense: expenseRows,
            income: incomeRows
        })
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요." });
    });
});


// 모든항목 등록 
router.post('/create', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {type ,data, deleteRow} = req.body;
    const {fields, key, table} = dbTable[type];

    try{
        const rows = data.map(item => {
            const values = fields.map(field =>  typeof item[field] === 'number' ? item[field] || null : `'${item[field] || ''}'`);
            return `(${values.join(', ')})`;
        });


    const mergedString = fields.join(",")

    const _rowDelete = data.map(i=> i[key])
    
    // 삭제 후 Insert 
    const delRows = [...deleteRow, ..._rowDelete].filter(i=> i !== "");

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = delRows.length > 0 ? `DELETE FROM ${table} WHERE ${key} IN (${delRows.join(", ")})` : "";

    let deletePromise;
    
    if (deleteQuery) {
        deletePromise = maria(deleteQuery);
    } else {
        deletePromise = Promise.resolve();
    }
    const regId = user_name;


    const desc =  {
        program_satisfaction  : "프로그램 만족도 입력",
        counsel_service  : "상담/치유서비스 효과평가",
        prevent_service  : "예방서비스 효과평가",
        healing_service  : "힐링서비스 효과평가",
        hrv_service  : "HRV 측정 검사",
        vibra_service  : "바이브라 측정 검사",
    }


    deletePromise
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, desc[type]))
        .then(() => res.json({ result: true }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
});



module.exports = router;