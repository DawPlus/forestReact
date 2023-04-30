const express = require('express');
const app = express();
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const session = require("express-session");
const FileStore = require("session-file-store")(session)
const dotenv = require("dotenv");
// Maria DB
const fs = require("fs");
const cors = require("cors");

const loginRouter = require("./loginRouter");
const test = require('./Router/test');


dotenv.config();

// body-parser
app.use(morgan("dev")) // dev - 개발 , combined - 배포시( 좀더 많은정보 )
app.use(express.json())
app.use(cookieParser('foresthealing'))
app.use(express.urlencoded({extended : true}))  // true ? qs : querystring

app.use(cors({
    origin : "http://localhost:3000",
    method : ["GET", "POST"],
    credentials : true,
}));
app.use(session({
    name : 'healing',
    secret : process.env.SESSION_SECRET,
    resave : false, 
    saveUninitialized : false, 
    store : new FileStore(),
    cookie : {
        expires: new Date(Date.now() + 3600000), // 1시간 후에 만료
        //expires: new Date(Date.now() +  1000), // 1시간 후에 만료
        httpOnly : false,
        secure : false 
    },
}));

// 모든 요청에대해 1시간으로 세션 유지시간을 추가
// app.use((req, res, next) => {
//     if(req.session){
//         req.session.cookie.maxAge = 1 * 60 * 60 * 1000; // 1시간
//     }
//     next();
//   });

// app.get("*", (req, res)=>{

// });
app.use(loginRouter)

app.post("/api/session", (req, res)=> {
    console.log(req.session.user)
    res.json("session information ");
});


app.use('/api', test);

app.use((req, res, next)=>{
    res.send("404 페이지 ")
});

app.use((err, req, res, next)=> {
    res.send({status : "error"})
})



const port=process.env.PORT; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});