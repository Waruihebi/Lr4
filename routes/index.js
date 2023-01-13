const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Telegram Msg' });
});

const ctrlTelegram = require('../api/sendResults');
router.post('/telegram', ctrlTelegram.sendMsg);

module.exports = router;
