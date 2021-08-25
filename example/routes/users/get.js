const express = require('express');

const router = express.Router();

router.post('/', (req, res) => res.status(200).json({ availableRoutes: ['/:user'] }));
router.post('/:user', (req, res) => res.status(200).json({ user: req.params.user }));
module.exports = router;
