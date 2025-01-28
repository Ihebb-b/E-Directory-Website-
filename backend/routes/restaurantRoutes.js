const express = require("express");
const router = express.Router();

const {
    createMenu,
    getMenuList,
    menuList,
    getAllMenus,
    getTotalRestaurants,
    getAllMenusPagi,
    getMenuById,
    getMenuByUserId,
    modifyMenu,
    deleteMenu,
  } = require("../controllers/restaurantController");
const { protect } = require("../middelware/authMiddelware");
const upload = require("../utils/multerConfig");

  

router.post('/addMenu', protect, upload.single('image'), createMenu);
router.get('/menus', protect, getMenuList);
router.get('/getAllmenus', getAllMenus);
router.get('/menuIndiv', protect, menuList);
router.get('/getAllmenusPagi', getAllMenusPagi);
router.get('/menuIndiv', protect, menuList);
router.get('/getMenu/:id', getMenuById);
router.get('/getMenuByUserId/:userId', getMenuByUserId);
router.put('/modifyMenu/:id', protect, upload.single('image'), modifyMenu);
router.delete('/deleteMenu/:id', protect, deleteMenu);







module.exports = router;