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
        ISCLOSEMINE,
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
        REG_ID,
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
        PROGRAM_IN_OUT
    ]


    console.log(values);
    

    let sql = `
        INSERT INTO basic_info
            (BASIC_INFO_SEQ, OPENDAY, AGENCY, OM, ENDDAY, DAYS_TO_STAY, RESIDENCE,
            PART_MAN_CNT, PART_WOMAN_CNT, LEAD_MAN_CNT, LEAD_WOMAN_CNT, SUPPORT,
            INCOME_TYPE, PART_TYPE, AGE_TYPE, BIZ_PURPOSE, PROGRAM_IN_OUT, SERVICE_TYPE,
            ROOM_PART_PEOPLE, ROOM_PART_ROOM, ROOM_LEAD_PEOPLE, ROOM_LEAD_ROOM,
            ROOM_ETC_PEOPLE, ROOM_ETC_ROOM, MEAL_TYPE, MEAL_PART, MEAL_LEAD, MEAL_ETC,
            PROGRAM_OPINION, SERVICE_OPINION, OVERALL_OPINION, PROGRESS_STATE, REG_ID)
        VALUES 
            (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            REG_ID = VALUES(REG_ID)
    `;

    maria(sql, values).then((rows) => {
        const pk = BASIC_INFO_SEQ ? BASIC_INFO_SEQ : rows.insertId
        // 기본 끝낫고 그다음것들 입력 필요 

        // TODO ( 집행 예정 금액들 기본값은 필요함,,,, 시불)
        res.json({result : true})
    } )
    .catch((err) =>{
        console.log(err)    
        res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })
    });

});


// 서비스 조회
router.post('/getPreviousServiceList', (req, res)=>{
    const {data} = req.body; 
    const {AGENCY, OPENDAY, EVAL_DATE } = data;
    const sql = `SELECT * FROM service_env_satisfaction WHERE AGENCY =? AND OPENDAY = ? AND EVAL_DATE = ?`;
    maria(sql,[AGENCY, OPENDAY, EVAL_DATE]).then((rows) =>  res.json(rows) )
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));

});




// 프로그램 조회
router.post('/list', (req, res)=>{

    const {data, type} = req.body; 

    const {table} = dbTable[type]
    console.log(table)
    // Where 
    const conditions = Object.entries(data) .filter(([key, value]) => value !== '') .map(([key, value]) => { return `${key} = ?`; });
    // Value
    const values = Object.values(data) .filter(value => value !== '');
    // sql
    const sql = `SELECT * FROM ${table} WHERE ${conditions.join(' AND ')}`;
    console.log(sql, values)
    maria(sql, values).then((rows) => {
        res.json(rows)
    }).catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));
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