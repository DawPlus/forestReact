const express = require('express');
const router = express.Router();

const { encrypt, decrypt } = require('../util');


    // 사용자 정보 수정  
    router.post('/test', (req, res)=>{

        const enc = encrypt("ShMCj/h5bWm+FVxaKozK2g==");
        console.log(enc)

        const dec = decrypt("HX/g4aOnApQxQjpz40zOdA==");
        console.log(dec);




        
        res.json({result :encPassword})
    });
    

    

module.exports = router;