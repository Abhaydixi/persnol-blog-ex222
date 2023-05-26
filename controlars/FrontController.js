const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/category')

class FrontController {

    static home = async (req, res) => {

        try {
            const blogs = await BlogModel.find()
            //console.log(blogs)
            res.render('home', { b: blogs })
        }
        catch (error) {
            console.log(error)
        }
    }


    static about = (req, res) => {
        res.render('about')
    }
    static contact = async (req, res) => {
        try {

            res.render('contact',)

        } catch (error) {
            console.log(error)
        }
        res.render('contact')
    }
    static blog = async (req, res) => {
        try {
            const blog = await BlogModel.find()
            res.render('blog', { b: blog })

        } catch (error) {
            console.log(error)
        }

    }


    static login = async (req, res) => {
        try {
            res.render('login', { message: req.flash('error') })
        }
        catch (error) {
            console.log(error)
        }
    }



    static register = async (req, res) => {
        try {
            res.render('register', { message: req.flash('error') })
        }
        catch (error) {
            console.log(error)
        }

    }


    static readmore = async (req, res) => {
        try {
            const readmore = await BlogModel.findById(req.params.id)
            const recentblogs = await BlogModel.find().limit(6)
            const category = await CategoryModel.find()
            res.render('readmore', { d: readmore, r: recentblogs, c: category })
            //console.log(readmore)
        } catch (error) {
            console.log(error)
        }
        // res.render('detail')
    }





}
module.exports = FrontController