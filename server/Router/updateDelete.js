const express = require("express");
const router = express.Router();
const maria = require("../maria");

// 수정/삭제 조회
router.post("/getList", (req, res) => {
  const { type, openday, endday } = req.body;
  // 1 : 프로그램 운영 결과
  // 2 : 서비스환경 만족도
  // 3 : '프로그램만족도'
  // 4 : 상담&치유서비스 효과평가
  // 5 : 예방서비스 효과평가
  // 6 : 힐링서비스 효과평가
  // 7 : HRV 효과평가
  // 8 : 바이브라 효과평가
  const sql = [
    // 프로그램 만족도
    `SELECT BASIC_INFO_SEQ AS SEQ, AGENCY, OPENDAY FROM basic_info WHERE PROGRESS_STATE = "E"  ${
      openday ? `AND OPENDAY BETWEEN ? AND ?` : ""
    }  GROUP BY AGENCY, OPENDAY order by OPENDAY desc`,
    `SELECT SERVICE_SEQ AS SEQ, AGENCY, OPENDAY, EVAL_DATE FROM service_env_satisfaction where 1=1 ${
      openday ? `AND OPENDAY BETWEEN ? AND ?` : ""
    } GROUP BY AGENCY, EVAL_DATE`,
    `SELECT PROGRAM_SEQ AS SEQ, CONCAT(AGENCY, \'(\', PROGRAM_NAME, \')\') AS AGENCY_DISPLAY, AGENCY, OPENDAY, EVAL_DATE, PROGRAM_NAME , BUNYA, TEACHER, PLACE FROM program_satisfaction WHERE 1=1 ${
      openday ? `AND OPENDAY BETWEEN ? AND ?` : ""
    }  GROUP BY AGENCY, EVAL_DATE, PROGRAM_NAME, TEACHER, PLACE`,
    `SELECT COUNSEL_SEQ AS SEQ, CONCAT(AGENCY, \'(\', PV, \')\') AS AGENCY_DISPLAY, OPENDAY, AGENCY,PV, EVAL_DATE, COUNSEL_CONTENTS FROM counsel_service WHERE 1=1 ${
      openday ? `AND OPENDAY BETWEEN ? AND ?` : ""
    }  GROUP BY AGENCY_DISPLAY, PV, EVAL_DATE, COUNSEL_CONTENTS`,
    `SELECT PREVENT_SEQ AS SEQ, CONCAT(AGENCY, \'(\', PV, \')\') AS AGENCY_DISPLAY, OPENDAY, EVAL_DATE, AGENCY,PV FROM prevent_service WHERE 1=1 ${
      openday ? `AND OPENDAY BETWEEN ? AND ?` : ""
    }  GROUP BY AGENCY, PV, OPENDAY, EVAL_DATE`,
    `SELECT HEALING_SEQ AS SEQ, CONCAT(AGENCY, \'(\', PV, \')\') AS AGENCY_DISPLAY, AGENCY , OPENDAY, EVAL_DATE, PV FROM healing_service WHERE 1=1 ${
      openday ? `AND OPENDAY BETWEEN ? AND ?` : ""
    }  GROUP BY AGENCY, OPENDAY, PV, EVAL_DATE`,
    `SELECT HRV_SEQ AS SEQ, CONCAT(AGENCY, \'(\', PV, \')\') AS AGENCY_DISPLAY, PV,  AGENCY, DATE AS OPENDAY FROM hrv_service WHERE 1=1 ${
      openday ? `AND DATE BETWEEN ? AND ?` : ""
    } GROUP BY AGENCY, PV, DATE`,
    `SELECT VIBRA_SEQ AS SEQ, CONCAT(AGENCY, \'(\', PV, \')\') AS AGENCY_DISPLAY, PV,  AGENCY, DATE AS OPENDAY FROM vibra_service WHERE 1=1 ${
      openday ? `AND DATE BETWEEN ? AND ?` : ""
    } GROUP BY AGENCY, PV, DATE`,
  ];

  const selectedSql = sql[type - 1];
  const params = openday ? [openday, endday] : []; // 조건에 따라 파라미터 설정
  maria(selectedSql, params)
    .then((rows) => {
      res.json({ rows });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " });
    });
});

// 삭제
router.post("/deleteBasicInfo", (req, res) => {
  const { seq } = req.body;
  //  삭제도 seq로 삭제 안됨 , 모두 agency 와  openday , eval_date 로 삭제 해야함
  const sql = "DELETE FROM basic_info WHERE BASIC_INFO_SEQ = ? ";
  console.log(sql);
  maria(sql, [seq])
    .then((rows) => {
      res.json({ result: true });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })
    );
});

// 삭제
router.post("/delete", (req, res) => {
  const { type, agency, openday, eval_date, pv, program_name } = req.body;
  const sql = [
    "DELETE FROM basic_info WHERE BASIC_INFO_SEQ = ?", // 안씀
    "DELETE FROM service_env_satisfaction WHERE AGENCY = ? and OPENDAY = ? AND EVAL_DATE = ? ",
    "DELETE FROM program_satisfaction WHERE AGENCY = ? and OPENDAY = ? AND EVAL_DATE = ? AND PROGRAM_NAME = ? ", // agency, openday , program_name

    // 여기까진 확인함
    "DELETE FROM counsel_service WHERE AGENCY = ? and OPENDAY = ? AND PV = ? ", // gency, openday , pv
    "DELETE FROM prevent_service WHERE AGENCY = ? and OPENDAY = ? AND PV = ?",
    "DELETE FROM healing_service WHERE AGENCY = ? and OPENDAY = ? AND PV = ?",
    "DELETE FROM hrv_service WHERE AGENCY = ? and PV = ?", // agency, pv
    "DELETE FROM vibra_service WHERE AGENCY = ? and PV = ?", // agency, pv
  ];
  const selectedSql = sql[type - 1];
  const value = [agency, openday, eval_date, pv, program_name].filter(
    (i) => i !== undefined
  );

  maria(selectedSql, value)
    .then((rows) => {
      res.json({ result: true });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " })
    );
});

module.exports = router;
