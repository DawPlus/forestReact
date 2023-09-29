const express = require('express');
const router = express.Router();
const maria = require("../maria");
const dbTable = require("../db/fields");
const { createHistory } = require('../util');

// 서비스환경 만족도
router.post('/serviceInsert', (req, res)=>{

    const {user_name} = req.session?.userInfo;
    const { data, agency , openday, eval_date} = req.body;
    const fields = ['OPENDAY', 'SEX', 'AGE', 'RESIDENCE', 'JOB', 'PTCPROGRAM', 'AGENCY', 'EVAL_DATE', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'SCORE10', 'FACILITY_OPINION', 'SCORE11', 'SCORE12', 'SCORE13', 'SCORE14', 'SCORE15', 'SCORE16', 'OPERATION_OPINION', 'SCORE17', 'SCORE18'];

    try{
    
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



    const insertQuery = `INSERT INTO service_env_satisfaction (OPENDAY, SEX, AGE, RESIDENCE, JOB, PTCPROGRAM, AGENCY, EVAL_DATE, SCORE1, SCORE2, SCORE3, SCORE4, SCORE5, SCORE6, SCORE7, SCORE8, SCORE9, SCORE10, FACILITY_OPINION, SCORE11, SCORE12, SCORE13, SCORE14, SCORE15, SCORE16, OPERATION_OPINION, SCORE17, SCORE18) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    //const deleteQuery = delRows.length > 0 ? `DELETE FROM service_env_satisfaction WHERE SERVICE_SEQ IN (${delRows.join(", ")})` : "";

    const deleteQuery =  `DELETE FROM service_env_satisfaction WHERE AGENCY = ? AND OPENDAY = ?  AND EVAL_DATE = ? `;

    const regId = user_name;
    const des = '서비스환경 만족도 입력';

    maria(deleteQuery,[agency , openday, eval_date])
        .then(() => {
            // ROW 삭제 후에 INSERT 실행
            return maria(insertQuery);
        })
        .then(() => {
            // insertQuery 실행 후 history 쿼리 실행
            return createHistory(regId, des);
        })
        .then(() => {
            res.json({ result: true });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
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
    // Where 
    const conditions = Object.entries(data) .filter(([key, value]) => value !== '') .map(([key, value]) => { return `${key} = ?`; });
    // Value
    const values = Object.values(data) .filter(value => value !== '');
    // sql
    const sql = `SELECT * FROM ${table} WHERE ${conditions.join(' AND ')}`;
    
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




// 모든항목 등록 
router.post('/createProgram', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data, agency, openday, evaldate, program_name } = req.body;

    const {fields, table} = dbTable["program_satisfaction"];

    try{
        const rows = data.map(item => {
            const values = fields.map(field =>  typeof item[field] === 'number' ? item[field] || null : `'${item[field] || ''}'`);
            return `(${values.join(', ')})`;
        });


    const mergedString = fields.join(",")

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = `DELETE FROM program_satisfaction WHERE AGENCY = ? AND OPENDAY = ? AND EVAL_DATE = ? AND PROGRAM_NAME = ?`;

    const regId = user_name;

    maria(deleteQuery, [agency, openday, evaldate, program_name])
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, "프로그램 만족도 입력"))
        .then(() => res.json({ result: true }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
});



// 상담치유
router.post('/createCounsel', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data, agency, openday, evaldate, pv } = req.body;

    const {fields, table} = dbTable["counsel_service"];

    try{
        const rows = data.map(item => {
            const values = fields.map(field => {
                const fieldValue = item[field] !== undefined && item[field] !== null ? item[field] : '';
                if (fieldValue === 0) {
                return 0;
                }
                return typeof fieldValue === 'string' ? `'${fieldValue}'` : fieldValue;
            });
            return `(${values.join(', ')})`;
        });

    const mergedString = fields.join(",")

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = `DELETE FROM counsel_service WHERE AGENCY = ? AND OPENDAY = ? AND EVAL_DATE = ? AND PV = ? `;

    const regId = user_name;

    maria(deleteQuery, [agency, openday, evaldate, pv])
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, "상담/치유서비스 효과평가"))
        .then(() => res.json({ result: true }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
});

// 예방서비스
router.post('/createPrevent', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data, agency, openday, evaldate , pv} = req.body;

    const {fields, table} = dbTable["prevent_service"];

    try{
        const rows = data.map(item => {
            const values = fields.map(field => {
                const fieldValue = item[field] !== undefined && item[field] !== null ? item[field] : '';
                if (fieldValue === 0) {
                return 0;
                }
                return typeof fieldValue === 'string' ? `'${fieldValue}'` : fieldValue;
            });
            return `(${values.join(', ')})`;
        });


    const mergedString = fields.join(",")

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = `DELETE FROM prevent_service WHERE AGENCY = ? AND OPENDAY = ? AND EVAL_DATE = ? AND PV = ? `;

    const regId = user_name;

    maria(deleteQuery, [agency, openday, evaldate, pv])
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, "예방서비스 효과평가"))
        .then(() => res.json({ result: true }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
});

// 힐링서비스
router.post('/createHealing', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data, agency, openday, evaldate , pv} = req.body;

    const {fields, table} = dbTable["healing_service"];

    try{
        // const rows = data.map(item => {
        //     const values = fields.map(field => {
        //       if (typeof item[field] === 'number') {
        //         return item[field] === 0 ? 0 : '';
        //       } else {
        //         const fieldValue = item[field] || ''; // null 또는 빈 문자열로 설정
        //         return isNaN(fieldValue) ? `'${fieldValue}'` : fieldValue;
        //       }
        //     });
        //     return `(${values.join(', ')})`;
        //   });
          
    const rows = data.map(item => {
        const values = fields.map(field => {
            const fieldValue = item[field] !== undefined && item[field] !== null ? item[field] : '';
            if (fieldValue === 0) {
            return 0;
            }
            return typeof fieldValue === 'string' ? `'${fieldValue}'` : fieldValue;
        });
        return `(${values.join(', ')})`;
    });
          

    const mergedString = fields.join(",")

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = `DELETE FROM healing_service WHERE AGENCY = ? AND OPENDAY = ? AND EVAL_DATE = ? and PV = ? `;

    const regId = user_name;

    maria(deleteQuery, [agency, openday, evaldate, pv])
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, "힐링서비스 효과평가"))
        .then(() => res.json({ result: true }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
});

// HRV측정검사
router.post('/createHrv', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data, agency, date, pv} = req.body;

    const {fields, table} = dbTable["hrv_service"];

    try{
        const rows = data.map(item => {
            const values = fields.map(field => {
                const fieldValue = item[field] !== undefined && item[field] !== null ? item[field] : '';
                if (fieldValue === 0) {
                return 0;
                }
                return typeof fieldValue === 'string' ? `'${fieldValue}'` : fieldValue;
            });
            return `(${values.join(', ')})`;
        });

    const mergedString = fields.join(",")

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = `DELETE FROM hrv_service WHERE AGENCY = ? AND DATE = ? AND PV = ? `;

    const regId = user_name;

    maria(deleteQuery, [agency, date, pv])
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, "HRV 측정 검사"))
        .then(() => res.json({ result: true }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록 중 오류가 발생했습니다. 관리자에게 문의하세요." });
        });
    }catch(e){
        console.log(e)
    }
});

// 바이브라 측정검사
router.post('/createVibra', (req, res)=>{
    const {user_name} = req.session?.userInfo;
    const {data, agency, date, pv } = req.body;

    const {fields, table} = dbTable["vibra_service"];

    try{
        const rows = data.map(item => {
            const values = fields.map(field => {
                const fieldValue = item[field] !== undefined && item[field] !== null ? item[field] : '';
                if (fieldValue === 0) {
                return 0;
                }
                return typeof fieldValue === 'string' ? `'${fieldValue}'` : fieldValue;
            });
            return `(${values.join(', ')})`;
        });


    const mergedString = fields.join(",")

    const insertQuery = `INSERT INTO ${table} (${mergedString}) VALUES ${rows}`;
   // deleteRows가 있는 경우에만 deleteQuery 실행
    const deleteQuery = `DELETE FROM vibra_service WHERE AGENCY = ? AND DATE = ? AND PV = ? `;

    const regId = user_name;

    maria(deleteQuery, [agency, date, pv])
        .then(() =>  maria(insertQuery))
        .then(() => createHistory(regId, "바이브라 측정 검사"))
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