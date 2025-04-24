const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/product_controllers');

router.post('/', getAllProducts);

module.exports = router;