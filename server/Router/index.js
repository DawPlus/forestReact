const express   = require('express');
const router = express.Router();
const login = require("./login")
const program = require("./program")
const basicInfoPage = require("./basicInfoPage")

router.use(login);
router.use("/program", program);
router.use("/management", basicInfoPage);


module.exports = router;