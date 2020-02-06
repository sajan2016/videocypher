var express = require('express');
var router = express.Router();
var categories=require("../controllers/categories.server.controller")

/* GET categories listing. */
router.post('/',categories.insertCategory);
router.get('/',categories.getCategory);

module.exports = router;
