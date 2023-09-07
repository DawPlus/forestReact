const express = require('express');
const app = express();
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const session = require("express-session");
//const FileStore = require("session-file-store")(session)
const dotenv = require("dotenv");
// Maria DB
const cors = require("cors");
const route = require('./Router'); 
const login = require("./Router/login")
const path = require('path');
dotenv.config();

// body-parser
app.use(morgan("dev")) // dev - 개발 , combined - 배포시( 좀더 많은정보 )
app.use(express.json())
app.use(cookieParser('foresthealing'))
app.use(express.urlencoded({extended : true}))  // true ? qs : querystring

const sessionStorePath = '/web/foresthealing/sessions'; // 원하는 세션 파일 저장 경로

app.use(cors({
    //origin : "http://statistics.gabia.io/",
    origin : [
        // 여기에 허용할 도메인을 추가합니다.
        "http://localhost:3000",
        "http://statistics.gabia.io"
    ],
    method : ["GET", "POST"],
    credentials : true,
}));

app.use(session({
    name : 'healing',
    secret: 'forestHealing',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

// app.use(session({
//     name : 'healing',
//     secret : "forestHealing",
//     resave : false, 
//     saveUninitialized : false, 
//     store : new FileStore({
//         path : sessionStorePath
//     }),
//     cookie : {
//         // expires: new Date(Date.now() + 3600000), // 1시간 후에 만료
//         expires: new Date(Date.now() + 10000), // 1시간 후에 만료
//         httpOnly : false,
//         secure : false 
//     },
// }));



// 로그인 확인을 위한 미들웨어 함수
function checkUserSession(req, res, next) {  
    if (!req.session.userInfo) {    
        // userInfo가 비어있는 경우 로그인하지 않았음을 알리는 응답 전송
        res.json({invalidateSession: true});
    } else {
        // userInfo가 있는 경우 다음 미들웨어 함수를 실행
        next();
    }
}

app.use('/', express.static(path.resolve(__dirname, './build')));
app.get('*', (req, res, next) => {
    if(req.path.split('/')[1] === 'static') return next();
    res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.use("/api", login);

// 모든 라우트에 미들웨어 함수 적용
app.use(checkUserSession);

// 라우터 시작 !  
app.use("/api", route)


app.use((req, res, next)=>{
    res.send("404 페이지 ")
});

app.use((err, req, res, next)=> {
    res.send({status : "error"})
})




app.listen(8080, ()=>{console.log(`Listening on port ${8080}`)});