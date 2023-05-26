const AdminModel = require('../../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

class adminController {



    static dashboard = async (req, res) => {
        try {
            const { name, email, role } = req.admin
            if (role == "admin") {
                res.render('admin/dashboard', { n: name, e: email, role: role });
            } else {
                res.render('admin/dashboard', { n: name, e: email, role: role });
            }
        } catch (error) {
            console.log(error)
        }
    }

    static userdisplay = async (req, res) => {
        try {

            const result = await AdminModel.find();
            //console.log(result);
            res.render("/admin/user/user", { d: result });

        } catch (error) {
            console.log(error)
        }
    }


    static register = async (req, res) => {
        try {

            const { name, email, phone, password, confirm_password } = req.body
            const admin = await AdminModel.findOne({ email: email })


            if (admin) {
                req.flash('error', 'Email already exists')
                res.redirect('/register')
            }
            else {

                if (name && email && password && confirm_password) {
                    if (password && confirm_password) {

                        const hashpassword = await bcrypt.hash(password, 10)

                        const register = await new AdminModel({

                            name: name,
                            email: email,
                            phone: phone,
                            password: hashpassword
                        })

                        await register.save()
                        this.sendEmail(name, email)
                        res.redirect('/login')


                    } else {
                        req.flash('error', 'password and confirm password does not match')
                        res.redirect('/register')
                    }

                } else {
                    req.flash('error', 'All fields are required')
                    res.redirect('/register')
                }
            }


            //console.log(req.body)

        }
        catch (error) {
            console.log(error)
        }
    }

    static user = async (req, res) => {
        try {
            //console.log("user")
            const data = await AdminModel.find();

            res.render('admin/user/user', { d: data });

        } catch (error) {
            console.log(error)

        }
    }
    static view = async (req, res) => {
        try {
            //console.log(req.params.id)
            const data = await AdminModel.findById(req.params.id)
            //console.log(data)

            res.render('admin/user/view', { view: data })

        } catch (error) {
            console.log(error)
        }

    }

    static delete = async (req, res) => {
        try {



            await AdminModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/User')
        }
        catch (error) {
            console.log(error)
        }

    }




    static verifylogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body
            if (email && password) {

                const admin = await AdminModel.findOne({ email: email })

                if (admin != null) {
                    const ismatched = await bcrypt.compare(password, admin.password)

                    if (ismatched) {
                        //multiple login
                        if (admin.role == 'admin') {

                            //genrate jwt token
                            const token = jwt.sign({ id: admin._id }, 'abhaydixit123')
                            //console.log(token)
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        } else if (admin.status == 'pending') {
                            const token = jwt.sign({ id: admin._id }, 'abhaydixit123')
                            //console.log(token)
                            res.cookie('token', token)
                            req.flash('error', 'please wait for Approved');
                            res.redirect('/login')
                        } else if (admin.status == 'Approved') {
                            const token = jwt.sign({ id: admin._id }, 'abhaydixit123')
                            //console.log(token)
                            res.cookie('token', token)
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        }

                    } else {
                        req.flash('error', 'Email or password is incorrect')
                        res.redirect('/login')
                    }

                } else {
                    req.flash('error', 'you are not register user')
                    res.redirect('/login')
                }

            }
            else {
                req.flash('error', 'All fields are required')
                res.redirect('/login')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    static approved = async (req, res) => {
        try {
            //console.log(req.body)
            const { name, email, comment, status } = req.body;
            const result = await AdminModel.findByIdAndUpdate(req.params.id, {
                comment: req.body.comment,
                status: req.body.status,
            });
            req.flash('success', 'Update Successfully !')
            res.redirect('/admin/User')

        } catch (error) {
            console.log(error)
        }

    }

    static sendEmail = async (name, email) => {
        // console.log("email sending")
        //consollog("propertyName")
        // console.log(email)

        //connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "dixitabhay633@gmail.com",
                pass: "wdwgrltwxxbxvekv",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Create  Registration Succesfully", // Subject line
            text: "heelo", // plain text body
            html: `<b>${name}</b> Registration successful! please login.. `, // html body
        });
        //console.log("Messge sent: %s", info.messageId);
    };


    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/login')

        } catch (error) {
            console.log(error)
        }
    }





}
module.exports = adminController