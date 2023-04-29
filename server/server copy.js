const express = require('express');
const app = express();
const test = require('./Router/test');
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const session = require("express-session");
const multer = require("multer")
const path = require("path")
// Maria DB
const maria = require("./maria");
const fs = require("fs");

// Mapper
maria.connect();


try{
    fs.readdirSync("uploads");    
}catch(err){
    console.log("upload 폴더가 없어 uploads 폴더생성");
    fs.mkdirSync("uploads");
}


// body-parser
app.use(morgan("dev")) // dev - 개발 , combined - 배포시( 좀더 많은정보 )
app.use(express.json())
app.use(cookieParser('foresthealing'))
app.use(express.urlencoded({extended : true}))  // true ? qs : querystring

app.use(cors({
    orgin : "http://localhost:3000",
    method : ["GET", "POST"],
    credential : true,

}))

app.use(session({
    resave : false, 
    saveUninitialized : false, 
    secret : "foresthealing",
    cookie : {
        maxAge : 24 * 60 * 60 * 1000, 
        httpOnly : false,
        secure : false 
    },
    name : 'connect.sid'
}));



const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/')
        },
        filename(req, file, done){
            const ext= path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext)+ Date.now()+ext);
        }
    }),
    limits :{fileSize : 5 * 1024 * 1024},
})

app.get('/upload', upload.single("image"), (req, res)=>{
    res.send("ok")
})



app.use("/", (req, res, next)=>{
    // 로그인 시 static 제공 그외는 넘김 
    if(req.session.id){
        express.static(__dirname, 'public')
    }else{
        next()
    }
})






// app.get("/", (req, res)=>{
//     res.sendFile(path.join(__dirname, "./index.html") )
// })



// app.get("/test/:name", (req, res)=>{

    
//     res.send(`hello ${req.params.name}`)
// })

app.use('/api', test);

app.use((req, res, next)=>{
    res.send("404 페이지 ")
});

app.use((err, req, res, next)=> {
    res.send("error ")
})



const port=5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});