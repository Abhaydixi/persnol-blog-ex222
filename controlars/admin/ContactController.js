const contactModel = require('../../models/contact')


class connectController{
    static contactdisplay = (req,res)=>{
        res.render('admin/contact/contact')
    }
}

module.exports = connectController