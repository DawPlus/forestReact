const express = require('express');
const router = express.Router();
const maria = require("./maria");


// 로그인 하기 
router.post("/api/login", (req,res)=>{
    const {id, password} = req.body;
    //['foresthealing' , 'tksflaglffld113*']
    console.log(id, password)
    const sql = "SELECT * FROM USER_INFO  WHERE USER_ID= ? AND USER_PWD= ?"
    maria(sql, [id, password])
    .then((rows) => {
        if(rows.length > 0){
            req.session.save(()=>{
                req.session.userInfo ={
                    ...rows[0]
                }
                res.json({message : '로그인 되었습니다. ', isLogin : true, result : true})
            });
        }else{
            res.json({message : '로그인 정보를 확인해 주세요.', isLogin : false, result : true})
        }
    })
    .catch((err) => res.status(500).json({ error: "오류가 발생하였습니다. 관리자에게 문의하세요 " }));


});

router.post("/api/logout", (req, res)=>{
    req.session.destroy(()=>{
        req.session=null;
        res.clearCookie('healing'); // 세션 쿠키 삭제
        res.json({message : "logout success"})
    });
})

router.post('/api/loginCheck', (req, res)=>{
    console.log(req.session.userInfo)
    if (req.session.userInfo) {
        // 세션에 사용자 정보가 존재하면 로그인 상태로 판단
        const userInfo = req.session.userInfo;
        res.json({ message: "logged in", userInfo, isLogin : true });
      } else {
        // 세션에 사용자 정보가 없으면 로그아웃 상태로 판단
        res.json({ message: "logged out", isLogin : false });
      }
});

// 사용자 등록
router.post('/api/register', (req, res)=>{
    const {id, name, password} = req.body;
    const sql = `INSERT INTO USER_INFO(user_id, user_name, user_pwd, value) VALUES(?,?,?,'2')`;
    maria(sql, [id, name, password])
        .then(() => {
            res.json({ result: true });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "등록중 오류가 발생했습니다. 관리자에게 문의하세요 " });
        });
});




// 모든경로에 대해 auth Check 미들웨어 적용
router.use((req, res, next)=>{
    if(["/api/login", "/api/success", '/api/logout', '/api/register'].includes(req.path)){
        // 예네들은 제외 
        next();
    }else{
        if(req.session.userInfo){
            return res.status(401).send("Unauthorized");
        }
        next();
    }
})



module.exports = router;