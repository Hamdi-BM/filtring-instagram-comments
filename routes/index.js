var express = require('express');
var router = express.Router();
const filtercontroller = require('../controllers/filter.controller');
router.post('/analyze-comment', filtercontroller.analyzePostComments);

module.exports = router;
