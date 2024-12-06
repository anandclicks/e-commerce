const mongoose = require('mongoose')

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(console.log('Databse has connected!'))
    } catch (error) {
        console.log(error)
    }
}

module.exports =  connectDB