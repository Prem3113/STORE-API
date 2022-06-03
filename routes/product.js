const express = require("express")
const router = express.Router()
const {getAllproductsStatic,getAllProducts} = require('../controllers/product')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllproductsStatic)

module.exports = router