const express = require('express')
const connectDB = require('./DB.connection')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv').config()
const path = require('path')
const userModel = require('./models/user.model')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials  : true
}))

// ROUTERS  
const userRouter = require('./routes/user.route.js')
const prodcutRouter = require('./routes/Product.route.js')
const customerRoute = require('./routes/customer.route.js')

// MIDDELWARES 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
// ROUTES FORWORDING 
app.get('/',(req,res)=> {
    console.log(req.cookies.customerToken)
})
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product',prodcutRouter)
app.use('/api/v1/customer',customerRoute)



// Dtabase final connection and server starting process 
const connectDatabseAndStartServer = async()=> {
    connectDB().then(app.listen(process.env.PORT,()=> {
        console.log('Server is running at', process.env.PORT)
    }))
}
connectDatabseAndStartServer()