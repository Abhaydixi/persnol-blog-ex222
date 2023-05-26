const express = require('express')
const adminController = require('../controlars/admin/adminController')
const blogController = require('../controlars/admin/blogController')
const CategoryController = require('../controlars/admin/CategoryController')
const connectController = require('../controlars/admin/ContactController')
const FrontController = require('../controlars/FrontController')
const auth = require('../middleware/auth')

const router = express.Router()



//frontController
router.get('/', FrontController.home)  //method
router.get('/about', FrontController.about)
router.get('/contact', FrontController.contact)
router.get('/blog', FrontController.blog)
router.get('/login', FrontController.login)
router.get('/register', FrontController.register)
router.get('/readmore/:id', FrontController.readmore)

//admin Controller
router.get('/admin/dashboard', adminController.dashboard)
router.get('/user', auth, adminController.userdisplay)
router.post('/adminregister', adminController.register)
router.post('/verifylogin', adminController.verifylogin)
router.get('/logout', adminController.logout)
router.get('/admin/User', adminController.user)
router.get('/admin/view/:id', adminController.view)
router.get('/admin/delete/:id', adminController.delete)
router.post('/admin/approved/:id', adminController.approved)


//blog controller
router.get('/admin/blogdisplay', auth, blogController.displayBlog)
router.post('/insertblog', auth, blogController.insertblog)
router.get('/admin/blogview/:id', auth, blogController.blogview)
router.get('/admin/blogedit/:id', auth, blogController.blogEdit)
router.post('/admin/blogupdate/:id', auth, blogController.blogupdate)
router.get('/admin/blogdelete/:id', auth, blogController.blogDelete)



//category controller
router.get('/admin/category', auth, CategoryController.categoryDisplay)


//contact controller
router.get('/admin/contact', auth, connectController.contactdisplay)



module.exports = router
