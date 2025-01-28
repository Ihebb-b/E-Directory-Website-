const express = require('express');
const router = express.Router();
const { protect } = require('../middelware/authMiddelware');
const upload = require("../utils/multerConfig");

const {
    authUser,
    register,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
    assignRole,
    getTotalUsers,
    updateProfile,
    getTotalRestaurants,
    getAllRestaurants,
    getAllRestaurantsPagi,
    getRestaurantById,
    searchRestaurants,
    getFilteredRestaurants,
    getCountries,
    getDiet,
  } = require('../controllers/userController');
  

router.post('/auth', authUser);
router.post('/register', register);
router.post('/logout', logoutUser);
//router.route('/profile').get(protect, getUserProfile).put(protect, UpdateUserProfile);
router.route('/assignrole').post(protect, assignRole);
router.put('/profile', upload.single('image'), protect, updateProfile);
router.route('/total').get(protect, getTotalUsers);
router.get('/getTotalRestaurants', getTotalRestaurants);
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/getAllRestaurantsPagi', getAllRestaurantsPagi);
router.route('/getProfile').get(protect, getUserProfile);
router.get('/restaurant/:id', getRestaurantById);
router.get('/search', searchRestaurants);
router.get('/filtered', getFilteredRestaurants);
router.get('/countries', getCountries);
router.get('/diets', getDiet);











module.exports = router;
