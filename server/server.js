const express = require('express');
const app = express();
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const session = require("express-session");
const FileStore = require("session-file-store")(session)
const dotenv = require("dotenv");
// Maria DB
const cors = require("cors");
const route = require('./Router'); 


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
        httpOnly : false,
        secure : false 
    },
}));

// 라우터 시작 !  
app.use("/api", route)



app.use((req, res, next)=>{
    res.send("404 페이지 ")
});

app.use((err, req, res, next)=> {
    res.send({status : "error"})
})



const port=process.env.PORT; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});