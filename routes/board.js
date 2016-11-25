var express = require('express');
var router = express.Router();

/* GET the board page. */
router.get('/', function(req, res, next) {
  res.render('board', { title: 'My board' });
});

module.exports = router;
