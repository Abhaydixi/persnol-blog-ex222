const CategoryModel = require('../../models/category')

class CategoryController{

    static categoryDisplay=(req,res)=>{
        res.render('admin/category/catdisplay')
    }



}
module.exports = CategoryController