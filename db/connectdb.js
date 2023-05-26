const mongoose = require('mongoose')


const url = "mongodb://127.0.0.1:27017/persnolblogex"
//const live_URL = "mongodb+srv://dixitabhay633:abhay123@cluster0.plszbvy.mongodb.net/persnolblogex?retryWrites=true&w=majority"

const connectDb = () => {
    return mongoose.connect(url)



        .then(() => {
            console.log("Database connected...")
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = connectDb