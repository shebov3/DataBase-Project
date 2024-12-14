const {
  addGame,
  addCategory,
  deleteGame,
  modifyGame,
  modifyAdminAccess,
  addGameToCart,
  getCartItems,
  deleteCartItem,
  addReview
} = require('../controllers/req-auth')

const express = require('express')
const router = express.Router()

router.route('/admin').post(addGame)
router.route('/admin/modifyAccess/:id').patch(modifyAdminAccess)
router.route('/admin/:id').delete(deleteGame).patch(modifyGame)
router.route('/admin/category').post(addCategory)
router.route('/cart/:id').post(addGameToCart).patch(deleteCartItem)
router.route('/cart').get(getCartItems)
router.route('/review/:id').post(addReview)
module.exports = router