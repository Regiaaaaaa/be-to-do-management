var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Selamat datang di tb gais');
});

module.exports = router;
