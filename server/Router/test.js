const express = require('express');
const router = express.Router();




router.get('/select', (req, res)=>{
  maria.query("select 'test' from dual", 
  (err, rows, fields)=>{
    if(!err){
      res.send(rows)
    }else{
      console.log("error" + err);
      res.send(err)
    }
  }
  )
  

  //res.send({ test: "hi"});
});



module.exports = router;