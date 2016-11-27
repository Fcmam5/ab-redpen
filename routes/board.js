var Board = require('../models/board');
var express = require('express');
var router = express.Router();
/* GET the board page. */
router.get('/', function(req, res, next) {
    //Generate a random unique number as an ID
    var x = new Date().valueOf();

    var board = new Board({code:x});
    board.save(function(err){
        if (err) return console.error(err);
        board;
    });
    
  res.redirect('board/'+x);
});
router.get('/:num', function(req, res, next) {
    res.render('board', { title: 'My board' });
});

module.exports = router;
