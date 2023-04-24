const express = require('express');
const app = express();
const test = require('./Router/test');
const bodyParser = require('body-parser');
// Maria DB
const maria = require("./maria");
// Mapper
const mybatisMapper = require("mybatis-mapper");
mybatisMapper.createMapper(["./mapper/common.xml"]);

maria.connect();


// body-parser

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', test);





const port=5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});