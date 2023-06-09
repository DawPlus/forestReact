const express   = require('express');
const router = express.Router();
//const login = require("./login")
const program = require("./program")
const management = require("./management")
const programResult = require("./programResult")
const updateDelete = require("./updateDelete")
const insertForm = require("./insertForm")
const yearMonthResult = require("./yearMonthResult")

//router.use(login);
router.use("/program", program);



router.use("/management", management);
router.use("/programResult", programResult);
router.use("/updateDelete", updateDelete);
router.use("/insertForm", insertForm);
router.use("/yearMonthResult", yearMonthResult);


module.exports = router;