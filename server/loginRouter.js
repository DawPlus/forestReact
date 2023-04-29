const express = require('express');
const router = express.Router();
const maria = require("./maria");


router.post("/api/login", (req,res)=>{

    const userInfo = req.body;

    //['foresthealing' , 'tksflaglffld113*']
    console.log(userInfo)
    const row = maria.query("SELECT * FROM USER_INFO  WHERE USER_ID= ? AND USER_PWD= ?",[userInfo.id, userInfo.password], (err, rows, fields)=>{
        if(!err){
            
            if(rows.length > 0){
                req.session.save(()=>{
                    req.session.userInfo ={
                        ...rows[0]
                    }
                    res.json({message : '로그인이 완료 되었다', isLogin : true})
                });
            }
            
        }
    })
});

router.post("/api/logout", (req, res)=>{
    req.session.destroy(()=>{
        req.session=null;
        res.clearCookie('healing'); // 세션 쿠키 삭제
        res.json({message : "logout success"})
    });
})

router.post('/api/loginSuccess', (req, res)=>{
    console.log(req.session.userInfo)
    if (req.session.userInfo) {
        // 세션에 사용자 정보가 존재하면 로그인 상태로 판단
        const userInfo = req.session.userInfo;
        res.json({ message: "logged in", userInfo });
      } else {
        // 세션에 사용자 정보가 없으면 로그아웃 상태로 판단
        res.json({ message: "logged out" });
      }
})

// 모든경로에 대해 auth Check 미들웨어 적용
router.use((req, res, next)=>{
    if(["/api/login", "/api/success", '/api/logout'].includes(req.path)){
        // 예네들은 제외 
        next();
    }else{
        if(req.session.userInfo){
            return res.status(401).send("Unauthorized");
        }
        next();
    }
})


router.post("/api/session", (req, res)=> {
    console.log(req.session.user)
    res.json("session information ");
});


module.exports = router;