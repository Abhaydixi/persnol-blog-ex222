const mongoose = require('mongoose')


const url = "mongodb://127.0.0.1:27017/persnolblogex"
const live_URL = 'mongodb+srv://dixitabhay633:blogproject123@cluster0.axc8e4t.mongodb.net/blogproject?retryWrites=true&w=majority'

const connectDb = () => {
    return mongoose.connect(live_URL)



        .then(() => {
            console.log("Database connected...")
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = connectDb