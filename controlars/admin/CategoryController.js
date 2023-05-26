const CategoryModel = require('../../models/category')

class CategoryController {

    static categoryDisplay = (req, res) => {
        try {

            const { role } = req.admin
            res.render('admin/category/catdisplay', { role: role })

        } catch (error) {
            console.log(error)
        }

    }



}
module.exports = CategoryController