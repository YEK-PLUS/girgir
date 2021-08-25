const express = require('express');
const get = require('./get');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => res.status(200).json({
  user: 'test',
}));
router.use('/public/get', get);
// router.use('/update', update);
module.exports = router;
