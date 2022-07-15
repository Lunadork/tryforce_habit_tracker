//Requires
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items')

//Paths
router.get('/', itemsController.getAll);
router.get('/:id',itemsController.getById);

//exports
module.exports = router;