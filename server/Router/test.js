

//서비스유형
router.post('/getSupportType', (req, res)=>{
    const { openday, endday} = req.body;
    let sql = `
        SELECT
            '사회공헌' AS biz_purpose,
            COUNT(CASE WHEN FIND_IN_SET('프로그램', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_program,
            COUNT(CASE WHEN FIND_IN_SET('숙박', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_accommodation,
            COUNT(CASE WHEN FIND_IN_SET('식사', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_meal,
            COUNT(CASE WHEN FIND_IN_SET('기타', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_meal,
            COUNT(CASE WHEN SUPPORT = '해당없음' THEN 1 END) AS count_none
        FROM
            BASIC_INFO
        WHERE
            BIZ_PURPOSE = '사회공헌' AND PROGRESS_STATE = 'E'

        UNION ALL

        SELECT
            '수익사업' AS biz_purpose,
            COUNT(CASE WHEN FIND_IN_SET('프로그램', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_program,
            COUNT(CASE WHEN FIND_IN_SET('숙박', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_accommodation,
            COUNT(CASE WHEN FIND_IN_SET('식사', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_meal,
            COUNT(CASE WHEN FIND_IN_SET('기타', REPLACE(SUPPORT, ' ', '')) > 0 THEN 1 END) AS count_meal,
            COUNT(CASE WHEN SUPPORT = '해당없음' THEN 1 END) AS count_none
        FROM
            BASIC_INFO
        WHERE
            BIZ_PURPOSE = '수익사업' AND PROGRESS_STATE = 'E';

    `;
    maria(sql,[openday, endday]).then((rows) => {  
        res.json(rows)
    })
    .catch((err) => {
        res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })
    });
});

//서비스유형
router.post('/getServiceType', (req, res)=>{
    const { openday, endday} = req.body;
    let sql = `
        SELECT 
            BIZ_PURPOSE,
            COUNT(case when SERVICE_TYPE ='산림교육' then 1 end ) as forest_edu, 
            COUNT(case when SERVICE_TYPE ='산림치유' then 1 end ) as forest_healing,
            COUNT(case when SERVICE_TYPE ='행위중독치유' then 1 end ) as addict_healing,
            COUNT(case when SERVICE_TYPE ='행위중독예방' then 1 end ) as addict_prevent,
            COUNT(case when SERVICE_TYPE ='힐링' then 1 end ) as healing,
            COUNT(case when SERVICE_TYPE ='기타' then 1 end ) as ser_etc
        FROM 
            BASIC_INFO
        WHERE 1=1
            AND (BIZ_PURPOSE ='수익사업' OR BIZ_PURPOSE ='사회공헌') AND PROGRESS_STATE ='E'
            AND OPENDAY BETWEEN ? AND ?   

        GROUP BY
            BIZ_PURPOSE;
    `;
    maria(sql,[openday, endday]).then((rows) => {  
        res.json(rows)
    })
    .catch((err) => {
        res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })
    });
});


//객실배졍
router.post('/getRoomList', (req, res)=>{
    const { openday, endday} = req.body;
    let sql = `
        SELECT 
            SUM(ROOM_PART_PEOPLE) as room_part_people, SUM(ROOM_LEAD_PEOPLE) as room_lead_people, SUM(ROOM_ETC_PEOPLE) as room_etc_people,
            SUM(ROOM_PART_ROOM) as room_part_room, SUM(ROOM_LEAD_ROOM) as room_lead_room, SUM(ROOM_ETC_PEOPLE) as room_etc_room,
            SUM(MEAL_PART) as meal_part, SUM(MEAL_LEAD) as meal_lead, SUM(MEAL_ETC) as meal_etc
        FROM BASIC_INFO
        WHERE 
            1 = 1
            AND OPENDAY BETWEEN ? AND ?  
            AND PROGRESS_STATE = "E"
    `;
    maria(sql,[openday, endday]).then((rows) => {  
        res.json(rows)
    })
    .catch((err) => {
        res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })
    });
});


