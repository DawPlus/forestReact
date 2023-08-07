const maria = require("mysql");

// DB 연결 정보
const dbConfig = {
    host : "db.statistics.gabia.io",
    port : 3306, 
    user : 'statistics',
    password : "forest113*", 
    database : "dbstatistics"

  };
  
// DB 연결 풀 생성
const pool = maria.createPool(dbConfig);

const executeQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
          return;
        }
  
        conn.query(sql, params, (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
  
          resolve(rows);
        });
  
        conn.release();
      });
    });
  };
  
module.exports= executeQuery;