const express = require('express');
const router = express.Router();
const achievementsController = require('../controllers/achievements');

router.get('/',achievementsController.getAll);
router.get('/:id',achievementsController.getById);

module.exports = router;