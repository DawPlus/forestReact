const express   = require('express');
const router = express.Router();
const login = require("./login")
const program = require("./program")
const management = require("./management")

router.use(login);
router.use("/program", program);
router.use("/management", management);


module.exports = router;