const BlogModel = require('../../models/Blog')
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'di61xlmoy',
    api_key: '365262784934562',
    api_secret: 'BhgYhnemhXBA_VcD5e5nZdH5gt8',
    //secure: true
});

class blogController {


    static displayBlog = async (req, res) => {

        try {

            const data = await BlogModel.find()
            console.log(data)

            res.render('admin/blog/display', { d: data })

        } catch (error) {
            console.log(error)
        }
    }
    static insertblog = async (req, res) => {
        try {
            //console.log(req.files.image)
            //console.log(req.body)

            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'blogImage'
            })
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.discription,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/blogdisplay')

            //console.log(myimage)
            //const result = new BlogModel({
            // title:req.body.title,
            // description:req.body.discription
            //})
            //await result.save()
            //console.log(result)

            //res.redirect('/admin/blogdisplay')  //url of router


        } catch (error) {
            console.log(error)
        }

    }
    static blogview = async (req, res) => {

        try {
            //console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            //console.log(data)

            res.render('admin/blog/view', { view: data })

        } catch (error) {
            console.log(error)
        }
    }

    static blogEdit = async (req, res) => {

        try {
            //console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            //console.log(data)

            res.render('admin/blog/edit', { edit: data })

        } catch (error) {
            console.log(error)
        }
    }

    static blogupdate = async (req, res) => {

        try {
            //console.log(req.body)
            //console.log(req.params.id)
            //first delete the image
            const blog = await BlogModel.findById(req.params.id) //code off delete server image
            const imageid = blog.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            //second update image
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'blogImage'
            })

            const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            await update.save()
            res.redirect('/admin/blogdisplay')

        } catch (error) {
            console.log(error)
        }
    }


    static blogDelete = async (req, res) => {
        try {
            //cloudinary server image delete code 
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            // console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


            await BlogModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }

    }




}

module.exports = blogController