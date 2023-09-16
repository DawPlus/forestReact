const express = require('express');
const router = express.Router();

const { encrypt, decrypt } = require('../util');


    // 사용자 정보 수정  
    router.post('/test', (req, res)=>{

        const {data} = req.body;

        const enc = encrypt(data);
        console.log(enc)

        // const dec = decrypt("HX/g4aOnApQxQjpz40zOdA==");
        // console.log(dec);




        
        res.json({result :encPassword})
    });
    

    

module.exports = router;