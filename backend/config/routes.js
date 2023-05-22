const express = require("express")
const router = express.Router()
const userController = require('../app/controllers/userController')
const adminController = require("../app/controllers/adminController")

router.get("/users",userController.list)
router.post('/user/register',userController.register)
router.post('/user/login',userController.login)
router.post('/user/forgot-password',userController.sendForgotPasswordLink)
router.post('/user/change-password/:token',userController.changePassword)
///////////////////////
router.post('/admin/login',adminController.login)
module.exports=router